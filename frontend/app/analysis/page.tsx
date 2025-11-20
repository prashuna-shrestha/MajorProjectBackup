"use client";
import React, { useEffect, useState } from "react";
import StockChart from "@/components/StockChart";

const BACKEND_URL = "http://localhost:8000";

const AnalysisPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedTrends, setSelectedTrends] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState<string>("5Y");
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false); // only render on client

  useEffect(() => {
    setMounted(true); // mounted = true only on client
    fetchStockData();
  }, []);

  const fetchStockData = async (symbol = "NEPSE", tf = timeframe) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${BACKEND_URL}/api/stocks?symbol=${symbol}&timeframe=${tf}`,
      );
      if (!res.ok) {
        setData([]);
        return;
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching data:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (tf: string) => {
    setTimeframe(tf);
    fetchStockData("NEPSE", tf);
  };

  const handleToggle = (trend: string) => {
    setSelectedTrends((prev) =>
      prev.includes(trend) ? prev.filter((t) => t !== trend) : [...prev, trend],
    );
  };

  // Don't render chart on server to avoid hydration mismatch
  if (!mounted) return null;

  if (loading) return <div>Loading chart...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>NEPSE Stock Analysis</h2>
      <div style={{ marginBottom: "10px" }}>
        {/* Example filter buttons */}
        {["1D", "1W", "1M", "6M", "1Y", "5Y"].map((tf) => (
          <button
            key={tf}
            onClick={() => handleFilterChange(tf)}
            style={{ marginRight: "5px" }}
          >
            {tf}
          </button>
        ))}
      </div>
      <div style={{ marginBottom: "10px" }}>
        {/* Trend toggles */}
        {["EMA12", "EMA26", "BB", "RSI", "VOLUME"].map((trend) => (
          <button
            key={trend}
            onClick={() => handleToggle(trend)}
            style={{
              marginRight: "5px",
              background: selectedTrends.includes(trend)
                ? "#3b82f6"
                : "#e5e7eb",
              color: selectedTrends.includes(trend) ? "white" : "black",
            }}
          >
            {trend}
          </button>
        ))}
      </div>
      <StockChart data={data} selectedTrends={selectedTrends} />
    </div>
  );
};

export default AnalysisPage;
