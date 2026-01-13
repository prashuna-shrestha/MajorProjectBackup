"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Grid,
  Chip,
  useTheme,
  Paper,
  alpha,
  Button,
  Skeleton,
  Fade,
  Zoom,
  Grow,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import InsightsIcon from "@mui/icons-material/Insights";

type Stock = {
  symbol: string;
  company_name: string;
  current_price: number;
  change_percent: number;
  last_7_days: number[];
};

export default function HomePage() {
  const theme = useTheme();
  const [gainers, setGainers] = useState<Stock[]>([]);
  const [losers, setLosers] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if dark mode is active for better contrast adjustments
  const isDarkMode = theme.palette.mode === "dark";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/api/market-movers")
      .then((res) => res.json())
      .then((data) => {
        setGainers((data.gainers || []).slice(0, 10));
        setLosers((data.losers || []).slice(0, 10));
      })
      .catch((err) => console.error("Market movers error:", err))
      .finally(() => setLoading(false));
  };

  const renderChart = (prices: number[], positive: boolean) => {
    const chartData = prices
      .map((price, index) => ({ day: `D${7 - index}`, price }))
      .reverse();

    const lineColor = positive
      ? isDarkMode ? "#4caf50" : "#2e7d32" // Brighter green for dark mode
      : isDarkMode ? "#f44336" : "#c62828"; // Brighter red for dark mode
    
    const gradientColor = positive
      ? isDarkMode ? alpha("#4caf50", 0.25) : alpha("#2e7d32", 0.15)
      : isDarkMode ? alpha("#f44336", 0.25) : alpha("#c62828", 0.15);

    const tooltipBg = isDarkMode 
      ? theme.palette.grey[900] 
      : theme.palette.background.paper;
    const tooltipColor = isDarkMode 
      ? theme.palette.common.white 
      : theme.palette.text.primary;

    return (
      <ResponsiveContainer width="100%" height={60}>
        <LineChart data={chartData}>
          <defs>
            <linearGradient id={`gradient-${positive}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={lineColor} stopOpacity={isDarkMode ? 0.6 : 0.8} />
              <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" hide />
          <YAxis domain={["auto", "auto"]} hide />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              color: tooltipColor,
              border: `1px solid ${isDarkMode ? theme.palette.grey[700] : theme.palette.grey[300]}`,
              borderRadius: "8px",
              boxShadow: theme.shadows[3],
              padding: "8px 12px",
              fontSize: "0.875rem",
            }}
            formatter={(value: any) => [`Rs. ${value.toFixed(2)}`, "Price"]}
            labelStyle={{ fontWeight: 600 }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="none"
            fill={`url(#gradient-${positive})`}
            fillOpacity={0.4}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={lineColor}
            strokeWidth={isDarkMode ? 3 : 2.5}
            dot={{ r: 0 }}
            activeDot={{ 
              r: 5, 
              fill: lineColor,
              stroke: isDarkMode ? theme.palette.common.white : theme.palette.grey[100],
              strokeWidth: 2
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderCard = (s: Stock, positive: boolean, index: number) => {
    const borderColor = positive
      ? isDarkMode ? "#4caf50" : "#2e7d32"
      : isDarkMode ? "#f44336" : "#c62828";
    
    const bgColor = isDarkMode
      ? positive
        ? alpha("#4caf50", 0.08)
        : alpha("#f44336", 0.08)
      : positive
        ? alpha("#2e7d32", 0.05)
        : alpha("#c62828", 0.05);

    return (
      <Grow in={true} timeout={index * 100}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: isDarkMode 
              ? `0 4px 16px ${alpha(borderColor, 0.15)}`
              : `0 4px 12px ${alpha(borderColor, 0.1)}`,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              boxShadow: isDarkMode
                ? `0 8px 24px ${alpha(borderColor, 0.25)}`
                : `0 8px 20px ${alpha(borderColor, 0.15)}`,
              transform: "translateY(-4px)",
            },
            backgroundColor: isDarkMode
              ? theme.palette.grey[900]
              : theme.palette.background.paper,
            border: `1px solid ${isDarkMode 
              ? theme.palette.grey[800] 
              : theme.palette.grey[200]}`,
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: `linear-gradient(90deg, ${borderColor}, ${alpha(borderColor, 0.7)})`,
            },
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="h6"
                    fontWeight={800}
                    color={isDarkMode ? theme.palette.common.white : theme.palette.text.primary}
                    sx={{
                      fontSize: "1.1rem",
                    }}
                  >
                    {s.symbol}
                  </Typography>
                  {index < 3 && positive && (
                    <Chip
                      icon={<EmojiEventsIcon />}
                      label={`#${index + 1}`}
                      size="small"
                      sx={{
                        backgroundColor: isDarkMode
                          ? alpha(theme.palette.warning.main, 0.2)
                          : alpha(theme.palette.warning.main, 0.1),
                        color: theme.palette.warning.main,
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        height: "24px",
                      }}
                    />
                  )}
                </Box>

                <Typography
                  variant="caption"
                  color={isDarkMode ? theme.palette.grey[400] : theme.palette.text.secondary}
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    fontWeight: 500,
                    fontSize: "0.8rem",
                  }}
                >
                  {s.company_name}
                </Typography>
              </Box>

              {positive ? (
                <TrendingUpIcon sx={{ 
                  color: borderColor, 
                  fontSize: 28,
                  backgroundColor: isDarkMode 
                    ? alpha(borderColor, 0.15) 
                    : alpha(borderColor, 0.1),
                  borderRadius: "50%",
                  p: 0.5,
                }} />
              ) : (
                <TrendingDownIcon sx={{ 
                  color: borderColor, 
                  fontSize: 28,
                  backgroundColor: isDarkMode 
                    ? alpha(borderColor, 0.15) 
                    : alpha(borderColor, 0.1),
                  borderRadius: "50%",
                  p: 0.5,
                }} />
              )}
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2.5}>
              <Box>
                <Typography
                  variant="caption"
                  color={isDarkMode ? theme.palette.grey[400] : theme.palette.text.secondary}
                  fontWeight={500}
                  sx={{ fontSize: "0.75rem" }}
                >
                  Current Price
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight={800}
                  color={isDarkMode ? theme.palette.common.white : theme.palette.text.primary}
                  sx={{ fontSize: "1.5rem" }}
                >
                  Rs. {s.current_price.toFixed(2)}
                </Typography>
              </Box>

              <Chip
                icon={positive ? <TrendingUpIcon /> : <TrendingDownIcon />}
                label={`${positive ? "+" : ""}${s.change_percent.toFixed(2)}%`}
                sx={{
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  px: 1.5,
                  py: 0.5,
                  backgroundColor: bgColor,
                  color: borderColor,
                  border: `1px solid ${alpha(borderColor, 0.3)}`,
                  '& .MuiChip-icon': {
                    color: borderColor,
                  }
                }}
              />
            </Box>

            <Divider
              sx={{
                my: 2,
                borderColor: isDarkMode 
                  ? theme.palette.grey[800] 
                  : theme.palette.grey[300],
              }}
            />

            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography
                  variant="caption"
                  color={isDarkMode ? theme.palette.grey[400] : theme.palette.text.secondary}
                  fontWeight={500}
                  sx={{ fontSize: "0.75rem" }}
                >
                  7-Day Trend
                </Typography>
                <InsightsIcon sx={{ 
                  fontSize: 16, 
                  color: isDarkMode ? theme.palette.grey[500] : theme.palette.grey[600] 
                }} />
              </Box>
              {renderChart(s.last_7_days, positive)}
            </Box>
          </CardContent>
        </Card>
      </Grow>
    );
  };

  const renderSkeleton = () => (
    <Grid container spacing={2}>
      {[...Array(10)].map((_, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Card sx={{ 
            borderRadius: 3,
            backgroundColor: isDarkMode ? theme.palette.grey[900] : theme.palette.background.paper,
            border: `1px solid ${isDarkMode 
              ? theme.palette.grey[800] 
              : theme.palette.grey[200]}`,
          }}>
            <CardContent sx={{ p: 2.5 }}>
              <Skeleton 
                variant="text" 
                width="40%" 
                height={32} 
                sx={{ bgcolor: isDarkMode ? 'grey.800' : 'grey.200' }} 
              />
              <Skeleton 
                variant="text" 
                width="60%" 
                height={24} 
                sx={{ mt: 1, bgcolor: isDarkMode ? 'grey.800' : 'grey.200' }} 
              />
              <Skeleton 
                variant="text" 
                width="50%" 
                height={40} 
                sx={{ mt: 2, bgcolor: isDarkMode ? 'grey.800' : 'grey.200' }} 
              />
              <Skeleton 
                variant="rectangular" 
                height={60} 
                sx={{ 
                  mt: 2, 
                  borderRadius: 2,
                  bgcolor: isDarkMode ? 'grey.800' : 'grey.200' 
                }} 
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isDarkMode 
          ? theme.palette.grey[950] 
          : theme.palette.grey[50],
        pt: 4,
        pb: 8,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "300px",
          background: isDarkMode
            ? `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, transparent 100%)`,
          zIndex: 0,
        }
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header Section */}
        <Fade in={true} timeout={800}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              p: 4,
              mb: 6,
              backgroundColor: isDarkMode 
                ? theme.palette.grey[900] 
                : theme.palette.background.paper,
              border: `1px solid ${isDarkMode 
                ? theme.palette.grey[800] 
                : theme.palette.grey[200]}`,
              boxShadow: isDarkMode 
                ? `0 4px 24px ${alpha(theme.palette.common.black, 0.3)}`
                : `0 4px 20px ${alpha(theme.palette.grey[300], 0.5)}`,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              },
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={3}>
              <Box flex={1} minWidth="300px">
                <Typography
                  variant="h3"
                  fontWeight={900}
                  gutterBottom
                  sx={{
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                  }}
                >
                  <ShowChartIcon sx={{ fontSize: { xs: 32, md: 40 } }} />
                  Stock Prediction System
                </Typography>
                <Typography
                  variant="h6"
                  color={isDarkMode ? theme.palette.grey[300] : theme.palette.text.secondary}
                  fontWeight={500}
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 1,
                    fontSize: { xs: "1rem", md: "1.25rem" }
                  }}
                >
                  Welcome back, Investor 👋
                  <ArrowForwardIcon sx={{ fontSize: 20, ml: 1 }} />
                  Real-time market insights & predictions
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={fetchData}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  py: 1.5,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
                  },
                  transition: "all 0.3s",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Refresh Data
              </Button>
            </Box>
          </Paper>
        </Fade>

        {/* Main Content Grid */}
        <Grid container spacing={4}>
          {/* Top Gainers Section */}
          <Grid item xs={12} lg={6}>
            <Zoom in={true} timeout={600}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  p: 3,
                  backgroundColor: isDarkMode 
                    ? theme.palette.grey[900] 
                    : theme.palette.background.paper,
                  border: `1px solid ${isDarkMode 
                    ? theme.palette.grey[800] 
                    : theme.palette.grey[200]}`,
                  boxShadow: isDarkMode 
                    ? `0 4px 20px ${alpha(theme.palette.common.black, 0.2)}`
                    : `0 4px 16px ${alpha(theme.palette.grey[300], 0.4)}`,
                  height: "100%",
                }}
              >
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, #2e7d32, #4caf50)`,
                        boxShadow: `0 4px 20px ${alpha("#4caf50", 0.3)}`,
                      }}
                    >
                      <TrendingUpIcon sx={{ color: "white", fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight={800}
                        color={isDarkMode ? theme.palette.common.white : theme.palette.grey[900]}
                      >
                        Top Gainers
                      </Typography>
                      <Typography variant="body2" color={isDarkMode ? theme.palette.grey[400] : theme.palette.text.secondary}>
                        Stocks with highest positive momentum
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    icon={<WhatshotIcon />}
                    label={`${gainers.length} Stocks`}
                    sx={{
                      backgroundColor: isDarkMode 
                        ? alpha("#4caf50", 0.2) 
                        : alpha("#4caf50", 0.1),
                      color: "#4caf50",
                      fontWeight: 600,
                      border: `1px solid ${alpha("#4caf50", 0.3)}`,
                    }}
                  />
                </Box>

                {loading ? (
                  renderSkeleton()
                ) : (
                  <Grid container spacing={2}>
                    {gainers.map((s, index) => (
                      <Grid item xs={12} sm={6} key={s.symbol}>
                        {renderCard(s, true, index)}
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Paper>
            </Zoom>
          </Grid>

          {/* Top Losers Section */}
          <Grid item xs={12} lg={6}>
            <Zoom in={true} timeout={800}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  p: 3,
                  backgroundColor: isDarkMode 
                    ? theme.palette.grey[900] 
                    : theme.palette.background.paper,
                  border: `1px solid ${isDarkMode 
                    ? theme.palette.grey[800] 
                    : theme.palette.grey[200]}`,
                  boxShadow: isDarkMode 
                    ? `0 4px 20px ${alpha(theme.palette.common.black, 0.2)}`
                    : `0 4px 16px ${alpha(theme.palette.grey[300], 0.4)}`,
                  height: "100%",
                }}
              >
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, #c62828, #f44336)`,
                        boxShadow: `0 4px 20px ${alpha("#f44336", 0.3)}`,
                      }}
                    >
                      <TrendingDownIcon sx={{ color: "white", fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight={800}
                        color={isDarkMode ? theme.palette.common.white : theme.palette.grey[900]}
                      >
                        Top Losers
                      </Typography>
                      <Typography variant="body2" color={isDarkMode ? theme.palette.grey[400] : theme.palette.text.secondary}>
                        Stocks with highest negative momentum
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    icon={<WhatshotIcon />}
                    label={`${losers.length} Stocks`}
                    sx={{
                      backgroundColor: isDarkMode 
                        ? alpha("#f44336", 0.2) 
                        : alpha("#f44336", 0.1),
                      color: "#f44336",
                      fontWeight: 600,
                      border: `1px solid ${alpha("#f44336", 0.3)}`,
                    }}
                  />
                </Box>

                {loading ? (
                  renderSkeleton()
                ) : (
                  <Grid container spacing={2}>
                    {losers.map((s, index) => (
                      <Grid item xs={12} sm={6} key={s.symbol}>
                        {renderCard(s, false, index)}
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Paper>
            </Zoom>
          </Grid>
        </Grid>

        {/* Stats Footer */}
        <Fade in={!loading} timeout={1000}>
          <Box mt={6}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                p: 3,
                backgroundColor: isDarkMode 
                  ? theme.palette.grey[900] 
                  : theme.palette.background.paper,
                border: `1px solid ${isDarkMode 
                  ? theme.palette.grey[800] 
                  : theme.palette.grey[200]}`,
                boxShadow: isDarkMode 
                  ? `0 4px 20px ${alpha(theme.palette.common.black, 0.2)}`
                  : `0 4px 16px ${alpha(theme.palette.grey[300], 0.3)}`,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Typography 
                      variant="h3" 
                      fontWeight={900} 
                      color={theme.palette.primary.main}
                      sx={{ fontSize: { xs: "2.5rem", sm: "3rem" } }}
                    >
                      {gainers.length + losers.length}
                    </Typography>
                    <Typography variant="body1" color={isDarkMode ? theme.palette.grey[300] : theme.palette.text.secondary}>
                      Total Stocks Tracked
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Typography 
                      variant="h3" 
                      fontWeight={900} 
                      color="#4caf50"
                      sx={{ fontSize: { xs: "2.5rem", sm: "3rem" } }}
                    >
                      {gainers.length}
                    </Typography>
                    <Typography variant="body1" color={isDarkMode ? theme.palette.grey[300] : theme.palette.text.secondary}>
                      Positive Stocks
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Typography 
                      variant="h3" 
                      fontWeight={900} 
                      color="#f44336"
                      sx={{ fontSize: { xs: "2.5rem", sm: "3rem" } }}
                    >
                      {losers.length}
                    </Typography>
                    <Typography variant="body1" color={isDarkMode ? theme.palette.grey[300] : theme.palette.text.secondary}>
                      Negative Stocks
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}