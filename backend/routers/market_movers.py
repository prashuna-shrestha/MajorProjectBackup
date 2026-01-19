# routers/market_movers.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, text
import pandas as pd

router = APIRouter()

# --- Database config ---
DB_CONFIG = {
    "dbname": "stock_data",
    "user": "postgres",
    "password": "root",
    "host": "localhost",
    "port": "5433",
}

# --- Response models ---
class StockData(BaseModel):
    symbol: str
    company_name: str
    current_price: float
    change_percent: float
    last_7_days: list[float]

class MarketMoversResponse(BaseModel):
    gainers: list[StockData]
    losers: list[StockData]

# --- Create SQLAlchemy engine ---
DB_URL = f"postgresql+psycopg2://{DB_CONFIG['user']}:{DB_CONFIG['password']}@{DB_CONFIG['host']}:{DB_CONFIG['port']}/{DB_CONFIG['dbname']}"
engine = create_engine(DB_URL, echo=False, future=True)

# --- Endpoint ---
@router.get("/market-movers", response_model=MarketMoversResponse)
def market_movers():
    try:
        with engine.connect() as conn:
            query = text("""
                WITH ranked AS (
                    SELECT
                        s.symbol,
                        COALESCE(si.company_name, s.symbol) AS company_name,
                        s.close,
                        LAG(s.close) OVER (PARTITION BY s.symbol ORDER BY s.date) AS prev_close,
                        ROW_NUMBER() OVER (PARTITION BY s.symbol ORDER BY s.date DESC) AS rn
                    FROM stocks s
                    LEFT JOIN stock_info si ON s.symbol = si.symbol
                    WHERE s.close IS NOT NULL
                ),
                latest AS (
                    SELECT *
                    FROM ranked
                    WHERE rn = 1
                ),
                last_days AS (
                    SELECT
                        s.symbol,
                        ARRAY_AGG(s.close ORDER BY s.date DESC) AS all_closes
                    FROM stocks s
                    GROUP BY s.symbol
                )
                SELECT
                    l.symbol,
                    l.company_name,
                    l.close AS current_price,
                    ROUND(
                        ((l.close - l.prev_close) / NULLIF(l.prev_close, 0)) * 100
                    , 2) AS change_percent,
                    ld.all_closes
                FROM latest l
                LEFT JOIN last_days ld ON l.symbol = ld.symbol
                ORDER BY change_percent DESC;
            """)

            df = pd.read_sql(query, conn)

            if df.empty:
                raise HTTPException(status_code=404, detail="No stock data available")

            # Only keep last 7 days in Python
            df["last_7_days"] = df["all_closes"].apply(lambda x: x[:7] if x else [])

            # Top 10 gainers
            gainers_df = df[df["change_percent"] > 0].nlargest(10, "change_percent")
            gainers = gainers_df.to_dict(orient="records")

            # Top 10 losers
            losers_df = df[df["change_percent"] < 0].nsmallest(10, "change_percent")
            losers = losers_df.to_dict(orient="records")

            # Clean up dicts to match Pydantic model
            for g in gainers:
                g["last_7_days"] = g.pop("last_7_days")
            for l in losers:
                l["last_7_days"] = l.pop("last_7_days")

            return {
                "gainers": gainers,
                "losers": losers
            }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"SQL ERROR: {e}")
