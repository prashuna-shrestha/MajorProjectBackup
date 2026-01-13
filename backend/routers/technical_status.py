from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import psycopg2
import pandas as pd
import numpy as np

router = APIRouter()

# --- Database config ---
DB_CONFIG = {
    "dbname": "stock_data",
    "user": "postgres",
    "password": "prashuna123",
    "host": "localhost",
    "port": "5433",
}

# --- Response model ---
class TrendResponse(BaseModel):
    short_term: str
    mid_term: str
    long_term: str
    confidence: float

# --- Helper functions ---
def calculate_moving_averages(df: pd.DataFrame):
    df["MA5"] = df["close"].rolling(window=5, min_periods=1).mean()
    df["MA20"] = df["close"].rolling(window=20, min_periods=1).mean()
    df["MA50"] = df["close"].rolling(window=50, min_periods=1).mean()
    return df

def determine_trend(current, ma):
    if current > ma * 1.01:
        return "Uptrend"
    elif current < ma * 0.99:
        return "Downtrend"
    else:
        return "Sideways"

def compute_trends(df: pd.DataFrame):
    # Convert decimals to floats
    for col in ["open", "high", "low", "close", "close_norm"]:
        df[col] = df[col].astype(float)

    df = calculate_moving_averages(df)

    current_close = df["close"].iloc[-1]

    # Short-term trend = last 5-day MA
    short = determine_trend(current_close, df["MA5"].iloc[-1])

    # Mid-term trend = last 20-day MA
    mid = determine_trend(current_close, df["MA20"].iloc[-1]) 

    # Long-term trend = last 50-day MA
    long = determine_trend(current_close, df["MA50"].iloc[-1])

    # Confidence = distance from MA20
    conf = min(abs(current_close - df["MA20"].iloc[-1]) / df["MA20"].iloc[-1] * 100, 100)

    return {
        "short_term": short,
        "mid_term": mid,
        "long_term": long,
        "confidence": round(conf, 2),
    }

# --- Endpoint ---
@router.get("/technical-status", response_model=TrendResponse)
def technical_status(symbol: str):
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        query = """
            SELECT date, close, open, high, low, close_norm
            FROM stocks
            WHERE symbol = %s
            ORDER BY date ASC
        """
        df = pd.read_sql(query, conn, params=(symbol,))
        conn.close()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

    if df.empty:
        raise HTTPException(status_code=404, detail="Symbol not found or no data available")

    trends = compute_trends(df)
    return trends
