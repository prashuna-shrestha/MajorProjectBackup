"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Link, Modal } from "@mui/material";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log({ email, password });
    // handle login logic here
    onClose(); // close modal after login
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          bgcolor: "#faf5ff",
          borderRadius: 3,
          p: 4,
          boxShadow: 24,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img src="/logo.png" alt="Logo" style={{ width: 80, height: 80 }} />
        </Box>

        <Typography variant="h5" fontWeight="bold" textAlign="center" color="#6e4adb" mb={2}>
          Login
        </Typography>

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
            <Link href="/login/signup" underline="hover" sx={{ fontWeight: "bold" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}
