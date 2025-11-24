"use client";

import React, { useEffect, useState } from "react";
import StockChart from "@/components/StockChart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BACKEND_URL = "http://localhost:8000";

const AnalysisPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedTrends, setSelectedTrends] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState("5Y");
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchStockData();
  }, []);

  const fetchStockData = async (symbol = "NEPSE", tf = timeframe) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${BACKEND_URL}/api/stocks?symbol=${symbol}&timeframe=${tf}`
      );

      if (!res.ok) {
        setData([]);
        return;
      }

      const json = await res.json();
      setData(Array.isArray(json.records) ? json.records : []);
    } catch (err) {
      console.error("Error fetching:", err);
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
      prev.includes(trend)
        ? prev.filter((t) => t !== trend)
        : [...prev, trend]
    );
  };

  if (!mounted) return null;
  if (loading) return <div>Loading chart...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <Header />

      {/* Main content */}
      <main style={{ padding: "20px", flex: 1 }}>
        <h2>NEPSE Stock Analysis</h2>

        {/* Timeframe buttons */}
        <div style={{ marginBottom: "10px" }}>
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

        {/* Trend toggle buttons */}
        <div style={{ marginBottom: "10px" }}>
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

        {/* Stock Chart */}
        <StockChart data={data} selectedTrends={selectedTrends} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AnalysisPage;
