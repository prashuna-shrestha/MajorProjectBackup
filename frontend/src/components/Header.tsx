"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  DarkMode,
  LightMode,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleMode } from "@/store/themeSlice";
import { useRouter } from "next/navigation";   // <-- ✅ ADD THIS

interface HeaderProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

export default function Header({ onLoginClick, onSignupClick }: HeaderProps) {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const isLight = mode === "light";

  const router = useRouter();   // <-- ✅ ADD THIS

  const handleThemeChange = () => dispatch(toggleMode());
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const headerGradient = isLight
    ? "linear-gradient(90deg, #9b59b6 0%, #6e4adb 100%)"
    : "linear-gradient(90deg, #332a6d 0%, #1d1649 100%)";

  const navHoverColor = "#4b0082";
  const signupColor = "#b36fff";
  const signupHover = "#7a2cc2";

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
    { label: "About Us", href: "/about-us" },
    { label: "Analysis", href: "/analysis" },
  ];

  return (
    <AppBar position="static" sx={{ background: headerGradient, color: "white", boxShadow: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 1.2, px: { xs: 2, md: 4 } }}>
        
        {/* Left Section */}
        <Box display="flex" alignItems="center" gap={2}>
          <Image src="/assets/logo.png" alt="Logo" width={55} height={55} style={{ cursor: "pointer" }} />

          <IconButton color="inherit" sx={{ display: { xs: "flex", md: "none" } }} onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>

          {/* Desktop Nav Links */}
          <Box display={{ xs: "none", md: "flex" }} alignItems="center" gap={3} ml={2}>
            {navLinks.map((item) => (
              <Typography
                key={item.label}
                variant="body1"
                onClick={() => router.push(item.href)}   // <-- ✅ CLICK TO NAVIGATE
                sx={{
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "0.3s",
                  "&:hover": { color: navHoverColor, textShadow: "0px 0px 5px #fff" },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Right Section */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <IconButton
            color="inherit"
            onClick={handleThemeChange}
            sx={{
              bgcolor: alpha("#fff", 0.15),
              "&:hover": { bgcolor: alpha("#fff", 0.3) },
              transition: "0.3s",
            }}
          >
            {isLight ? <DarkMode /> : <LightMode />}
          </IconButton>

          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: alpha("#fff", 0.8),
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              "&:hover": { bgcolor: alpha("#fff", 0.25), color: navHoverColor },
              display: { xs: "none", sm: "inline-flex" },
            }}
            onClick={onLoginClick}
          >
            Login
          </Button>

          <Button
            variant="contained"
            sx={{
              bgcolor: signupColor,
              color: "#4a2fa1",
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": { bgcolor: signupHover, color: "#fff" },
              display: { xs: "none", sm: "inline-flex" },
            }}
            onClick={onSignupClick}
          >
            Sign Up
          </Button>
        </Box>

        {/* Drawer Mobile Menu */}
        <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
          <Box sx={{ width: 250, background: headerGradient, height: "100%", color: "white", p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600}>FinSight</Typography>
              <IconButton color="inherit" onClick={toggleDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Divider sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.2)" }} />

            <List>
              {navLinks.map((item) => (
                <ListItem
                  key={item.label}
                  onClick={() => {
                    router.push(item.href);   // <-- ✅ MOBILE NAVIGATION
                    toggleDrawer();
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}

              <Divider sx={{ my: 1, bgcolor: "rgba(255,255,255,0.2)" }} />

              <ListItem onClick={() => { onLoginClick?.(); toggleDrawer(); }} sx={{ cursor: "pointer" }}>
                <ListItemText primary="Login" />
              </ListItem>

              <ListItem onClick={() => { onSignupClick?.(); toggleDrawer(); }} sx={{ cursor: "pointer" }}>
                <ListItemText primary="Sign Up" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
