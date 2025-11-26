"use client";

import { Box, Grid, Card, Typography, Divider } from "@mui/material";
import { motion, Variants } from "framer-motion";

// Icons
import SchoolIcon from "@mui/icons-material/School";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.25, duration: 0.7, ease: "easeOut" },
  }),
};

export default function AboutUsContent() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 6 },
        py: 10,
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, #0d0d0f 0%, #121217 100%)"
            : "linear-gradient(180deg, #fafafa 0%, #eef0ff 100%)",
      }}
    >
      {/* Hero Section */}
      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <Box
          sx={{
            textAlign: "center",
            py: 9,
            px: 3,
            mb: 10,
            borderRadius: 4,
            background: "linear-gradient(135deg, #5a46e9 0%, #8e63f5 100%)",
            boxShadow: "0 14px 34px rgba(0,0,0,0.22)",
            color: "#fff",
          }}
        >
          <Typography variant="h3" fontWeight={800} gutterBottom>
            About FinSight
          </Typography>

          <Typography variant="h6" sx={{ opacity: 0.9 }} mb={2}>
            Explore, analyze, and understand stock movements with confidence.
          </Typography>

          <Typography
            variant="body1"
            sx={{ maxWidth: 700, mx: "auto", opacity: 0.9 }}
          >
            Designed for learners, FinSight helps you practice analytics,
            study market behavior, and make virtual decisions in a safe, engaging environment.
          </Typography>
        </Box>
      </motion.div>

      {/* Mission + Vision */}
      <Grid container spacing={5} mb={10} justifyContent="center">
        {[
          {
            title: "Our Mission",
            icon: <SchoolIcon sx={{ fontSize: 52, color: "#6f5cff" }} />,
            text: "To simplify stock market concepts for beginners and help them develop analytical skills through experimentation.",
          },
          {
            title: "Our Vision",
            icon: <VisibilityIcon sx={{ fontSize: 52, color: "#6f5cff" }} />,
            text: "To create a realistic yet educational space where anyone can learn investment principles without financial risk.",
          },
        ].map((item, index) => (
          <Grid item xs={12} md={6} key={item.title}>
            <motion.div
              custom={index}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Card
                sx={{
                  borderRadius: 4,
                  p: 5,
                  textAlign: "center",

                  background: (theme) => theme.palette.background.paper,

                  // Strong blue border for both modes
                  border: (theme) =>
                    theme.palette.mode === "dark"
                      ? "2px solid rgba(110, 98, 255, 0.6)"
                      : "2px solid rgba(90, 70, 233, 0.4)",

                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 8px 25px rgba(0,0,0,0.7)"
                      : "0 8px 25px rgba(0,0,0,0.12)",

                  transition: "0.35s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    border: "2px solid #6f5cff",
                  },
                }}
              >
                <Box mb={2}>{item.icon}</Box>
                <Typography variant="h5" fontWeight={700}>
                  {item.title}
                </Typography>
                <Divider sx={{ my: 2, width: "45%", mx: "auto" }} />
                <Typography variant="body1" color="text.secondary">
                  {item.text}
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Why Use FinSight */}
      <Box textAlign="center" mb={8}>
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{
              color: (theme) =>
                theme.palette.mode === "light" ? "#1a1a1a" : "#fff",
            }}
          >
            Why Use FinSight
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            mb={6}
            sx={{ maxWidth: 650, mx: "auto" }}
          >
            Learn essential market concepts with interactive tools designed
            specifically for beginners and students.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {[
              {
                title: "Analyze Market Trends",
                icon: <TimelineIcon sx={{ fontSize: 50, color: "#6f5cff" }} />,
                text: "Visualize real data and understand how stocks behave over time.",
              },
              {
                title: "Smart Learning Tools",
                icon: <BarChartIcon sx={{ fontSize: 50, color: "#6f5cff" }} />,
                text: "Use interactive charts and simplified analytics designed for learners.",
              },
              {
                title: "Performance Tracking",
                icon: (
                  <AutoGraphIcon sx={{ fontSize: 50, color: "#6f5cff" }} />
                ),
                text: "Monitor your improvement and build confidence with repeated practice.",
              },
              {
                title: "Verified for Students",
                icon: (
                  <WorkspacePremiumIcon
                    sx={{ fontSize: 50, color: "#6f5cff" }}
                  />
                ),
                text: "Built with an academic approach for study, projects, and skill development.",
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={item.title}>
                <motion.div
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      py: 5,
                      px: 3,
                      minHeight: 230,
                      textAlign: "center",

                      background: (theme) => theme.palette.background.paper,

                      // Strong visible border
                      border: (theme) =>
                        theme.palette.mode === "dark"
                          ? "2px solid rgba(110, 98, 255, 0.6)"
                          : "2px solid rgba(90, 70, 233, 0.4)",

                      boxShadow: (theme) =>
                        theme.palette.mode === "dark"
                          ? "0 8px 25px rgba(0,0,0,0.7)"
                          : "0 8px 25px rgba(0,0,0,0.12)",

                      transition: "0.35s",

                      "&:hover": {
                        transform: "translateY(-6px)",
                        border: "2px solid #6f5cff",
                      },
                    }}
                  >
                    <Box mb={2}>{item.icon}</Box>

                    <Typography variant="h6" fontWeight={700} color="primary">
                      {item.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {item.text}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Box>
  );
}