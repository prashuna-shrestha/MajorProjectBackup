"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import StockChart from "@/components/StockChart";
import TechnicalStatus from "@/components/TechnicalStatus";
import { TrendingUp, BarChart3, Zap, Clock, Activity, Volume2, LineChart } from "lucide-react";
import { RootState } from "@/store";

const BACKEND_URL = "http://localhost:8000";

interface StockData {
  close: number;
  high: number;
  low: number;
  [key: string]: any;
}

const AnalysisPage: React.FC = () => {
  const searchParams = useSearchParams();
  const symbolParam = searchParams.get("symbol") || "NEPSE";

  const theme = useSelector((state: RootState) => state.theme.mode) || "light";

  const [data, setData] = useState<StockData[]>([]);
  const [selectedTrends, setSelectedTrends] = useState<string[]>(["EMA12", "EMA26"]);
  const [timeframe, setTimeframe] = useState<string>("5Y");
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    fetchStockData(symbolParam, timeframe);
  }, [symbolParam, timeframe]);

  useEffect(() => {
    setTimeframe("5Y");
  }, [symbolParam]);

  const fetchStockData = async (symbol: string, tf: string): Promise<void> => {
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

  const handleFilterChange = (tf: string): void => setTimeframe(tf);

  const handleToggle = (trend: string): void =>
    setSelectedTrends((prev) =>
      prev.includes(trend) ? prev.filter((t) => t !== trend) : [...prev, trend]
    );

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "EMA12":
        return <LineChart size={16} />;
      case "EMA26":
        return <TrendingUp size={16} />;
      case "BB":
        return <BarChart3 size={16} />;
      case "RSI":
        return <Activity size={16} />;
      case "VOLUME":
        return <Volume2 size={16} />;
      default:
        return <BarChart3 size={16} />;
    }
  };

  const timeframeLabels: Record<string, string> = {
    "1D": "1 Day",
    "1W": "1 Week",
    "1M": "1 Month",
    "6M": "6 Months",
    "1Y": "1 Year",
    "5Y": "5 Years"
  };

  const isDark = theme === "dark";

  const themeStyles = {
    background: isDark ? "#111827" : "#ffffff",
    textPrimary: isDark ? "#f9fafb" : "#111827",
    textSecondary: isDark ? "#d1d5db" : "#6b7280",
    cardBackground: isDark ? "#1f2937" : "#f8fafc",
    cardBorder: isDark ? "#374151" : "#e2e8f0",
    buttonBackground: isDark ? "#374151" : "#ffffff",
    buttonBorder: isDark ? "#4b5563" : "#cbd5e1",
    buttonText: isDark ? "#e5e7eb" : "#475569",
    chartBackground: isDark ? "#1f2937" : "#ffffff",
    hoverBackground: isDark ? "#4b5563" : "#f1f5f9",
  };

  if (!mounted) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: themeStyles.background,
        color: themeStyles.textPrimary,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <main
        style={{
          padding: "20px",
          flex: 1,
          backgroundColor: themeStyles.background,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "8px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                padding: "8px",
                background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUp size={24} color="white" />
            </div>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                margin: 0,
                background: "linear-gradient(90deg, #3b82f6 0%, #10b981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {symbolParam} Stock Analysis
            </h2>

            <span
              style={{
                marginLeft: "8px",
                padding: "4px 12px",
                backgroundColor: isDark ? "rgba(59,130,246,0.2)" : "rgba(59,130,246,0.1)",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "4px",
                border: `1px solid ${
                  isDark ? "rgba(59,130,246,0.4)" : "rgba(59,130,246,0.3)"
                }`,
                color: themeStyles.textPrimary,
              }}
            >
              <Clock size={14} />
              {timeframeLabels[timeframe]}
            </span>
          </div>

          <p
            style={{
              color: themeStyles.textSecondary,
              margin: 0,
              fontSize: "14px",
            }}
          >
            Technical analysis with real-time indicators and predictions
          </p>
        </div>

        {/* Timeframe buttons */}
        <div
          style={{
            marginBottom: "20px",
            padding: "16px",
            backgroundColor: themeStyles.cardBackground,
            borderRadius: "12px",
            border: `1px solid ${themeStyles.cardBorder}`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <Zap size={18} color="#f59e0b" />
            <h3 style={{ fontSize: "16px", fontWeight: 600, margin: 0, color: themeStyles.textPrimary }}>
              Timeframe
            </h3>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["1D", "1W", "1M", "6M", "1Y", "5Y"].map((tf) => (
              <button
                key={tf}
                onClick={() => handleFilterChange(tf)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontWeight: 500,
                  fontSize: "14px",
                  cursor: "pointer",
                  ...(tf === timeframe
                    ? {
                        background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                        color: "#fff",
                        border: "none",
                      }
                    : {
                        backgroundColor: themeStyles.buttonBackground,
                        color: themeStyles.buttonText,
                        border: `1px solid ${themeStyles.buttonBorder}`,
                      }),
                }}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div
          style={{
            marginBottom: "30px",
            padding: "16px",
            backgroundColor: themeStyles.cardBackground,
            borderRadius: "12px",
            border: `1px solid ${themeStyles.cardBorder}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <Activity size={18} color="#06b6d4" />
            <h3 style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>Technical Indicators</h3>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["EMA12", "EMA26", "BB", "RSI", "VOLUME"].map((trend) => (
              <button
                key={trend}
                onClick={() => handleToggle(trend)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  fontWeight: 500,
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  ...(selectedTrends.includes(trend)
                    ? {
                        background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                        color: "#fff",
                        border: "none",
                      }
                    : {
                        backgroundColor: themeStyles.buttonBackground,
                        color: themeStyles.buttonText,
                        border: `1px solid ${themeStyles.buttonBorder}`,
                      }),
                }}
              >
                {getTrendIcon(trend)}
                {trend}
              </button>
            ))}
          </div>
        </div>

        {/* Bullish / Bearish */}
        {data.length > 0 && (
          <div style={{ marginBottom: "20px", display: "flex", gap: "12px"}}>
            <span style={{ fontSize: "14px", color: themeStyles.textSecondary }}>Market Trend: </span>
            <span
              style={{
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: 600,
                border: `1px solid ${
                  data[data.length - 1]?.close > data[0]?.close
                    ? isDark
                      ? "rgba(34,197,94,0.4)"
                      : "rgba(34,197,94,0.3)"
                    : isDark
                    ? "rgba(239,68,68,0.4)"
                    : "rgba(239,68,68,0.3)"
                }`,
                backgroundColor:
                  data[data.length - 1]?.close > data[0]?.close
                    ? isDark
                      ? "rgba(34,197,94,0.2)"
                      : "rgba(34,197,94,0.1)"
                    : isDark
                    ? "rgba(239,68,68,0.2)"
                    : "rgba(239,68,68,0.1)",
                color: data[data.length - 1]?.close > data[0]?.close ? "#16a34a" : "#dc2626",
              }}
            >
              {data[data.length - 1]?.close > data[0]?.close ? "📈 Bullish Trend" : "📉 Bearish Trend"}
            </span>
          </div>
        )}

        {/* Layout */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {/* Chart */}
          <div style={{ flex: "1 1 700px", minHeight: "600px" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: themeStyles.chartBackground,
                borderRadius: "12px",
                padding: "20px",
                border: `1px solid ${themeStyles.cardBorder}`,
                minHeight: "550px",
              }}
            >
              <div
                style={{
                  marginBottom: "15px",
                  paddingBottom: "10px",
                  borderBottom: `1px solid ${themeStyles.cardBorder}`,
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>
                  <BarChart3 size={20} color="#3b82f6" /> {symbolParam} Price Chart
                </h3>
              </div>

              <div style={{ minHeight: "450px" }}>
                {loading ? (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          border: `3px solid ${isDark ? "#374151" : "#f1f5f9"}`,
                          borderTop: "3px solid #3b82f6",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                        }}
                      ></div>
                      <p style={{ marginTop: "12px", color: themeStyles.textSecondary }}>
                        Loading chart data...
                      </p>
                    </div>
                  </div>
                ) : (
                  <StockChart data={data} selectedTrends={selectedTrends} />
                )}
              </div>

              <div
                style={{
                  marginTop: "10px",
                  paddingTop: "10px",
                  borderTop: `1px solid ${themeStyles.cardBorder}`,
                  fontSize: "12px",
                  color: themeStyles.textSecondary,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Timeframe: {timeframeLabels[timeframe]}</span>
                  <span>{data.length} data points</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Status */}
          <div style={{ flex: 1, minWidth: "48%" }}>
            <TechnicalStatus symbol={symbolParam} />
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AnalysisPage;
