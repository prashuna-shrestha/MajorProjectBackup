# core/database.py
import psycopg2

DB_CONFIG = {
    "dbname": "stock_data",
    "user": "postgres",
    "password": "prashuna123",
    "host": "localhost",
    "port": "5433",
}

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)
