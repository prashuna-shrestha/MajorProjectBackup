import pandas as pd
import psycopg2
from psycopg2.extras import execute_values

csv_file = '../../data/clean/merged_stock_nepse.csv'

# Load CSV
df = pd.read_csv(csv_file, parse_dates=['date'])

# Ensure date is a Python date (not pandas Timestamp)
df['date'] = df['date'].dt.date

# Ensure all numeric columns are native Python float (not numpy.float64)
numeric_cols = ['open', 'high', 'low', 'close', 'close_norm']
for col in numeric_cols:
    df[col] = df[col].apply(lambda x: float(x) if pd.notnull(x) else None)

# Convert dataframe to list of tuples
values = [tuple(row) for row in df.itertuples(index=False, name=None)]

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname='stock_data',
    user='postgres',
    password='root',
    host='localhost',
    port='5433'
)
cur = conn.cursor()

# Insert data efficiently
execute_values(
    cur,
    """
    INSERT INTO stocks (date, symbol, open, high, low, close, close_norm)
    VALUES %s
    """,
    values
)

conn.commit()
cur.close()
conn.close()

print("CSV imported successfully!")
