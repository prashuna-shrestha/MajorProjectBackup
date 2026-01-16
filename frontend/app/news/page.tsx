// app/news/page.tsx
import NewsGrid from "./NewsGrid";

type NewsItem = {
  title: string;
  summary: string;
  source: string;
  url: string;
  image?: string;
  publishedAt?: string;
};

async function getNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch("http://localhost:8000/api/news", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch news");
    return res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Latest News</h1>
      <NewsGrid news={news} />
    </div>
  );
}
