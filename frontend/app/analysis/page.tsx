
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import StockChart from "@/components/StockChart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TechnicalStatus from "@/components/TechnicalStatus";
import { TrendingUp, BarChart3, Zap, Clock, Activity, Volume2, LineChart } from "lucide-react";
import { RootState } from "@/store"; // Adjust path as needed

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
  
  // Get theme from Redux store
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
        ${BACKEND_URL}/api/stocks?symbol=${symbol}&timeframe=${tf}
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

  // Theme-based styles
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
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      minHeight: "100vh",
      backgroundColor: themeStyles.background,
      color: themeStyles.textPrimary,
      transition: "background-color 0.3s ease, color 0.3s ease"
    }}>
      <Header />

      <main style={{ 
        padding: "20px", 
        flex: 1, 
        backgroundColor: themeStyles.background
      }}>
        {/* Enhanced Header Section */}
        <div style={{ marginBottom: "30px" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px", 
            marginBottom: "8px",
            flexWrap: "wrap"
          }}>
            <div style={{ 
              padding: "8px", 
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <TrendingUp size={24} color="white" />
            </div>
            <h2 style={{ 
              fontSize: "28px", 
              fontWeight: "bold",
              margin: 0,
              background: "linear-gradient(90deg, #3b82f6 0%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              {symbolParam} Stock Analysis
            </h2>
            <span style={{ 
              marginLeft: "8px", 
              padding: "4px 12px", 
              backgroundColor: isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "4px",
<<<<<<< Updated upstream
              border: `1px solid ${isDark ? "rgba(59, 130, 246, 0.4)" : "rgba(59, 130, 246, 0.3)"}`,
=======
              border: 1px solid ${isDark ? "rgba(59, 130, 246, 0.4)" : "rgba(59, 130, 246, 0.3)"},
>>>>>>> Stashed changes
              color: themeStyles.textPrimary
            }}>
              <Clock size={14} />
              {timeframeLabels[timeframe]}
            </span>
          </div>
          <p style={{ 
            color: themeStyles.textSecondary, 
            margin: 0,
            fontSize: "14px"
          }}>
            Technical analysis with real-time indicators and predictions
          </p>
        </div>

        {/* Enhanced Timeframe buttons */}
        <div style={{ 
          marginBottom: "20px",
          padding: "16px",
          backgroundColor: themeStyles.cardBackground,
          borderRadius: "12px",
<<<<<<< Updated upstream
          border: `1px solid ${themeStyles.cardBorder}`,
=======
          border: 1px solid ${themeStyles.cardBorder},
>>>>>>> Stashed changes
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s ease"
        }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px", 
            marginBottom: "12px" 
          }}>
            <Zap size={18} color="#f59e0b" />
            <h3 style={{ 
              fontSize: "16px", 
              fontWeight: 600, 
              margin: 0,
              color: themeStyles.textPrimary
            }}>
              Timeframe
            </h3>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["1D", "1W", "1M", "6M", "1Y", "5Y"].map((tf) => (
              <button
                key={tf}
                onClick={() => handleFilterChange(tf)}
                style={{
                  marginRight: "0",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: 500,
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "60px",
                  ...(tf === timeframe
                    ? {
                        background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                        color: "#ffffff",
                        boxShadow: "0 2px 4px rgba(59, 130, 246, 0.2)"
                      }
                    : {
                        backgroundColor: themeStyles.buttonBackground,
                        color: themeStyles.buttonText,
<<<<<<< Updated upstream
                        border: `1px solid ${themeStyles.buttonBorder}`
=======
                        border: 1px solid ${themeStyles.buttonBorder}
>>>>>>> Stashed changes
                      })
                }}
                onMouseOver={(e) => {
                  if (tf !== timeframe) {
                    e.currentTarget.style.backgroundColor = themeStyles.hoverBackground;
                  }
                }}
                onMouseOut={(e) => {
                  if (tf !== timeframe) {
                    e.currentTarget.style.backgroundColor = themeStyles.buttonBackground;
                  }
                }}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Trend toggle buttons */}
        <div style={{ 
          marginBottom: "30px",
          padding: "16px",
          backgroundColor: themeStyles.cardBackground,
          borderRadius: "12px",
<<<<<<< Updated upstream
          border: `1px solid ${themeStyles.cardBorder}`,
=======
          border: 1px solid ${themeStyles.cardBorder},
>>>>>>> Stashed changes
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s ease"
        }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px", 
            marginBottom: "12px" 
          }}>
            <Activity size={18} color="#06b6d4" />
            <h3 style={{ 
              fontSize: "16px", 
              fontWeight: 600, 
              margin: 0,
              color: themeStyles.textPrimary
            }}>
              Technical Indicators
            </h3>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["EMA12", "EMA26", "BB", "RSI", "VOLUME"].map((trend) => (
              <button
                key={trend}
                onClick={() => handleToggle(trend)}
                style={{
                  marginRight: "0",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: 500,
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  ...(selectedTrends.includes(trend)
                    ? {
                        background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
                        color: "#ffffff",
                        boxShadow: "0 2px 4px rgba(14, 165, 233, 0.2)"
                      }
                    : {
                        backgroundColor: themeStyles.buttonBackground,
                        color: themeStyles.buttonText,
<<<<<<< Updated upstream
                        border: `1px solid ${themeStyles.buttonBorder}`
=======
                        border: 1px solid ${themeStyles.buttonBorder}
>>>>>>> Stashed changes
                      })
                }}
                onMouseOver={(e) => {
                  if (!selectedTrends.includes(trend)) {
                    e.currentTarget.style.backgroundColor = themeStyles.hoverBackground;
                  }
                }}
                onMouseOut={(e) => {
                  if (!selectedTrends.includes(trend)) {
                    e.currentTarget.style.backgroundColor = themeStyles.buttonBackground;
                  }
                }}
              >
                {getTrendIcon(trend)}
                <span>{trend}</span>
                {selectedTrends.includes(trend) && (
                  <div style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#ffffff",
                    borderRadius: "50%",
                    marginLeft: "4px"
                  }}></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bullish/Bearish Indicator */}
        {data.length > 0 && (
          <div style={{ 
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <span style={{ 
              fontSize: "14px", 
              color: themeStyles.textSecondary,
              fontWeight: 500
            }}>
              Market Trend: 
            </span>
            <span style={{
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: 600,
              ...(data[data.length - 1]?.close > data[0]?.close
                ? {
                    backgroundColor: isDark ? "rgba(34, 197, 94, 0.2)" : "rgba(34, 197, 94, 0.1)",
                    color: "#16a34a",
<<<<<<< Updated upstream
                    border: `1px solid ${isDark ? "rgba(34, 197, 94, 0.4)" : "rgba(34, 197, 94, 0.3)"}`
=======
                    border: 1px solid ${isDark ? "rgba(34, 197, 94, 0.4)" : "rgba(34, 197, 94, 0.3)"}
>>>>>>> Stashed changes
                  }
                : {
                    backgroundColor: isDark ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.1)",
                    color: "#dc2626",
<<<<<<< Updated upstream
                    border: `1px solid ${isDark ? "rgba(239, 68, 68, 0.4)" : "rgba(239, 68, 68, 0.3)"}`
=======
                    border: 1px solid ${isDark ? "rgba(239, 68, 68, 0.4)" : "rgba(239, 68, 68, 0.3)"}
>>>>>>> Stashed changes
                  })
            }}>
              {data[data.length - 1]?.close > data[0]?.close 
                ? "📈 Bullish Trend" 
                : "📉 Bearish Trend"
              }
            </span>
          </div>
        )}

        {/* Main content: chart left, technical status right */}
        <div style={{ 
          display: "flex", 
          gap: "20px", 
          flexWrap: "wrap",
          alignItems: "flex-start"
        }}>
          {/* Chart Container - Larger Y-axis */}
          <div style={{ 
            flex: "1 1 700px", // Increased minimum width for better chart display
            minHeight: "600px", // Increased height for taller Y-axis
            display: "flex",
            flexDirection: "column"
          }}>
            {/* CHART CONTAINER - TALLER FOR BETTER Y-AXIS VISIBILITY */}
            <div style={{ 
              flex: 1, // Takes all available space
              backgroundColor: themeStyles.chartBackground,
              borderRadius: "12px", 
              padding: "20px",
<<<<<<< Updated upstream
              border: `1px solid ${themeStyles.cardBorder}`,
=======
              border: 1px solid ${themeStyles.cardBorder},
>>>>>>> Stashed changes
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s ease",
              minHeight: "550px" // Minimum height for chart area
            }}>
              {/* Chart Header - Compact */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                paddingBottom: "10px",
<<<<<<< Updated upstream
                borderBottom: `1px solid ${themeStyles.cardBorder}`,
=======
                borderBottom: 1px solid ${themeStyles.cardBorder},
>>>>>>> Stashed changes
                flexShrink: 0 // Prevents header from shrinking
              }}>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  margin: 0,
                  color: themeStyles.textPrimary,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <BarChart3 size={20} color="#3b82f6" />
                  {symbolParam} Price Chart
                </h3>
                {data.length > 0 && !loading && (
                  <div style={{
                    fontSize: "14px",
                    color: themeStyles.textSecondary,
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap"
                  }}>
                    <span>
                      Current: <strong style={{ color: themeStyles.textPrimary }}>Rs.{data[data.length - 1]?.close.toFixed(2)}</strong>
                    </span>
                  </div>
                )}
              </div>
              
              {/* Chart Area - Maximized for Y-axis */}
              <div style={{ 
                flex: 1, // Takes remaining space
                position: "relative",
                minHeight: "450px", // Minimum chart height
                overflow: "hidden" // Prevents chart overflow
              }}>
                {loading ? (
                  <div style={{ 
                    height: "100%", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center" 
                  }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{
                        display: "inline-block",
                        width: "40px",
                        height: "40px",
<<<<<<< Updated upstream
                        border: `3px solid ${isDark ? '#374151' : '#f1f5f9'}`,
=======
                        border: 3px solid ${isDark ? '#374151' : '#f1f5f9'},
>>>>>>> Stashed changes
                        borderTop: "3px solid #3b82f6",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite"
                      }}></div>
                      <p style={{ 
                        marginTop: "12px", 
                        color: themeStyles.textSecondary 
                      }}>
                        Loading chart data...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    width: "100%",
                    height: "100%",
                    position: "relative"
                  }}>
                    {/* Pass theme to StockChart component */}
                    <StockChart 
  data={data} 
  selectedTrends={selectedTrends} 
/>
                  </div>
                )}
              </div>
              
              {/* Chart Footer - Optional: Timeframe info */}
              <div style={{
                marginTop: "10px",
                paddingTop: "10px",
                borderTop: 1px solid ${themeStyles.cardBorder},

                fontSize: "12px",
                color: themeStyles.textSecondary,
                flexShrink: 0
              }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Timeframe: {timeframeLabels[timeframe]}</span>
                  <span>{data.length} data points</span>
                </div>
              </div>
            </div>
          </div>

      {/* Technical Status */}
<div style={{ 
  flex: "1", // Changed from "0 1 300px"
  minWidth: "48%", // Takes roughly half the width
  marginLeft: "20px"
}}>
  <TechnicalStatus symbol={symbolParam} />
</div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AnalysisPage;