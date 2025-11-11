"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    // Add signup logic here
    console.log({ fullName, email, password, confirmPassword });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f3ff", // light purple background
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 400,
          width: "100%",
          bgcolor: "#faf5ff",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <img
            src="/logo.png" // Replace with your logo path
            alt="Logo"
            style={{ width: 80, height: 80 }}
          />
        </Box>

        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          color="#6e4adb"
          mb={3}
        >
          Sign Up
        </Typography>

        {/* Input Fields */}
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

        {/* Signup Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: "#6e4adb",
            "&:hover": { bgcolor: "#5936d3" },
          }}
          onClick={handleSignup}
        >
          Sign Up
        </Button>
      </Paper>
    </Box>
  );
}
