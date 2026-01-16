"use client";
import React from "react"; 
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Stack,
  useTheme,
  Divider,
} from "@mui/material";
import {
  School,
  TrendingUp,
  CandlestickChart,
  ShowChart,
  Psychology,
  Speed,
  BarChart,
  WarningAmber,
} from "@mui/icons-material";
import { motion, Variants } from "framer-motion";


const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};


const SectionCard = ({
  icon,
  title,
  content,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  index: number;
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeUp}
  custom={index} // <-- pass the index as `custom`
  whileHover={{ scale: 1.03 }}
  style={{ height: "100%", width: "100%" }}
>
      <Card
        sx={{
          p: 5,
          borderRadius: 4,
          height: "100%",
          bgcolor: isDark ? "#1e1e2f" : "#ffffff",
          boxShadow: isDark
            ? "0 8px 24px rgba(0,0,0,0.25)"
            : "0 6px 18px rgba(103,58,183,0.15)",
          border: isDark ? "1px solid #2e2e3f" : "1px solid rgba(103,58,183,0.1)",
          cursor: "pointer",
          transition: "0.4s",
          "&:hover": {
            boxShadow: isDark
              ? "0 15px 40px rgba(106,27,154,0.5)"
              : "0 12px 30px rgba(103,58,183,0.25)",
            transform: "scale(1.05)",
          },
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              bgcolor: isDark ? "#6a1b9a" : "#7b5cf5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isDark
                ? "0 6px 20px rgba(0,0,0,0.25)"
                : "0 4px 12px rgba(103,58,183,0.15)",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.2)",
                boxShadow: "0 10px 28px rgba(0,0,0,0.3)",
              },
            }}
          >
              {React.isValidElement(icon) ? (
    React.cloneElement(icon as React.ReactElement<any>, {
      fontSize: "large",
      htmlColor: "#fff",
    })
  ) : (
    icon
  )}
</Box>

          <Typography
            variant="h6"
            fontWeight={800}
            color={isDark ? "grey.100" : "text.primary"}
            textAlign="center"
          >
            {title}
          </Typography>

          <Typography
            color={isDark ? "grey.400" : "text.secondary"}
            lineHeight={1.9}
            textAlign="center"
          >
            {content}
          </Typography>
        </Stack>
      </Card>
    </motion.div>
  );
};

export default function LearnPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box>
      {/* HERO SECTION */}
      <Box
        sx={{
          py: 12,
          background: isDark
            ? "linear-gradient(135deg, #1e1e2f, #151528)"
            : "linear-gradient(135deg, #f0f4ff, #e0e7ff)",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              fontWeight={900}
              mb={2}
              color={isDark ? "grey.100" : "text.primary"}
              textAlign="center"
              sx={{ fontSize: { xs: "2rem", md: "2.6rem" } }}
            >
              Learn & Understand Stock Market
            </Typography>

            <Typography
              variant="h6"
              color={isDark ? "grey.400" : "text.secondary"}
              maxWidth={750}
              mx="auto"
              textAlign="center"
              sx={{ fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.6 }}
            >
              Explore how stocks work, understand market behavior, and learn
              the key principles of trading with easy explanations and visual guides.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* CONTENT SECTION */}
      <Box
        sx={{
          py: 10,
          width: "100%",
          background: isDark
            ? "linear-gradient(135deg, #151528, #1e1e2f)"
            : "linear-gradient(135deg, #fdfdfd, #f3f4ff)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            {[
              {
                icon: <School />,
                title: "What is the Stock Market?",
                content:
                  "A stock market is a place where investors buy and sell shares of companies. Each share represents ownership in a company. Prices change daily depending on company performance, demand and supply, and economic events. Beginners can start by learning small investments and observing market trends before trading.",
              },
              {
                icon: <TrendingUp />,
                title: "Why Stock Prices Go Up or Down",
                content:
                  "Stock prices rise when more investors want to buy than sell and fall when selling dominates. Influencing factors include company profits, market sentiment, global and local economic news, investor psychology, and trading volume. Understanding these factors helps beginners make informed decisions.",
              },
              {
                icon: <CandlestickChart />,
                title: "Understanding Candlestick Charts",
                content:
                  "Candlestick charts show price movement over a period. Each candle has an open, close, high, and low price. Green/white candles indicate price increase, red/black candles indicate decrease. Beginners can use these charts to see patterns, trends, and market momentum visually.",
              },
              {
                icon: <ShowChart />,
                title: "What Are Technical Indicators?",
                content:
                  "Technical indicators analyze price data mathematically. Examples include EMA (trend direction), RSI (overbought/oversold), and Bollinger Bands (price volatility). These indicators help traders identify entry and exit points and understand market conditions better.",
              },
              {
                icon: <BarChart />,
                title: "Top Gainers and Top Losers",
                content:
                  "Top gainers are stocks with the highest price increase in a day; top losers are the opposite. This helps beginners quickly spot strong and weak performers. Observing these lists can provide insights into market trends and investment opportunities.",
              },
              {
                icon: <Psychology />,
                title: "Logic Behind Gainers & Losers",
                content:
                  "Our system compares today's price with previous prices to calculate percentage changes. Stocks with high positive changes are labeled as gainers, while high negative changes are losers. Volume and market momentum are also considered. Beginners can use this to track which stocks are trending.",
              },
              {
                icon: <Speed />,
                title: "AI Trend & Confidence Score",
                content:
                  "The confidence score measures how strongly multiple indicators agree on a stock trend. A high score indicates strong alignment among EMA, RSI, volume, and price direction. Beginners can use this as a guide to understand the reliability of a predicted trend.",
              },
              {
                icon: <WarningAmber />,
                title: "Important Note for Beginners",
                content:
                  "Stock predictions are not guaranteed. Always combine analysis with personal research, risk management, and small investments first. Use this platform to learn, practice, and gain confidence without risking significant capital.",
              },
            ].map((item, index) => (
              <Grid key={item.title} item xs={12} md={6}>
                <SectionCard
                  icon={item.icon}
                  title={item.title}
                  content={item.content}
                  index={index}
                />
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 8, borderColor: isDark ? "#2e2e3f" : "#d1d5db" }} />

          <Typography
            variant="body1"
            color={isDark ? "grey.400" : "text.secondary"}
            textAlign="center"
            maxWidth={900}
            mx="auto"
          >
            This learning page provides a beginner-friendly guide to understand stock market fundamentals, charts, indicators, and AI-assisted trend predictions.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}