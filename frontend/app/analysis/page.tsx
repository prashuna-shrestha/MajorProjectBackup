"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import StockChart from "@/components/StockChart";
import TechnicalStatus from "@/components/TechnicalStatus";
import {
  TrendingUp,
  BarChart3,
  Zap,
  Activity,
  Volume2,
  LineChart,
} from "lucide-react";
import { RootState } from "@/store";

// Backend API URL
const BACKEND_URL = "http://localhost:8000";

// Type for stock data returned by backend
interface StockData {
  close: number;
  high: number;
  low: number;
  [key: string]: any;
}

const AnalysisPage: React.FC = () => {
  //===========================
  // 1. URL Params & Theme
  //===========================
  const searchParams = useSearchParams();
  const symbolParam = searchParams.get("symbol") || "NEPSE"; // Default symbol

  const theme = useSelector((state: RootState) => state.theme.mode) || "light"; // Current theme

  //===========================
  // 2. Local State
  //===========================
  const [data, setData] = useState<StockData[]>([]);                // Stock price data
  const [selectedTrends, setSelectedTrends] = useState<string[]>(["EMA12", "EMA26"]); // Active trends
  const [timeframe, setTimeframe] = useState<string>("5Y");         // Selected timeframe
  const [loading, setLoading] = useState<boolean>(true);            // Loading state
  const [mounted, setMounted] = useState<boolean>(false);           // To prevent SSR issues

  //===========================
  // 3. Fetch Data Effects
  //===========================
  useEffect(() => {
    setMounted(true);                       // Component mounted
    fetchStockData(symbolParam, timeframe); // Fetch stock data
  }, [symbolParam, timeframe]);

  // Reset timeframe when symbol changes
  useEffect(() => {
    setTimeframe("5Y");
  }, [symbolParam]);

  //===========================
  // 4. Fetch Stock Data
  //===========================
  const fetchStockData = async (symbol: string, tf: string): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/stocks?symbol=${symbol}&timeframe=${tf}`);
      if (!res.ok) {
        setData([]); // Clear data on error
        return;
      }
      const json = await res.json();
      setData(Array.isArray(json.records) ? json.records : []); // Ensure array
    } catch (err) {
      console.error("Error fetching:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  //===========================
  // 5. Handlers
  //===========================
  const handleFilterChange = (tf: string) => setTimeframe(tf); // Change timeframe
  const handleToggle = (trend: string) =>
    setSelectedTrends((prev) =>
      prev.includes(trend) ? prev.filter((t) => t !== trend) : [...prev, trend]
    ); // Toggle technical trend

  //===========================
  // 6. Icons for trends
  //===========================
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

  // Timeframe display labels
  const timeframeLabels: Record<string, string> = {
    "1D": "1Day",
    "1W": "1Week",
    "1M": "1Month",
    "6M": "6Month",
    "1Y": "1Year",
    "5Y": "5Year",
  };

  //===========================
  // 7. Theme Styles
  //===========================
  const isDark = theme === "dark";

  const themeStyles = {
    background: isDark ? "#111827" : "#f5f5f5",
    textPrimary: isDark ? "#f9fafb" : "#111827",
    textSecondary: isDark ? "#d1d5db" : "#6b7280",
    cardBackground: isDark ? "#1f2937" : "#ffffff",
    cardBorder: isDark ? "#374151" : "#e2e8f0",
    buttonBackground: isDark ? "#374151" : "#ffffff",
    buttonBorder: isDark ? "#4b5563" : "#cbd5e1",
    buttonText: isDark ? "#e5e7eb" : "#475569",
    chartBackground: isDark ? "#1f2937" : "#ffffff",
    hoverBackground: isDark ? "#4b5563" : "#f1f5f9",
  };

  // Prevent SSR mismatch
  if (!mounted) return null;

  //===========================
  // 8. Render
  //===========================
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
      {/* Main content */}
      <main style={{ flex: 1, padding: "20px 40px" }}>
        {/*==================== HERO SECTION ====================*/}
        <div
          style={{
            width: "100%",
            minHeight: "25vh",
            padding: "30px 20px",
            marginBottom: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            background: isDark
              ? "linear-gradient(135deg, #111827 0%, #1e1e2f 100%)"
              : "linear-gradient(135deg, #e0e7ff 0%, #e2e7fc 100%)",
            color: isDark ? "#f9fafb" : "#111827",
            borderRadius: "16px",
          }}
        >
          {/* Icon Circle */}
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: isDark ? "#3b82f6" : "#6366f1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "15px",
              boxShadow: isDark
                ? "0 6px 20px rgba(0,0,0,0.3)"
                : "0 4px 12px rgba(103,58,183,0.2)",
            }}
          >
            <TrendingUp size={28} color="#fff" />
          </div>

          {/* Hero Title */}
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: "8px",
              background: "linear-gradient(90deg, #3b82f6 0%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Stock Trend Prediction System
          </h1>

          {/* Hero Description */}
          <p
            style={{
              fontSize: "1rem",
              maxWidth: "600px",
              lineHeight: 1.5,
              margin: 0,
              color: isDark ? "#d1d5db" : "#4b5563",
            }}
          >
            This system analyzes Nepal Stock Exchange data using technical indicators
            and machine learning models to identify market trends and provide predictive
            insights based on historical patterns.
          </p>
        </div>

        {/*==================== CONTAINERS: TIMEFRAME + INDICATORS ====================*/}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {/* Timeframe Container */}
          <div
            style={{
              flex: 1,
              minWidth: "280px",
              padding: "16px",
              borderRadius: "12px",
              backgroundColor: themeStyles.cardBackground,
              border: `1px solid ${themeStyles.cardBorder}`,
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Zap size={18} color="#f59e0b" />
              <h3 style={{ fontSize: "16px", fontWeight: 600, margin: 0, color: themeStyles.textPrimary }}>
                Timeframe
              </h3>
            </div>

            {/* Timeframe Buttons */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {Object.entries(timeframeLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => handleFilterChange(key)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontWeight: 500,
                    fontSize: "14px",
                    cursor: "pointer",
                    ...(key === timeframe
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
                  {label}
                </button>
              ))}
            </div>
          </div>


          {/*==================== TECHNICAL INDICATORS CONTAINER ====================*/}
          <div
            style={{
              flex: 1,
              minWidth: "280px",
              padding: "16px",
              borderRadius: "12px",
              backgroundColor: themeStyles.cardBackground,
              border: `1px solid ${themeStyles.cardBorder}`,
            }}
          >
            {/* Header: Icon + Title */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Activity size={18} color="#06b6d4" />
              <h3 style={{ fontSize: "16px", fontWeight: 600, margin: 0, color: themeStyles.textPrimary }}>
                Technical Indicators
              </h3>
            </div>
              {/* Buttons for each indicator */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["EMA12", "EMA26", "BB", "RSI", "VOLUME"].map((trend) => (
                <button
                  key={trend}
                  onClick={() => handleToggle(trend)}     //Toggle indicator
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
                           // Active indicator style
                          background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                          color: "#fff",
                          border: "none",
                        }
                      : {
                         // Inactive indicator style
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
        </div>

        {/*==================== MARKET TREND STATUS ====================*/}
        {data.length > 0 && (
          <div style={{ marginBottom: "20px", display: "flex", gap: "12px", alignItems: "center", paddingLeft: "10px" }}>
            {/* Label */}
            <span style={{ fontSize: "14px", fontWeight: 600, color: themeStyles.textSecondary }}>
              Market Trend:
            </span>

             {/* Trend Indicator Badge */}
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

        {/*==================== CHART + TECHNICAL STATUS ====================*/}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {/* STOCK CHART CONTAINER */}
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

                 {/* Chart Header */}
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

               {/* Chart or Loading Spinner */}
              <div style={{ minHeight: "450px" }}>
                {loading ? (
                   // Loading Spinner
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
                   // Render chart component
                  <StockChart data={data} selectedTrends={selectedTrends} />
                )}
              </div>
            </div>
          </div>

          {/* TECHNICAL STATUS PANEL */}
          <div style={{ flex: 1, minWidth: "48%" }}>
            <TechnicalStatus symbol={symbolParam} />
          </div>
        </div>
      </main>

      {/*==================== GLOBAL SPINNER ANIMATION ====================*/}
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