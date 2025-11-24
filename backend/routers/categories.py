from fastapi import APIRouter
from core.database import get_db_connection

router = APIRouter(prefix="/api", tags=["Categories"])

@router.get("/categories")
def get_categories():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT DISTINCT category FROM stock_info WHERE category IS NOT NULL ORDER BY category ASC")
    rows = cur.fetchall()
    cur.close()
    conn.close()

    return {"categories": [r[0] for r in rows]}
