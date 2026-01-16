
"use client";
import React, { useEffect, useState } from "react";
import { ChartCanvas, Chart } from "react-financial-charts";
import {
  CandlestickSeries,
  LineSeries,
  BarSeries,
  AreaSeries,
} from "@react-financial-charts/series";
import { XAxis, YAxis } from "@react-financial-charts/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from "@react-financial-charts/coordinates";
import { discontinuousTimeScaleProvider } from "@react-financial-charts/scales";
import { timeFormat } from "d3-time-format";
import { useTheme } from "@mui/material";

interface StockChartProps {
  data: any[];
  selectedTrends: string[];
}

const StockChart: React.FC<StockChartProps> = ({ data, selectedTrends }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [width, setWidth] = useState<number>(900);

  useEffect(() => {
    const onResize = () =>
      setWidth(Math.max(600, Math.min(window.innerWidth - 120, 1400)));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!data || data.length === 0) return <div>No data available</div>;

  const formattedData = data
    .map((d) => ({
      ...d,
      date: d.date ? new Date(d.date) : null,
      open: d.open !== null ? +d.open : null,
      high: d.high !== null ? +d.high : null,
      low: d.low !== null ? +d.low : null,
      close: d.close !== null ? +d.close : null,
      volume: d.volume !== null ? +d.volume : null,
      EMA12: d.EMA12 !== undefined ? +d.EMA12 : undefined,
      EMA26: d.EMA26 !== undefined ? +d.EMA26 : undefined,
      BB_UPPER: d.BB_UPPER !== undefined ? +d.BB_UPPER : undefined,
      BB_LOWER: d.BB_LOWER !== undefined ? +d.BB_LOWER : undefined,
      BB_MA20: d.BB_MA20 !== undefined ? +d.BB_MA20 : undefined,
      RSI14: d.RSI14 !== undefined ? +d.RSI14 : undefined,
    }))
    .filter((d) => d.date !== null);

  if (formattedData.length === 0) return <div>No valid dates available</div>;

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d: any) => d.date
  );
  const { data: chartData, xScale, xAccessor, displayXAccessor } =
    xScaleProvider(formattedData);

  const showVolume =
    selectedTrends.includes("VOLUME") &&
    chartData.some((d) => d.volume !== null);
  const showRSI =
    selectedTrends.includes("RSI") && chartData.some((d) => d.RSI14 !== null);

  const mainHeight = showRSI ? 380 : 450;
  const volumeHeight = showVolume ? 80 : 0;
  const rsiHeight = showRSI ? 120 : 0;
  const totalHeight = mainHeight + volumeHeight + rsiHeight + 50;

  // Theme colors
  const colors = {
    up: isDark ? "#22c55e" : "#16a34a",
    down: isDark ? "#ef4444" : "#dc2626",
    EMA12: "#22c55e",
    EMA26: "#3b82f6",
    BB: "#f97316",
    BBMA: "#a78bfa",
    volume: isDark ? "#6b7280" : "#c7d2fe",
    RSI: isDark ? "#fbbf24" : "#facc15",
    bg: isDark ? "#1a1a2e" : "#fff",
    grid: isDark ? "#2e2e3f" : "#e5e7eb",
  };

  return (
    <ChartCanvas
      height={totalHeight}
      width={width}
      ratio={window.devicePixelRatio || 1}
      margin={{ left: 60, right: 60, top: 10, bottom: 30 }}
      data={chartData}
      seriesName="NEPSE"
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      style={{ background: colors.bg }}
    >
      {/* Main chart */}
      <Chart
        id={1}
        yExtents={(d: any) => [d.high, d.low, d.BB_UPPER, d.BB_LOWER]}
      >
        <XAxis showGridLines stroke={colors.grid} />
        <YAxis showGridLines stroke={colors.grid} />
        <MouseCoordinateX displayFormat={timeFormat("%Y-%m-%d")} />
        <MouseCoordinateY displayFormat={(y) => y.toFixed(2)} />

        <CandlestickSeries
          fill={(d) => (d.close > d.open ? colors.up : colors.down)}
          wickStroke={(d) => (d.close > d.open ? colors.up : colors.down)}
          candleStrokeWidth={1.5}
        />

        {/* Overlays */}
        {selectedTrends.includes("EMA12") && (
          <LineSeries yAccessor={(d: any) => d.EMA12} stroke={colors.EMA12} />
        )}
        {selectedTrends.includes("EMA26") && (
          <LineSeries yAccessor={(d: any) => d.EMA26} stroke={colors.EMA26} />
        )}
        {selectedTrends.includes("BB") && (
          <>
            <LineSeries yAccessor={(d: any) => d.BB_UPPER} stroke={colors.BB} />
            <LineSeries yAccessor={(d: any) => d.BB_LOWER} stroke={colors.BB} />
            <LineSeries yAccessor={(d: any) => d.BB_MA20} stroke={colors.BBMA} />
          </>
        )}
      </Chart>

      {/* Volume */}
      {showVolume && (
        <Chart id={2} height={volumeHeight} yExtents={(d: any) => d.volume}>
          <YAxis showGridLines={false} />
          <BarSeries
            yAccessor={(d: any) => d.volume}
            fill={colors.volume}
            opacity={0.6}
          />
        </Chart>
      )}

      {/* RSI */}
      {showRSI && (
        <Chart id={3} height={rsiHeight} yExtents={[0, 100]}>
          <XAxis stroke={colors.grid} />
          <YAxis stroke={colors.grid} />
          <AreaSeries
            yAccessor={(d: any) => d.RSI14}
            fill={colors.RSI + "55"}
            stroke={colors.RSI}
          />
        </Chart>
      )}

      <CrossHairCursor stroke={isDark ? "#f97316" : "#3b82f6"} />
    </ChartCanvas>
  );
};

export default StockChart;
