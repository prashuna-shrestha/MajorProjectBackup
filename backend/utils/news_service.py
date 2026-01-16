# backend/utils/news_service.py
import requests
from datetime import datetime

HEADERS = {"User-Agent": "Mozilla/5.0"}
BASE_API = "https://sharehubnepal.com/account/api/v1/khula-manch/post"
BASE_URL = "https://sharehubnepal.com"  # Needed for relative URLs
PLACEHOLDER_IMAGE = "/placeholder.jpg"   # Optional fallback

def fetch_all_news(max_pages=1):
    news_list = []
    last_post_id = None
    page = 0

    while page < max_pages:
        params = {"MediaType": "News", "Size": 12}
        if last_post_id:
            params["LastPostId"] = last_post_id

        try:
            res = requests.get(BASE_API, headers=HEADERS, params=params, timeout=10)
            res.raise_for_status()
        except requests.RequestException as e:
            print(f"Error fetching news: {e}")
            break

        payload = res.json()
        items = payload.get("data", [])

        if not items:
            break

        for item in items:
            # 🔎 Determine correct image field
            # Replace 'mediaUrl' with the key you see in your API response if different
            raw_image = item.get("mediaUrl") or item.get("image") or item.get("thumbnail")

            # Convert relative URL to absolute
            if raw_image and raw_image.startswith("/"):
                image_url = f"{BASE_URL}{raw_image}"
            else:
                image_url = raw_image

            # Fallback placeholder
            if not image_url:
                image_url = PLACEHOLDER_IMAGE

            news_list.append({
                "title": item.get("title", "No title"),
                "source": item.get("sourceName", "ShareHub Nepal"),
                "url": f"https://sharehubnepal.com/news/{item.get('slug')}",
                "image": image_url,
                "publishedAt": item.get("publishedAt") or datetime.now().isoformat()
            })
            last_post_id = item.get("id")

        page += 1

    return news_list
