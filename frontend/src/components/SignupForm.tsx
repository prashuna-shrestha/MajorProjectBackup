"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  closeModal: () => void;
  switchToLogin: () => void;
}

export default function SignupForm({ closeModal, switchToLogin }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Signup failed");
        return;
      }

      alert("Signup successful ✅");
      switchToLogin();
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 3,
        width: "100%",
        maxWidth: 420,
        mx: "auto",
        position: "relative",
        boxShadow: "0px 12px 30px rgba(0,0,0,0.25)",
        bgcolor: "background.paper",
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={closeModal}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>

      {/* Logo */}
      <Box display="flex" justifyContent="center" mb={2}>
        <img
          src="/assets/logo.png"
          alt="Logo"
          style={{ width: 90, height: 90 }}
        />
      </Box>

      {/* Heading */}
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        mb={3}
        sx={{
          background: "linear-gradient(90deg, #6e4adb, #5936d3)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Sign Up
      </Typography>

      <TextField
        fullWidth
        label="Full Name"
        variant="outlined"
        size="small"
        margin="dense"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        size="small"
        margin="dense"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        size="small"
        margin="dense"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        fullWidth
        label="Confirm Password"
        type="password"
        variant="outlined"
        size="small"
        margin="dense"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          bgcolor: "#6e4adb",
          color: "#fff",
          fontWeight: 600,
          "&:hover": { bgcolor: "#5936d3" },
        }}
        onClick={handleSignup}
      >
        Sign Up
      </Button>

      <Typography variant="body2" textAlign="center" mt={2}>
        Already have an account?{" "}
        <span
          style={{
            cursor: "pointer",
            fontWeight: 600,
            background: "linear-gradient(90deg, #6e4adb, #5936d3)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
          onClick={switchToLogin}
        >
          Login
        </span>
      </Typography>
    </Paper>
  );
}
