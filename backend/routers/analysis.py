# routers/analysis.py
from fastapi import APIRouter
from core.database import get_db_connection
import pandas as pd
import numpy as np

router = APIRouter(prefix="/api", tags=["Analysis"])

# --- Helpers ---

def clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    df = df.replace([np.inf, -np.inf], None)
    df = df.where(pd.notnull(df), None)
    return df

def calculate_rsi(series: pd.Series, period=14):
    delta = series.diff()
    gain = delta.where(delta > 0, 0.0)
    loss = -delta.where(delta < 0, 0.0)
    avg_gain = gain.rolling(window=period, min_periods=1).mean()
    avg_loss = loss.rolling(window=period, min_periods=1).mean()
    rs = avg_gain / avg_loss.replace(0, np.nan)
    rsi = 100 - (100 / (1 + rs))
    return rsi.fillna(0)

def calculate_bollinger(series: pd.Series, window=20, num_std=2):
    ma = series.rolling(window).mean()
    std = series.rolling(window).std()
    upper = ma + (std * num_std)
    lower = ma - (std * num_std)
    return upper.fillna(0), lower.fillna(0), ma.fillna(0)

def resample_data(df: pd.DataFrame, timeframe: str) -> pd.DataFrame:
    df["date"] = pd.to_datetime(df["date"])
    df = df.sort_values("date")
    df.set_index("date", inplace=True)

    days_map = {
        "1D": 1, "1W": 7, "1M": 30,
        "6M": 180, "1Y": 365, "3Y": 1095,
        "5Y": 1825, "ALL": None
    }

    # Weekly or Monthly
    if timeframe in ["1W", "1M"]:
        rule = "W" if timeframe == "1W" else "M"
        df_resampled = df.resample(rule).agg({
            "open": "first",
            "high": "max",
            "low": "min",
            "close": "last",
            "close_norm": "last"
        })
    elif timeframe in days_map and days_map[timeframe]:
        df_resampled = df.tail(days_map[timeframe])
    else:
        df_resampled = df.copy()

    # Trend calculations
    df_resampled["avg_price"] = (df_resampled["high"] + df_resampled["low"]) / 2
    df_resampled["price_change"] = df_resampled["close"].pct_change(fill_method=None) * 100
    df_resampled["price_change"] = df_resampled["price_change"].replace([np.inf, -np.inf, np.nan], 0)
    df_resampled["rolling_mean_20"] = df_resampled["close"].rolling(window=20, min_periods=1).mean()
    df_resampled["EMA12"] = df_resampled["close"].ewm(span=12).mean()
    df_resampled["EMA26"] = df_resampled["close"].ewm(span=26).mean()
    df_resampled["RSI14"] = calculate_rsi(df_resampled["close"])
    df_resampled["BB_UPPER"], df_resampled["BB_LOWER"], df_resampled["BB_MA20"] = calculate_bollinger(df_resampled["close"])

    df_resampled.reset_index(inplace=True)
    return clean_dataframe(df_resampled)

# --- API Endpoint ---

@router.get("/stocks")
def get_stock(symbol: str = "NEPSE", timeframe: str = "1Y"):
    conn = get_db_connection()
    query = """
        SELECT date, symbol, open, high, low, close, close_norm
        FROM stocks
        WHERE LOWER(symbol) = LOWER(%s)
        ORDER BY date ASC
    """
    df = pd.read_sql(query, conn, params=(symbol,))
    conn.close()

    if df.empty:
        return {"message": f"No data found for symbol {symbol}", "records": []}

    df_filtered = resample_data(df, timeframe)
    return {"records": df_filtered.to_dict(orient="records")}
