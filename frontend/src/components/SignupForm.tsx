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

  // Error states
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  // Flag to indicate if the user clicked "Sign Up"
  const [submitted, setSubmitted] = useState(false);

  // Regex for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/;

  const validate = () => {
    let valid = true;

    // Full Name
    if (!fullName.trim()) {
      setFullNameError("Full name is required");
      valid = false;
    } else {
      setFullNameError("");
    }

    // Email
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError("Invalid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    // Password
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, special character"
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    // Confirm Password
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    return valid;
  };

  const handleSignup = async () => {
    setSubmitted(true); // mark that user clicked submit
    setServerError("");

    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.detail || "Signup failed");
        return;
      }

      switchToLogin(); // Success
    } catch (error) {
      console.error(error);
      setServerError("Server error");
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
        error={submitted && !!fullNameError}
        helperText={submitted ? fullNameError : ""}
      />
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        size="small"
        margin="dense"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={submitted && !!emailError}
        helperText={submitted ? emailError : ""}
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
        error={submitted && !!passwordError}
        helperText={submitted ? passwordError : ""}
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
        error={submitted && !!confirmPasswordError}
        helperText={submitted ? confirmPasswordError : ""}
      />

      {/* Server error */}
      {submitted && serverError && (
        <Typography color="error" fontSize={12} mt={1} textAlign="center">
          {serverError}
        </Typography>
      )}

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
