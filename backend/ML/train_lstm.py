import sys
import os

# Make backend folder discoverable
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.dirname(BASE_DIR)
sys.path.append(PARENT_DIR)

import psycopg2
import pandas as pd
import numpy as np

from ML.lstm_model import create_lstm
from utils.preprocessing import scale_data, create_sequences


DB_CONFIG = {
    "dbname": "stock_data",
    "user": "postgres",
    "password": "prashuna123",
    "host": "localhost",
    "port": "5433",
}

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(SCRIPT_DIR, "models")
os.makedirs(MODEL_DIR, exist_ok=True)


def train_for_symbol(symbol, df):
    df = df.sort_values("date")
    data = df["close"].values.reshape(-1, 1)
    scaled, scaler = scale_data(data)

    X, y = create_sequences(scaled)
    X = np.array(X).reshape(X.shape[0], X.shape[1], 1)

    model = create_lstm((X.shape[1], 1))
    model.fit(X, y, epochs=10, batch_size=32, verbose=1)

    model.save(f"{MODEL_DIR}/{symbol}_model.h5")
    print(f"✔ Model saved for {symbol}")


def main():
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()

    cur.execute("SELECT DISTINCT symbol FROM stocks")
    symbols = [row[0] for row in cur.fetchall()]

    for symbol in symbols:
        print(f"📌 Training model for: {symbol}")

        df = pd.read_sql(
            "SELECT date, close FROM stocks WHERE symbol=%s ORDER BY date ASC",
            conn,
            params=(symbol,),
        )

        if len(df) < 100:
            print(f"❌ Skipping {symbol} (not enough data)")
            continue

        train_for_symbol(symbol, df)

    conn.close()


if __name__ == "__main__":
    main()
