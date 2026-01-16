"use client";
import React from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Chip,
  Avatar,
  Stack,
  Button,
  useTheme,
} from "@mui/material";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Groups,
  Code,
  School,
  ShowChart,
  Lightbulb,
  Description,
} from "@mui/icons-material";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function AboutUsPage() {
  const theme = useTheme();
  const router = useRouter();
  const isDark = theme.palette.mode === "dark";

  const cardBg = isDark ? "#1a1a2e" : "#fff";
  const cardBorder = isDark
    ? "1px solid rgba(255,255,255,0.1)"
    : "1px solid rgba(103,58,183,0.1)";
  const textColor = isDark ? "#fff" : "#000"; // dynamic for dark mode
  const textSecondary = isDark ? "#aaa" : "#555";

  return (
    <Box sx={{ background: isDark ? "#0f0f1a" : "#f4f5ff", minHeight: "100vh", pb: 12 }}>
      {/* HERO */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: isDark
            ? "linear-gradient(135deg, #151528, #1e1e2f)"
            : "linear-gradient(135deg, #d4d9e7, #b4c4f7)",
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Chip
              icon={<School sx={{ color: "#6a1b9a" }} />}
              label="FINAL YEAR COMPUTER SCIENCE PROJECT"
              sx={{ mb: 3, fontWeight: 600 }}
            />
           <Typography
  variant="h2"
  fontWeight={900}
  mb={3}
  sx={{
    color: textColor,
    fontSize: { xs: "2.2rem", md: "2.8rem" }, // reduced size
  }}
>
  FinSight: Stock Trend Prediction System
</Typography>

            <Typography
  variant="h6"
  color={textSecondary}
  maxWidth={800}
  mx="auto"
  sx={{
    fontSize: { xs: "1rem", md: "1.1rem" }, // reduced subtitle size
    lineHeight: 1.6,
  }}
>
  AI-powered platform for analyzing Nepali stock market trends using machine learning and historical NEPSE data. Designed to provide both educational insights and practical data analysis experience for students.
</Typography>

          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        {/* PROJECT OVERVIEW */}
        <Card
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    mb: 8,
    borderRadius: 4,
    overflow: "hidden",
    boxShadow: isDark
      ? "0 12px 36px rgba(106,27,154,0.3)"
      : "0 6px 24px rgba(103,58,183,0.15)",
    transition: "0.4s",
    "&:hover": { transform: "scale(1.02)", boxShadow: isDark ? "0 18px 50px rgba(106,27,154,0.45)" : "0 12px 36px rgba(103,58,183,0.25)" },
  }}
>
  <Box sx={{ flex: 1, position: "relative", minHeight: 400 }}>
    <Image src="/assets/stock-dashboard.png" alt="Dashboard" fill style={{ objectFit: "cover", borderRadius: 4 }} />
  </Box>
  <Box sx={{ flex: 1, p: { xs: 4, md: 6 } }}>
    <Typography variant="h4" fontWeight={700} mb={3} sx={{ color: textColor }}>
      Project Overview
    </Typography>
    <Stack spacing={2}>
      <Typography color={textSecondary}>• FinSight is a stock trend prediction system developed as a final year project.</Typography>
      <Typography color={textSecondary}>• Integrates NEPSE historical data with machine learning to predict trends and provide insights.</Typography>
      <Typography color={textSecondary}>• Visualizes technical indicators such as EMA, RSI, and Bollinger Bands.</Typography>
      <Typography color={textSecondary}>• Allows students and beginners to practice analysis in a risk-free environment.</Typography>
      <Typography color={textSecondary}>• Interactive dashboards and charts for easy learning and decision-making.</Typography>
      <Typography color={textSecondary}>• Supports data-driven learning for financial literacy and ML application.</Typography>
    </Stack>
  </Box>
</Card>


        {/* DEVELOPMENT TEAM & LEARNING OUTCOMES */}
        <Grid container spacing={4} mb={8} justifyContent="center" alignItems="stretch">
          {/* Development Team */}
          <Grid item xs={12} md={5} sx={{ display: "flex" }}>
            <Card
              sx={{
                p: 4,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                transition: "0.3s",
                "&:hover": { boxShadow: "0 12px 28px rgba(0,0,0,0.2)", transform: "scale(1.03)" },
              }}
            >
              <Box display="flex" alignItems="center" mb={3}>
                <Groups sx={{ fontSize: 36, mr: 2, color: "#6a1b9a" }} />
                <Typography variant="h4" fontWeight={700} sx={{ color: textColor }}>
                  Development Team
                </Typography>
              </Box>

              <Stack spacing={3}>
                {[
                  { name: "Prashuna Shrestha", role: "Full Stack Developer ", initials: "PS", color: "#6a1b9a" },
                  { name: "Pratima Singh", role: "Full Stack Developer ", initials: "PS", color: "#9c27b0" },
                ].map((m) => (
                  <Box key={m.name} display="flex" alignItems="center">
                    <Avatar sx={{ width: 60, height: 60, mr: 3, bgcolor: m.color, fontWeight: 700 }}>{m.initials}</Avatar>
                    <Box>
                      <Typography fontWeight={600} sx={{ color: textColor }}>{m.name}</Typography>
                      <Typography color={textSecondary}>{m.role}</Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Card>
          </Grid>

          {/* Learning Outcomes */}
          <Grid item xs={12} md={5} sx={{ display: "flex" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ width: "100%" }}
            >
              <Card
                sx={{
                  p: 4,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  bgcolor: "#6a1b9a10",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
                    transform: "scale(1.03)",
                    bgcolor: "#6a1b9a15",
                  },
                }}
              >
                <Box display="flex" alignItems="center" mb={3}>
                  <Lightbulb sx={{ fontSize: 36, mr: 2, color: "#6a1b9a" }} />
                  <Typography variant="h4" fontWeight={700} sx={{ color: textColor }}>
                    Learning Outcomes
                  </Typography>
                </Box>

                <Stack spacing={2}>
                  <Typography color={textSecondary}>• Understand Nepali stock market trends</Typography>
                  <Typography color={textSecondary}>• Apply machine learning for trend prediction</Typography>
                  <Typography color={textSecondary}>• Learn data cleaning and analysis</Typography>
                  <Typography color={textSecondary}>• Visualize results with interactive dashboards</Typography>
                  <Typography color={textSecondary}>• Gain hands-on experience with Python, FastAPI, and Next.js</Typography>
                </Stack>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* TECHNOLOGY STACK */}
        <Grid container spacing={4} mb={8} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={10} sx={{ display: "flex" }}>
            <Card
              sx={{
                p: 4,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                transition: "0.3s",
                "&:hover": { boxShadow: "0 12px 28px rgba(0,0,0,0.2)", transform: "scale(1.03)" },
              }}
            >
              <Box display="flex" alignItems="center" mb={3}>
                <Code sx={{ fontSize: 36, mr: 2, color: "#6a1b9a" }} />
                <Typography variant="h4" fontWeight={700} sx={{ color: textColor }}>
                  Technology Stack
                </Typography>
              </Box>

              <Grid container spacing={1.5} mb={3}>
                {[
                  { name: "Next.js", color: "#6a1b9a" },
                  { name: "Python", color: "#2196f3" },
                  { name: "FastAPI", color: "#4caf50" },
                  { name: "PostgreSQL", color: "#009688" },
                  { name: "Material-UI", color: "#9c27b0" },
                  { name: "Pandas", color: "#ff5722" },
                ].map((t) => (
                  <Grid item key={t.name}>
                    <Chip
                      label={t.name}
                      sx={{
                        bgcolor: `${t.color}33`,
                        color: t.color,
                        fontWeight: 500,
                        px: 2,
                        py: 1.5,
                        borderRadius: 2,
                        "&:hover": { bgcolor: `${t.color}55` },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              <Typography color={textSecondary}>
                Modern frameworks and data science tools for performance and scalability.
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* MISSION */}
       <Card
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    mb: 8,
    borderRadius: 4,
    boxShadow: isDark
      ? "0 12px 36px rgba(106,27,154,0.3)"
      : "0 6px 24px rgba(103,58,183,0.15)",
    transition: "0.4s",
    "&:hover": { transform: "scale(1.02)", boxShadow: isDark ? "0 18px 50px rgba(106,27,154,0.45)" : "0 12px 36px rgba(103,58,183,0.25)" },
  }}
>
  <Box sx={{ flex: 1, p: { xs: 4, md: 6 } }}>
    <Typography variant="h4" fontWeight={700} mb={2} sx={{ color: textColor }}>Our Mission</Typography>
    <Stack spacing={2}>
      <Typography color={textSecondary}>• AI-powered stock market learning</Typography>
      <Typography color={textSecondary}>• Risk-free understanding of trading concepts</Typography>
      <Typography color={textSecondary}>• Bridge theory and practice with real NEPSE data</Typography>
      <Typography color={textSecondary}>• Encourage data-driven financial decisions</Typography>
      <Typography color={textSecondary}>• Hands-on ML experience & data visualization</Typography>
    </Stack>
  </Box>
  <Box sx={{ flex: 1, position: "relative", minHeight: 400 }}>
    <Image src="/assets/mission.png" alt="Mission" fill style={{ objectFit: "cover", borderRadius: 4 }} />
  </Box>
</Card>


        {/* VISION */}
        <Card
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row-reverse" },
    mb: 8,
    borderRadius: 4,
    boxShadow: isDark
      ? "0 12px 36px rgba(106,27,154,0.3)"
      : "0 6px 24px rgba(103,58,183,0.15)",
    transition: "0.4s",
    "&:hover": { transform: "scale(1.02)", boxShadow: isDark ? "0 18px 50px rgba(106,27,154,0.45)" : "0 12px 36px rgba(103,58,183,0.25)" },
  }}
>
  <Box sx={{ flex: 1, p: { xs: 4, md: 6 } }}>
    <Typography variant="h4" fontWeight={700} mb={2} sx={{ color: textColor }}>Our Vision</Typography>
    <Stack spacing={2}>
      <Typography color={textSecondary}>• Become a learning hub for stock market analytics in Nepal</Typography>
      <Typography color={textSecondary}>• Empower students with ML skills</Typography>
      <Typography color={textSecondary}>• Promote financial literacy and data-driven decisions</Typography>
      <Typography color={textSecondary}>• Provide an interactive, hands-on educational platform for stock analysis</Typography>
      <Typography color={textSecondary}>• Encourage practical data science application</Typography>
    </Stack>
  </Box>
  <Box sx={{ flex: 1, position: "relative", minHeight: 400 }}>
    <Image src="/assets/vision.png" alt="Vision" fill style={{ objectFit: "cover", borderRadius: 4 }} />
  </Box>
</Card>


        {/* HOW SYSTEM WORKS */}
        <Grid container spacing={4} mb={10} alignItems="stretch" justifyContent="center">
  {[
    {
      title: "Data Collection",
      icon: <Description sx={{ fontSize: 36, color: "#fff" }} />,
      desc: "We collect historical NEPSE data and clean it for accurate analysis.",
      points: ["Daily and monthly stock prices",  "Trading volume and price history", "Market indices trends"],
    },
    {
      title: "ML & Indicators",
      icon: <ShowChart sx={{ fontSize: 36, color: "#fff" }} />,
      desc: "Combine technical indicators with machine learning models for predictions.",
      points: ["RSI, EMA, Bollinger Bands", "LSTM and other trend prediction models", "Feature engineering for better accuracy"],
    },
    {
      title: "Insights & Visualization",
      icon: <Lightbulb sx={{ fontSize: 36, color: "#fff" }} />,
      desc: "Provide actionable insights and visual trends to users.",
      points: ["Trend charts and signals", "User-friendly visual interface", "Educational explanations for beginners"],
    },
  ].map((item, i) => (
    <Grid key={item.title} item xs={12} sm={6} md={4}>
      <motion.div
        style={{ flex: 1, height: "100%" }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={i}
      >
        <Card
          sx={{
            p: 4,
            borderRadius: 4,
            height: "100%",
            textAlign: "center",
            background: isDark 
              ? "linear-gradient(145deg, #1a1a2e, #22223b)"
              : "linear-gradient(145deg, #fff, #f0f0ff)",
            boxShadow: isDark 
              ? "0 10px 30px rgba(106,27,154,0.4)" 
              : "0 6px 20px rgba(103,58,183,0.2)",
            border: "1px solid transparent",
            cursor: "pointer",
            transition: "0.4s",
            "&:hover": {
              boxShadow: isDark 
                ? "0 15px 40px rgba(106,27,154,0.6)" 
                : "0 12px 35px rgba(103,58,183,0.35)",
              transform: "scale(1.05)",
              border: "1px solid rgba(106,27,154,0.5)",
            },
          }}
        >
         <Box
  sx={{
    width: 64,
    height: 64,
    borderRadius: "50%",
    bgcolor: isDark
      ? "linear-gradient(135deg, #6a1b9a, #2196f3)"
      : "#6a1b9a", // solid purple in light mode
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mx: "auto",
    mb: 2,
    boxShadow: isDark
      ? "0 6px 18px rgba(0,0,0,0.2)"
      : "0 4px 12px rgba(0,0,0,0.1)",
    transition: "0.3s",
    "&:hover": { transform: "scale(1.15)", boxShadow: "0 10px 28px rgba(0,0,0,0.25)" },
  }}
>
  {React.isValidElement(item.icon) &&
  React.cloneElement(item.icon as React.ReactElement<SvgIconProps>, {
    fontSize: "large",  // now TypeScript knows it's valid
    htmlColor: "#fff",
  })}
</Box>




          <Typography fontWeight={700} mt={1} mb={1} sx={{ color: textColor }}>
            {item.title}
          </Typography>
          <Typography color={textSecondary} mb={1}>
            {item.desc}
          </Typography>

          <Stack
            spacing={0.5}
            mt={1}
            sx={{ width: "100%", maxWidth: 260, mx: "auto", alignItems: "flex-start" }}
          >
            {item.points.map((p, idx) => (
              <Typography key={idx} color={textSecondary} variant="body2" sx={{ textAlign: "left" }}>
                • {p}
              </Typography>
            ))}
          </Stack>
        </Card>
      </motion.div>
    </Grid>
  ))}
</Grid>

<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={5}>
  <Card
    sx={{
      p: { xs: 4, md: 6 },
      borderRadius: 4,
      textAlign: "center",
      mb: 8,
      background: "linear-gradient(135deg, #6a1b9a, #2196f3)",
      color: "#fff",
      boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
      transition: "0.4s",
      "&:hover": { transform: "scale(1.03)", boxShadow: "0 18px 50px rgba(0,0,0,0.35)" },
    }}
  >
    <Typography variant="h4" fontWeight={700} mb={2}>
      Explore Our Project
    </Typography>
    <Typography mb={4} maxWidth={700} mx="auto" sx={{ lineHeight: 1.6 }}>
      Experience FinSight and explore the source code to understand how machine learning is applied to Nepali stock data.
    </Typography>
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
      <Button
        variant="contained"
        onClick={() => router.push("/analysis")}
        sx={{
          background: "linear-gradient(135deg,#fff 0%,#fff 100%)",
          color: "#6a1b9a",
          px: 4,
          py: 1.5,
          fontWeight: 600,
          borderRadius: 3,
          "&:hover": { background: "#fff", color: "#4a148c", boxShadow: "0 6px 20px rgba(0,0,0,0.2)" },
        }}
      >
        Try Prediction System
      </Button>
      <Button
        variant="outlined"
        onClick={() => window.open("https://github.com/prashuna-shrestha/MajorProject", "_blank")}
        sx={{
          borderColor: "#fff",
          color: "#fff",
          px: 4,
          py: 1.5,
          fontWeight: 600,
          borderRadius: 3,
          "&:hover": { background: "#ffffff22", borderColor: "#fff" },
        }}
      >
        View Source Code
      </Button>
    </Stack>
  </Card>
</motion.div>

      </Container>
    </Box>
  );
}
