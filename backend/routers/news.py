# backend/routers/news.py
from fastapi import APIRouter
from utils.news_service import fetch_all_news

router = APIRouter(prefix="/api/news", tags=["News"])

@router.get("")
async def get_all_news():
    return fetch_all_news()
