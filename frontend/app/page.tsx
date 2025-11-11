"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Modal,
  Paper,
  TextField,
  Link,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const stocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 178.45, delta: "+$3.21 today", change: "+1.83%", prediction: "$185.30", confidence: "87%", color: "success.main" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.67, delta: "-$1.45 today", change: "-1.01%", prediction: "$148.90", confidence: "82%", color: "error.main" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 371.24, delta: "+$5.67 today", change: "+1.55%", prediction: "$378.50", confidence: "91%", color: "success.main" },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 485.93, delta: "+$12.34 today", change: "+2.61%", prediction: "$544.25", confidence: "78%", color: "success.main" },
];

export default function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  const handleLogin = () => {
    console.log({ loginEmail, loginPassword });
    setIsLoginOpen(false);
  };

  const handleSignup = () => {
    console.log({ signupName, signupEmail, signupPassword, signupConfirmPassword });
    setIsSignupOpen(false);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <Header onLoginClick={() => setIsLoginOpen(true)} />

        {/* Dashboard content */}
        <Box sx={{ transition: "filter 0.3s ease", filter: isLoginOpen || isSignupOpen ? "blur(5px)" : "none" }}>
          <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Welcome back, Investor 👋
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={6}>
              Research and go for it.
            </Typography>

            <Grid container spacing={3}>
              {stocks.map((s) => (
                <Grid item xs={12} md={3} key={s.symbol}>
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
          </Container>
        </Box>

        <Footer />
      </Box>

      {/* Login Modal */}
      <Modal open={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1500,
          }}
        >
          <Paper
            elevation={10}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "#faf5ff",
              width: { xs: "90%", sm: 400 },
              position: "relative",
            }}
          >
            {/* Close button */}
            <IconButton
              onClick={() => setIsLoginOpen(false)}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <img src="/logo.png" alt="Logo" style={{ width: 80, height: 80 }} />
            </Box>

            <Typography variant="h5" fontWeight="bold" textAlign="center" color="#6e4adb" mb={2}>
              Login
            </Typography>

            <TextField
              fullWidth
              label="Email"
              size="small"
              margin="dense"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              size="small"
              margin="dense"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, bgcolor: "#6e4adb", "&:hover": { bgcolor: "#5936d3" } }}
              onClick={handleLogin}
            >
              Login
            </Button>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" color="#6e4adb">
                Don't have an account?{" "}
                <Link
                  underline="hover"
                  sx={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => { setIsLoginOpen(false); setIsSignupOpen(true); }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Modal>

      {/* Signup Modal */}
      <Modal open={isSignupOpen} onClose={() => setIsSignupOpen(false)}>
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1500,
          }}
        >
          <Paper
            elevation={10}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "#faf5ff",
              width: { xs: "90%", sm: 400 },
              position: "relative",
            }}
          >
            {/* Close button */}
            <IconButton
              onClick={() => setIsSignupOpen(false)}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <img src="/logo.png" alt="Logo" style={{ width: 80, height: 80 }} />
            </Box>

            <Typography variant="h5" fontWeight="bold" textAlign="center" color="#6e4adb" mb={2}>
              Sign Up
            </Typography>

            <TextField
              fullWidth
              label="Full Name"
              size="small"
              margin="dense"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
            />

            <TextField
              fullWidth
              label="Email"
              size="small"
              margin="dense"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              size="small"
              margin="dense"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              size="small"
              margin="dense"
              value={signupConfirmPassword}
              onChange={(e) => setSignupConfirmPassword(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, bgcolor: "#6e4adb", "&:hover": { bgcolor: "#5936d3" } }}
              onClick={handleSignup}
            >
              Sign Up
            </Button>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" color="#6e4adb">
                Already have an account?{" "}
                <Link
                  underline="hover"
                  sx={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => { setIsSignupOpen(false); setIsLoginOpen(true); }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </>
  );
}
