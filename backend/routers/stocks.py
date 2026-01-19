from fastapi import APIRouter, Query
from core.database import get_db_connection

router = APIRouter(prefix="/api", tags=["Stocks"])

@router.get("/search-suggestions")
def search_stocks(q: str = Query(...)):
    conn = get_db_connection()
    cur = conn.cursor()

    query = """
    SELECT symbol, company_name, category
    FROM stock_info
    WHERE LOWER(symbol) LIKE LOWER(%s)
       OR LOWER(company_name) LIKE LOWER(%s)
       OR LOWER(category) LIKE LOWER(%s)
    LIMIT 10
    """

    like_q = f"%{q}%"
    cur.execute(query, (like_q, like_q, like_q))
    results = cur.fetchall()

    cur.close()
    conn.close()

    return [
        {"symbol": r[0], "company_name": r[1], "category": r[2]}
        for r in results
    ]


@router.get("/companies-by-category")
def companies_by_category(category: str):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT symbol, company_name, category FROM stock_info WHERE category=%s",
        (category,)
    )
    rows = cur.fetchall()

    cur.close()
    conn.close()

    return [{"symbol": r[0], "company_name": r[1], "category": r[2]} for r in rows]


@router.get("/all-stocks")
def get_all_stocks():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT symbol, company_name, category FROM stock_info ORDER BY symbol ASC")
    rows = cur.fetchall()

    cur.close()
    conn.close()

    return [
        {"symbol": r[0], "company_name": r[1], "category": r[2]}
        for r in rows
    ]
