"use client";

import React from "react";
import { Box, Container, Typography, Card, CardContent, Divider, Button, Grid } from "@mui/material";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const stocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 178.45, delta: "+$3.21 today", change: "+1.83%", prediction: "$185.30", confidence: "87%", color: "success.main" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.67, delta: "-$1.45 today", change: "-1.01%", prediction: "$148.90", confidence: "82%", color: "error.main" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 371.24, delta: "+$5.67 today", change: "+1.55%", prediction: "$378.50", confidence: "91%", color: "success.main" },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 485.93, delta: "+$12.34 today", change: "+2.61%", prediction: "$544.25", confidence: "78%", color: "success.main" },
];

export default function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // makes footer stick at bottom if content is short
      }}
    >
      <Header />

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, px: { xs: 2, md: 4 }, py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Welcome back, Investor 👋
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={6}>
            Research and go for it.
          </Typography>

          <Grid container spacing={3}>
            {stocks.map((s) => (
              <Grid item xs={12} sm={6} md={3} key={s.symbol}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    boxShadow: 2,
                    "&:hover": { boxShadow: 6 },
                    transition: "0.3s",
                    bgcolor: "background.paper",
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={700} color="primary">
                      {s.symbol}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {s.name}
                    </Typography>
                    <Typography variant="h5" fontWeight={700} mt={2}>
                      ${s.price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: s.color }}>
                      {s.delta}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="space-between">
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                          7-Day Prediction
                        </Typography>
                        <Typography variant="body2" color="primary">
                          {s.prediction}
                        </Typography>
                      </Box>
                      <Box textAlign="right">
                        <Typography variant="caption" color="text.secondary" display="block">
                          Confidence
                        </Typography>
                        <Typography variant="body2">{s.confidence}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" mt={6} gap={2} flexWrap="wrap">
            <Button
              component={Link}
              href="/login"
              variant="contained"
              sx={{ bgcolor: "#6e4adb", "&:hover": { bgcolor: "#5936d3" } }}
            >
              Login
            </Button>
            <Button
              component={Link}
              href="/signup"
              variant="outlined"
              sx={{ borderColor: "#6e4adb", color: "#6e4adb" }}
            >
              Sign Up
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
