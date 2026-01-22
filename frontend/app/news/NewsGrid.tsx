// app/news/NewsGrid.tsx
"use client";

//====================
// 1. Type Definitions
//====================
type NewsItem = {
  title: string;
  summary: string;
  source: string;
  url: string;
  image?: string;       // Optional image for the news
  publishedAt?: string; // Optional publish date
};

//====================
// 2. Helper Functions
//====================

// Convert ISO date to relative "time ago" string
function timeAgo(date: string) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
  }

  return "Just now";
}

//====================
// 3. Main Component
//====================
export default function NewsGrid({ news }: { news: NewsItem[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", // Responsive columns
        gap: "20px", // Spacing between cards
      }}
    >
      {news.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: "#fff",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
            transition: "all 0.25s ease",
          }}
        >
          {/*==================== IMAGE ====================*/}
          <div style={{ height: "180px", overflow: "hidden" }}>
            <img
              src={item.image || "/placeholder.jpg"} // Fallback placeholder
              alt={item.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/*==================== CONTENT ====================*/}
          <div style={{ padding: "14px" }}>
            {/* Source & Published Time */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                marginBottom: "6px",
              }}
            >
              {/* Source Badge */}
              <span
                style={{
                  background: "#f1f5f9",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  fontWeight: 600,
                }}
              >
                {item.source}
              </span>

              {/* Published time */}
              {item.publishedAt && (
                <span style={{ color: "#6b7280" }}>{timeAgo(item.publishedAt)}</span>
              )}
            </div>

            {/* Title */}
            <h3 style={{ fontSize: "17px", fontWeight: 600 }}>{item.title}</h3>

            {/* Summary */}
            <p style={{ fontSize: "14px", color: "#4b5563" }}>{item.summary}</p>

            {/* External Link */}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#2563eb" }}
            >
              Read more →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
