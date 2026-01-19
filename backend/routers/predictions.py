from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sys
import os
import numpy as np
import pandas as pd
import tensorflow as tf
from utils.preprocessing import scale_data
from sqlalchemy import create_engine

# Add parent directory to sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

from ML.train_lstm import DB_CONFIG

router = APIRouter()

# --- Response model ---
class TechnicalPredictionResponse(BaseModel):
    symbol: str
    very_short_term: str
    short_term: str
    mid_term: str
    long_term: str
    confidence: float

# --- Helper functions ---
def determine_trend(current, predicted, threshold=0.01):
    """Classify trend based on percentage change."""
    change = (predicted - current) / current
    if change > threshold:
        return "Uptrend", min(change * 100, 100)
    elif change < -threshold:
        return "Downtrend", min(abs(change) * 100, 100)
    else:
        return "Sideways", min(abs(change) * 100, 100)

def iterative_prediction(model, last_window, days):
    """
    Predict next 'days' prices iteratively using the LSTM model.
    last_window: array of shape (window_size, 1)
    Returns final predicted price.
    """
    window = last_window.copy()
    for _ in range(days):
        x_input = window[-60:].reshape(1, 60, 1)
        pred_scaled = model.predict(x_input, verbose=0)
        window = np.append(window, pred_scaled[-1])
    return window[-1]

# --- Endpoint ---
@router.get("/predict", response_model=TechnicalPredictionResponse)
def predict(symbol: str):
    # Model path
    MODEL_DIR = os.path.join(BASE_DIR, "ML", "models")
    model_path = os.path.join(MODEL_DIR, f"{symbol}_model.h5")
    print("Loading model from:", model_path)

    if not os.path.exists(model_path):
        raise HTTPException(status_code=404, detail="Model not found. Train LSTM first.")

    # Load model without compile to avoid Keras metric issues
    try:
        model = tf.keras.models.load_model(model_path, compile=False)
    except Exception as e:
        print("Error loading model:", e)
        raise HTTPException(status_code=500, detail=f"Error loading model: {e}")

    # SQLAlchemy engine to avoid pandas warning
    try:
        DB_URL = f"postgresql+psycopg2://{DB_CONFIG['user']}:{DB_CONFIG['password']}@{DB_CONFIG['host']}:{DB_CONFIG['port']}/{DB_CONFIG['dbname']}"
        engine = create_engine(DB_URL)

        query = "SELECT close FROM stocks WHERE symbol=%s ORDER BY date ASC"
        df = pd.read_sql(query, engine, params=(symbol,))
        print(f"Data fetched for {symbol}, shape:", df.shape)
    except Exception as e:
        print("Database error:", e)
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

    if df.empty:
        raise HTTPException(status_code=404, detail="Symbol not found or no data available")

    # Prepare data for prediction
    data = df["close"].values.reshape(-1, 1)
    scaled, scaler = scale_data(data)
    last_window = scaled[-60:].reshape(-1, 1)
    current_close = df["close"].iloc[-1]

    # Define horizons in days
    horizons = {
        "very_short_term": 3,
        "short_term": 7,
        "mid_term": 20,
        "long_term": 60
    }

    trends = {}
    confidences = []

    for key, days in horizons.items():
        predicted_scaled = iterative_prediction(model, last_window, days)
        predicted_price = scaler.inverse_transform(np.array([[predicted_scaled]]))[0][0]
        trend, conf = determine_trend(current_close, predicted_price)
        trends[key] = trend
        confidences.append(conf)

    overall_confidence = max(confidences)  # single gauge confidence

    print(f"{symbol} predictions: {trends}, confidence: {overall_confidence}%")

    return {
        "symbol": symbol,
        **trends,
        "confidence": round(float(overall_confidence), 2),
    }