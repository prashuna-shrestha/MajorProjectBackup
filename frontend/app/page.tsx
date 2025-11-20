"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Grid,
  Dialog,
} from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

const stocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 178.45,
    delta: "+$3.21",
    prediction: "$185.30",
    confidence: "87%",
    color: "success.main",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 142.67,
    delta: "-$1.45",
    prediction: "$148.90",
    confidence: "82%",
    color: "error.main",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 371.24,
    delta: "+$5.67",
    prediction: "$378.50",
    confidence: "91%",
    color: "success.main",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 485.93,
    delta: "+$12.34",
    prediction: "$544.25",
    confidence: "78%",
    color: "success.main",
  },
];

export default function HomePage() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(true);
    setOpenSignup(false);
  };
  const handleOpenSignup = () => {
    setOpenSignup(true);
    setOpenLogin(false);
  };

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <Header onLoginClick={handleOpenLogin} onSignupClick={handleOpenSignup} />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          px: { xs: 2, md: 4 },
          py: 4,
          transition: "0.3s",
          filter: openLogin || openSignup ? "blur(6px)" : "none",
          bgcolor: "background.paper",
        }}
      >
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
                  sx={{
                    borderRadius: 3,
                    boxShadow: 2,
                    "&:hover": { boxShadow: 6 },
                    transition: "0.3s",
                    bgcolor: "background.paper",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      color="primary"
                    >
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
                        <Typography variant="caption" color="text.secondary">
                          7-Day Prediction
                        </Typography>
                        <Typography variant="body2" color="primary">
                          {s.prediction}
                        </Typography>
                      </Box>
                      <Box textAlign="right">
                        <Typography variant="caption" color="text.secondary">
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
        </Container>
      </Box>

      <Footer />

      {/* Login Modal */}
      <Dialog
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            width: "400px",
            maxWidth: "90%",
            padding: 2,
            margin: "auto",
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(6px)",
          },
        }}
      >
        <LoginForm
          closeModal={() => setOpenLogin(false)}
          switchToSignup={handleOpenSignup}
        />
      </Dialog>

      {/* Signup Modal */}
      <Dialog
        open={openSignup}
        onClose={() => setOpenSignup(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            width: "400px",
            maxWidth: "90%",
            padding: 2,
            margin: "auto",
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(6px)",
          },
        }}
      >
        <SignupForm
          closeModal={() => setOpenSignup(false)}
          switchToLogin={handleOpenLogin}
        />
      </Dialog>
    </Box>
  );
}
