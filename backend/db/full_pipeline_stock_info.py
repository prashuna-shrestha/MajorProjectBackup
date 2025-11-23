# full_pipeline_stock_info.py
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
    Reads merged stock CSV and company list, merges them, saves clean CSV,
    inserts into PostgreSQL table stock_info, and returns unmatched symbols.
    """
    # --- Default paths ---
    base_path = Path(__file__).parent
    if merged_stock_path is None:
        merged_stock_path = base_path / "../../data/clean/merged_stock_nepse.csv"
    if company_list_path is None:
        company_list_path = base_path / "../../data/raw/CompanyList.csv"
    if output_path is None:
        output_path = base_path / "../../data/clean/clean_stock_info.csv"

    print(f"Reading merged stock CSV from: {merged_stock_path}")
    print(f"Reading company list CSV from: {company_list_path}")

    # --- Load CSVs ---
    try:
        merged_df = pd.read_csv(merged_stock_path)
    except FileNotFoundError:
        raise FileNotFoundError(f"Merged stock CSV not found at {merged_stock_path}")

    try:
        company_df = pd.read_csv(company_list_path)
    except FileNotFoundError:
        raise FileNotFoundError(f"Company list CSV not found at {company_list_path}")

    print("Merged CSV head:")
    print(merged_df.head())
    print("Company list head:")
    print(company_df.head())

    # --- Prepare company info ---
    company_df = company_df[['Symbol', 'Company Name', 'Sector']]
    company_df.columns = ['symbol', 'company_name', 'category']

    # Standardize symbols
    merged_df['symbol'] = merged_df['symbol'].astype(str).str.strip().str.upper()
    company_df['symbol'] = company_df['symbol'].astype(str).str.strip().str.upper()

    print("Symbols from merged CSV (sample):", merged_df['symbol'].unique()[:10])
    print("Symbols from company list (sample):", company_df['symbol'].unique()[:10])

    # --- Merge company info ---
    merged_info = pd.merge(
        merged_df[['symbol']].drop_duplicates(),
        company_df,
        on='symbol',
        how='left'
    )

    # --- Identify unmatched symbols ---
    unmatched_symbols = merged_info[merged_info['company_name'].isna()]
    if not unmatched_symbols.empty:
        print("❌ Symbols in merged CSV not found in CompanyList.csv:")
        print(unmatched_symbols['symbol'].tolist())
    else:
        print("All symbols have matching company info.")

    # Optional: manual additions
    if manual_add is None:
        manual_add = pd.DataFrame(columns=['symbol', 'company_name', 'category'])

    final_company_info = pd.concat(
        [merged_info.dropna(subset=['company_name']), manual_add],
        ignore_index=True
    )

    print("Final company info to insert (sample):")
    print(final_company_info.head())
    print("Number of rows to insert:", len(final_company_info))

    if final_company_info.empty:
        print("WARNING: No company info to insert. Aborting DB insert.")
        return final_company_info, unmatched_symbols

    # --- Save clean CSV ---
    final_company_info.to_csv(output_path, index=False)
    print(f"Clean stock info saved to: {output_path}")

    # --- Insert into PostgreSQL ---
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
        print("✅ Stock info table updated successfully!")
    except Exception as e:
        print("Error inserting into PostgreSQL:", e)
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()

    return final_company_info, unmatched_symbols
