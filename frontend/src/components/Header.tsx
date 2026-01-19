"use client";

import React, { useEffect, useState } from "react";
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
  TextField,
  InputAdornment,
  Paper,
  Avatar,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  DarkMode,
  LightMode,
  Menu as MenuIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleMode } from "@/store/themeSlice";
import { setRedirectPath } from "@/store/authSlice";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

interface StockSuggestion {
  symbol: string;
  company_name: string;
  category: string;
}

export default function Header({ onLoginClick, onSignupClick }: HeaderProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const isLight = mode === "light";

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

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
    { label: "About Us", href: "/aboutus" },
    { label: "Analysis", href: "/analysis" },
  ];

  const BACKEND_URL = "http://localhost:8000";

  // ---------- Search State ----------
  const [symbolInput, setSymbolInput] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<StockSuggestion[]>([]);
  const [dropdownSuggestions, setDropdownSuggestions] = useState<StockSuggestion[]>([]);

  // ---------- Fetch search suggestions ----------
  useEffect(() => {
    if (!symbolInput) {
      setSearchSuggestions([]);
      return;
    }

    fetch(`${BACKEND_URL}/api/search-suggestions?q=${symbolInput}`)
      .then((res) => res.json())
      .then((data) => setSearchSuggestions(data));
  }, [symbolInput]);

  // ---------- Search Handler with Auth Check ----------
  const handleSearch = (symbol: string) => {
    if (!symbol) return;

    if (!isAuthenticated) {
      dispatch(setRedirectPath(`/analysis?symbol=${symbol}`));
      onSignupClick?.();
      return;
    }

    router.push(`/analysis?symbol=${symbol}`);
  };

  // ---------- Navigation with auth check ----------
  const handleNavClick = (href: string) => {
    if (!isAuthenticated && href !== "/") {
      dispatch(setRedirectPath(href));
      onSignupClick?.();
      return;
    }
    router.push(href);
  };

  return (
    <AppBar position="static" sx={{ background: headerGradient, color: "white", boxShadow: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          py: 1.2,
          px: { xs: 2, md: 4 },
          gap: 1.5,
        }}
      >
        {/* Left Section */}
        <Box display="flex" alignItems="center" gap={2}>
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={55}
            height={55}
            style={{ cursor: "pointer" }}
            onClick={() => handleNavClick("/")}
          />

          <IconButton
            color="inherit"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Nav Links */}
          <Box display={{ xs: "none", md: "flex" }} alignItems="center" gap={3} ml={2}>
            {navLinks.map((item) => (
              <Typography
                key={item.label}
                variant="body1"
                onClick={() => handleNavClick(item.href)}
                sx={{
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "0.3s",
                  "&:hover": {
                    color: navHoverColor,
                    textShadow: "0px 0px 5px #fff",
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Center Search + Dropdown */}
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            position: "relative",
            display: "flex",
            flexDirection: "column",
            mt: { xs: 1, md: 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#fff",
              borderRadius: 1,
              pl: 1,
            }}
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder="Search stock or company"
              value={symbolInput}
              onChange={(e) => setSymbolInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(symbolInput);
              }}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleSearch(symbolInput)}
                    />
                  </InputAdornment>
                ),
              }}
            />

            <IconButton
              size="small"
              sx={{ ml: 1 }}
              onClick={() => {
                if (!isAuthenticated) {
                  onSignupClick?.();
                  return;
                }
                fetch(`${BACKEND_URL}/api/all-stocks`)
                  .then((res) => res.json())
                  .then((data) => setDropdownSuggestions(data));
              }}
            >
              <ArrowDropDownIcon />
            </IconButton>
          </Box>

          {/* Dropdown suggestions when arrow clicked */}
          {dropdownSuggestions.length > 0 && !symbolInput && (
            <Paper
              sx={{
                position: "absolute",
                width: "100%",
                top: "100%",
                mt: 1,
                zIndex: 2000,
                maxHeight: 300,
                overflowY: "auto",
                borderRadius: 1,
              }}
            >
              {dropdownSuggestions.map((s) => (
                <Box
                  key={s.symbol}
                  p={1.2}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleSearch(s.symbol)}
                >
                  <Typography fontWeight={700}>{s.symbol}</Typography>
                  <Typography fontSize={12}>{s.company_name}</Typography>
                </Box>
              ))}
            </Paper>
          )}

          {/* Live suggestions while typing */}
          {searchSuggestions.length > 0 && symbolInput && (
            <Paper
              sx={{
                position: "absolute",
                width: "100%",
                top: "100%",
                mt: 1,
                zIndex: 2000,
                maxHeight: 300,
                overflowY: "auto",
                borderRadius: 1,
              }}
            >
              {searchSuggestions.map((s) => (
                <Box
                  key={s.symbol}
                  p={1.2}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleSearch(s.symbol)}
                >
                  <Typography fontWeight={700}>{s.symbol}</Typography>
                  <Typography fontSize={12}>{s.company_name}</Typography>
                </Box>
              ))}
            </Paper>
          )}
        </Box>

        {/* Right Section */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <IconButton
            color="inherit"
            onClick={handleThemeChange}
            sx={{
              bgcolor: alpha("#fff", 0.15),
              "&:hover": { bgcolor: alpha("#fff", 0.3) },
            }}
          >
            {isLight ? <DarkMode /> : <LightMode />}
          </IconButton>

          {!isAuthenticated ? (
            <>
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
            </>
          ) : (
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar
                sx={{
                  bgcolor: alpha("#fff", 0.2),
                  width: 28,
                  height: 28,
                }}
              >
                <PersonIcon fontSize="small" sx={{ color: "white" }} />
              </Avatar>

              <Typography fontWeight={500} color="white">
                {user?.fullName}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Mobile Drawer */}
        <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
          <Box sx={{ width: 250, background: headerGradient, height: "100%", color: "white", p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600}>
                FinSight
              </Typography>
              <IconButton color="inherit" onClick={toggleDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <List>
              {navLinks.map((item) => (
                <ListItem
                  key={item.label}
                  onClick={() => {
                    handleNavClick(item.href);
                    toggleDrawer();
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
