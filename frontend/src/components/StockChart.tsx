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

interface StockChartProps {
  data: any[];
  selectedTrends: string[];
}

const StockChart: React.FC<StockChartProps> = ({ data, selectedTrends }) => {
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
    (d: any) => d.date,
  );
  const {
    data: chartData,
    xScale,
    xAccessor,
    displayXAccessor,
  } = xScaleProvider(formattedData);

  // Decide which extra panels to show
  const showVolume =
    selectedTrends.includes("VOLUME") &&
    chartData.some((d) => d.volume !== null);
  const showRSI =
    selectedTrends.includes("RSI") && chartData.some((d) => d.RSI14 !== null);

  const mainHeight = showRSI ? 380 : 450;
  const volumeHeight = showVolume ? 80 : 0;
  const rsiHeight = showRSI ? 120 : 0;
  const totalHeight = mainHeight + volumeHeight + rsiHeight + 40;

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
    >
      {/* Main price chart */}
      <Chart
        id={1}
        yExtents={(d: any) => [d.high, d.low, d.BB_UPPER, d.BB_LOWER]}
      >
        <XAxis />
        <YAxis />
        <MouseCoordinateX displayFormat={timeFormat("%Y-%m-%d")} />
        <MouseCoordinateY />
        <CandlestickSeries />

        {/* Overlays */}
        {selectedTrends.includes("EMA12") && (
          <LineSeries yAccessor={(d: any) => d.EMA12} stroke="#22c55e" />
        )}
        {selectedTrends.includes("EMA26") && (
          <LineSeries yAccessor={(d: any) => d.EMA26} stroke="#3b82f6" />
        )}
        {selectedTrends.includes("BB") && (
          <>
            <LineSeries yAccessor={(d: any) => d.BB_UPPER} stroke="#f97316" />
            <LineSeries yAccessor={(d: any) => d.BB_LOWER} stroke="#f97316" />
            <LineSeries yAccessor={(d: any) => d.BB_MA20} stroke="#a78bfa" />
          </>
        )}
      </Chart>

      {/* Volume chart */}
      {showVolume && (
        <Chart id={2} height={volumeHeight} yExtents={(d: any) => d.volume}>
          <YAxis />
          <BarSeries yAccessor={(d: any) => d.volume} />
        </Chart>
      )}

      {/* RSI chart */}
      {showRSI && (
        <Chart id={3} height={rsiHeight} yExtents={[0, 100]}>
          <XAxis />
          <YAxis />
          <AreaSeries yAccessor={(d: any) => d.RSI14} />
        </Chart>
      )}

      <CrossHairCursor />
    </ChartCanvas>
  );
};

export default StockChart;
