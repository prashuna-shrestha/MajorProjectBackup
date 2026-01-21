from pathlib import Path  # For handling file paths easily
import pandas as pd       # For reading CSVs and data manipulation
import psycopg2           # For connecting to PostgreSQL using raw SQL
from psycopg2.extras import execute_values  # For batch inserting/updating efficiently

# Database configuration
DB_CONFIG = {
    "dbname": "stock_data",  # Database name
    "user": "postgres",      # Username
    "password": "root",      # Password
    "host": "localhost",     # Database host
    "port": "5433"           # Port number
}

def run_stock_info_pipeline(
    merged_stock_path=None,  # Path to merged stock CSV
    company_list_path=None,  # Path to company list CSV
    output_path=None         # Path to save cleaned CSV
):

    """ 
    Stock info pipeline:
    1. Load merged stock and company list CSVs
    2. Clean and merge data
    3. Save a clean CSV
    4. Insert or update data into PostgreSQL
    """

    base_path = Path(__file__).parent  # Directory of this script

    # -------------------------------
    # Default file paths
    # -------------------------------
    if merged_stock_path is None:
        merged_stock_path = base_path / "../../data/clean/merged_stock_nepse.csv"
    if company_list_path is None:
        company_list_path = base_path / "../../data/raw/CompanyList.csv"
    if output_path is None:
        output_path = base_path / "../../data/clean/clean_stock_info.csv"

    # -------------------------------
    # Load CSVs into pandas DataFrames
    # -------------------------------
    merged_df = pd.read_csv(merged_stock_path)  # Merged stock data
    company_df = pd.read_csv(company_list_path) # Company info

    # -------------------------------
    # Prepare company info
    # -------------------------------
    company_df = company_df[['Symbol', 'Company Name', 'Sector']].copy()  # Keep relevant columns
    company_df.columns = ['symbol', 'company_name', 'category']          # Rename columns

    # -------------------------------
    # Standardize symbols
    # -------------------------------
    merged_df['symbol'] = merged_df['symbol'].astype(str).str.strip().str.upper()
    company_df['symbol'] = company_df['symbol'].astype(str).str.strip().str.upper()

    # -------------------------------
    # Merge stock and company info
    # -------------------------------
    merged_info = pd.merge(
        merged_df[['symbol']].drop_duplicates(),  # Only unique symbols
        company_df,
        on='symbol',
        how='left'
    )

    # -------------------------------
    # Fill missing values and drop duplicates
    # -------------------------------
    merged_info['company_name'] = merged_info['company_name'].fillna('Unknown Company')
    merged_info['category'] = merged_info['category'].fillna('Others')
    merged_info = merged_info.drop_duplicates(subset=['symbol'])  # Prevent ON CONFLICT errors

    # -------------------------------
    # Save cleaned CSV
    # -------------------------------
    merged_info.to_csv(output_path, index=False)  
    print(f"Cleaned stock info saved to: {output_path}")

    # -------------------------------
    # Insert/update data in PostgreSQL
    # -------------------------------
    conn = psycopg2.connect(**DB_CONFIG)  # Connect to database
    cur = conn.cursor()                    # Cursor for executing SQL

    # Convert DataFrame to list of tuples
    values = [tuple(x) for x in merged_info.to_numpy()]

    batch_size = 100  # Insert/update in batches to avoid huge queries aplitting into batches
    for i in range(0, len(values), batch_size):
        execute_values(
            cur,
            """
            INSERT INTO stock_info (symbol, company_name, category)
            VALUES %s
            ON CONFLICT (symbol)  -- If symbol exists, update instead
            DO UPDATE SET
                company_name = EXCLUDED.company_name,
                category = EXCLUDED.category
            """,
            values[i:i+batch_size]
        )

    conn.commit()  # Commit all changes
    cur.close()    # Close cursor
    conn.close()   # Close connection
    print(f"{len(values)} rows inserted/updated in stock_info table.")

    return merged_info  # Return cleaned DataFrame

# -------------------------------
# Run pipeline if this script is executed directly
# -------------------------------
if __name__ == "__main__":
    run_stock_info_pipeline()
