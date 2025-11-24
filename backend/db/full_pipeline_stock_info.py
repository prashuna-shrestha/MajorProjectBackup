from pathlib import Path
import pandas as pd
import psycopg2
from psycopg2.extras import execute_values

DB_CONFIG = {
    "dbname": "stock_data",
    "user": "postgres",
    "password": "prashuna123",
    "host": "localhost",
    "port": "5433"
}

def run_stock_info_pipeline(
    merged_stock_path=None,
    company_list_path=None,
    output_path=None,
    manual_add=None
):
    """
    Reads merged stock CSV and company list, merges them,
    saves clean CSV, inserts only matched symbols into PostgreSQL.
    Unmatched symbols are ignored.
    """
    # --- Default paths ---
    base_path = Path(__file__).parent
    if merged_stock_path is None:
        merged_stock_path = base_path / "../../data/clean/merged_stock_nepse.csv"
    if company_list_path is None:
        company_list_path = base_path / "../../data/raw/CompanyList.csv"
    if output_path is None:
        output_path = base_path / "../../data/clean/clean_stock_info.csv"

    # --- Load CSVs ---
    merged_df = pd.read_csv(merged_stock_path)
    company_df = pd.read_csv(company_list_path)

    # Prepare company info
    company_df = company_df[['Symbol', 'Company Name', 'Sector']]
    company_df.columns = ['symbol', 'company_name', 'category']

    # Standardize symbols
    merged_df['symbol'] = merged_df['symbol'].astype(str).str.strip().str.upper()
    company_df['symbol'] = company_df['symbol'].astype(str).str.strip().str.upper()

    # Merge only symbol list with company info
    merged_info = pd.merge(
        merged_df[['symbol']].drop_duplicates(),
        company_df,
        on='symbol',
        how='left'
    )

    # Remove unmatched symbols entirely
    matched_companies = merged_info.dropna(subset=['company_name'])

    # Optional manual additions
    if manual_add is None:
        manual_add = pd.DataFrame(columns=['symbol', 'company_name', 'category'])

    final_company_info = pd.concat(
        [matched_companies, manual_add],
        ignore_index=True
    )

    # Save clean CSV
    final_company_info.to_csv(output_path, index=False)

    # Insert into PostgreSQL
    if not final_company_info.empty:
        try:
            conn = psycopg2.connect(**DB_CONFIG)
            cur = conn.cursor()
            values = [tuple(x) for x in final_company_info.to_numpy()]

            execute_values(
                cur,
                """
                INSERT INTO stock_info (symbol, company_name, category)
                VALUES %s
                ON CONFLICT (symbol) DO NOTHING
                """,
                values
            )
            conn.commit()
        except Exception as e:
            print("Error inserting into PostgreSQL:", e)
            raise e
        finally:
            cur.close()
            conn.close()

    # Return only the final matched info
    return final_company_info
