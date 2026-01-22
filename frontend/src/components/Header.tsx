"use client";

//===================================================
// 1. React & Core Imports
//===================================================
import React, { useEffect, useState, useRef } from "react";

//===================================================
// 2. Material UI Components
//===================================================
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

// Utility for color opacity
import { alpha } from "@mui/material/styles";

//===================================================
// 3. Material UI Icons
//===================================================
import {
  DarkMode,
  LightMode,
  Menu as MenuIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";

//===================================================
// 4. Next.js & Redux Imports
//===================================================
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleMode } from "@/store/themeSlice";
import { setRedirectPath } from "@/store/authSlice";
import { useRouter } from "next/navigation";

//===================================================
// 5. Type Definitions
//===================================================
interface HeaderProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

interface StockSuggestion {
  symbol: string;
  company_name: string;
  category: string;
}

//===================================================
// 6. Header Component
//===================================================
export default function Header({ onLoginClick, onSignupClick }: HeaderProps) {

  //===================================================
  // 6.1 Redux & Router Setup
  //===================================================
  const dispatch = useDispatch();
  const router = useRouter();

  // Theme state
  const mode = useSelector((state: RootState) => state.theme.mode);
  const isLight = mode === "light";

  // Authentication state
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // Logged-in user data
  const user = useSelector((state: RootState) => state.auth.user);

  //===================================================
  // 6.2 UI State & Handlers
  //===================================================
  const handleThemeChange = () => dispatch(toggleMode());

  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  //===================================================
  // 6.3 Styling Constants
  //===================================================
  const headerGradient = isLight
    ? "linear-gradient(90deg, #9b59b6 0%, #6e4adb 100%)"
    : "linear-gradient(90deg, #332a6d 0%, #1d1649 100%)";

  const navHoverColor = "#4b0082";

  //===================================================
  // 6.4 Navigation Links
  //===================================================
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
    { label: "Learn", href: "/learn" },
    { label: "About Us", href: "/aboutus" },
    { label: "Analysis", href: "/analysis" },
  ];

  //===================================================
  // 6.5 Backend Configuration
  //===================================================
  const BACKEND_URL = "http://localhost:8000";

  //===================================================
  // 6.6 Search State
  //===================================================
  const [symbolInput, setSymbolInput] = useState("");
  const [suggestions, setSuggestions] = useState<StockSuggestion[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  //===================================================
  // 6.7 Search Suggestions (Debounced)
  //===================================================
  useEffect(() => {
    // Stop search if input empty or user not logged in
    if (!symbolInput || !isAuthenticated) {
      setSuggestions([]);
      setIsDropdownOpen(false);
      return;
    }

    // Delay API call for smoother UX
    const timeout = setTimeout(() => {
      fetch(`${BACKEND_URL}/api/search-suggestions?q=${symbolInput}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data);
          setIsDropdownOpen(true);
        })
        .catch(() => setSuggestions([]));
    }, 250);

    return () => clearTimeout(timeout);
  }, [symbolInput, isAuthenticated]);

  //===================================================
  // 6.8 Close Search Dropdown on Outside Click
  //===================================================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //===================================================
  // 6.9 Search Handler
  //===================================================
  const handleSearch = (symbol: string) => {
    if (!symbol) return;

    // Update input and close dropdown
    setSymbolInput(symbol);
    setSuggestions([]);
    setIsDropdownOpen(false);

    // Redirect unauthenticated users to login
    if (!isAuthenticated) {
      dispatch(setRedirectPath(`/analysis?symbol=${symbol}`));
      onLoginClick?.();
      return;
    }

    router.push(`/analysis?symbol=${symbol}`);
  };

  //===================================================
  // 6.10 Dropdown Icon Click Handler
  //===================================================
  const handleDropdownClick = () => {
    if (!isAuthenticated) {
      onLoginClick?.();
      return;
    }

    if (isDropdownOpen) {
      setIsDropdownOpen(false);
      return;
    }

    fetch(`${BACKEND_URL}/api/all-stocks`)
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data);
        setIsDropdownOpen(true);
      });
  };

  //===================================================
  // 6.11 Navigation Click Handler
  //===================================================
  const handleNavClick = (href: string) => {
    if (!isAuthenticated && href !== "/") {
      dispatch(setRedirectPath(href));
      onLoginClick?.();
      return;
    }
    router.push(href);
  };

  //===================================================
  // 7. JSX (ONLY THE PART YOU PROVIDED)
  //===================================================
  return (
    <AppBar
      position="static"
      sx={{ background: headerGradient, color: "white", boxShadow: 4 }}
    >
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

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Navigation */}
          <Box
            display={{ xs: "none", md: "flex" }}
            alignItems="center"
            gap={3}
            ml={2}
          >
            {navLinks.map((item) => (
              <Typography
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                sx={{
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  transition: "color 0.2s",
                  "&:hover": { color: navHoverColor },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        </Box>

{/* ===================== CENTER SEARCH SECTION ===================== */}
<Box
  sx={{ width: { xs: "100%", md: "40%" }, position: "relative" }}
  ref={searchRef} // Reference used to detect clicks outside the search area
>

  {/* Search input container */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      bgcolor: isLight ? "#fff" : alpha("#fff", 0.15), // Background based on theme
      borderRadius: "8px",
      pl: 1.5, // Left padding
      transition: "box-shadow 0.3s",
      "&:focus-within": {
        boxShadow: "0 0 0 2px rgba(255,255,255,0.5)", // Highlight when focused
      },
      cursor: !isAuthenticated ? "pointer" : "text", // Pointer if login required
    }}
    // If user is not authenticated, clicking opens login modal
    onClick={() => !isAuthenticated && onLoginClick?.()}
  >

    {/* Search text field */}
    <TextField
      fullWidth
      variant="standard"
      placeholder="Search stock or company"
      value={symbolInput}
      disabled={!isAuthenticated} // Disable typing if user not logged in
      onChange={(e) =>
        setSymbolInput(e.target.value.toUpperCase())
      } // Convert input to uppercase
      onKeyDown={(e) =>
        e.key === "Enter" && handleSearch(symbolInput)
      } // Search on Enter key
      sx={{ input: { color: isLight ? "black" : "white" } }}
      InputProps={{
        disableUnderline: true, // Remove default underline
        startAdornment: (
          <InputAdornment position="start">
            {/* Search icon inside input */}
            <SearchIcon sx={{ color: isLight ? "#666" : "#ccc" }} />
          </InputAdornment>
        ),
      }}
    />

    {/* Dropdown arrow button to load all stocks */}
    <IconButton
      size="small"
      onClick={(e) => {
        e.stopPropagation(); // Prevent parent click event
        handleDropdownClick(); // Fetch and show all stocks
      }}
      sx={{ color: isLight ? "#666" : "#ccc" }}
    >
      <ArrowDropDownIcon />
    </IconButton>
  </Box>

  {/* ===================== SEARCH SUGGESTIONS DROPDOWN ===================== */}
  {isDropdownOpen && suggestions.length > 0 && (
    <Paper
      elevation={8}
      sx={{
        position: "absolute",
        width: "100%",
        top: "110%", // Position below search bar
        left: 0,
        zIndex: 2000,
        maxHeight: 350,
        overflowY: "auto", // Scroll if list is long
        borderRadius: 2,
        bgcolor: isLight ? "white" : "#1e1e1e",
        border: isLight ? "1px solid #eee" : "1px solid #333",
      }}
    >
      {suggestions.map((s) => (
        <Box
          key={s.symbol} // Unique key for each suggestion
          px={2}
          py={1.5}
          sx={{
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            borderBottom: isLight
              ? "1px solid #f0f0f0"
              : "1px solid #2d2d2d",
            "&:hover": {
              bgcolor: isLight
                ? alpha("#6e4adb", 0.08)
                : alpha("#fff", 0.05),
            },
            "&:last-child": { borderBottom: "none" },
          }}
          onClick={() => handleSearch(s.symbol)} // Navigate to analysis page
        >
          {/* Top row: stock symbol and category */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              fontWeight={700}
              color={isLight ? "primary.main" : "#bb86fc"}
            >
              {s.symbol}
            </Typography>

            <Typography fontSize={12} color="text.secondary" noWrap>
              {s.category}
            </Typography>
          </Box>

          {/* Bottom row: company name */}
          <Typography fontSize={13} color="text.secondary" noWrap>
            {s.company_name}
          </Typography>
        </Box>
      ))}
    </Paper>
  )}
</Box>

{/* ===================== RIGHT SECTION (THEME + AUTH) ===================== */}
<Box display="flex" alignItems="center" gap={1.5}>

  {/* Dark / Light mode toggle */}
  <IconButton color="inherit" onClick={handleThemeChange}>
    {isLight ? <DarkMode /> : <LightMode />}
  </IconButton>

  {/* Show Login / Signup if not authenticated */}
  {!isAuthenticated ? (
    <Box display="flex" gap={1}>
      <Button
        variant="outlined"
        color="inherit"
        onClick={onLoginClick}
        sx={{ borderRadius: "20px", textTransform: "none" }}
      >
        Login
      </Button>

      <Button
        variant="contained"
        sx={{
          borderRadius: "20px",
          bgcolor: "white",
          color: "#6e4adb",
          textTransform: "none",
          "&:hover": { bgcolor: "#f0f0f0" },
        }}
        onClick={onSignupClick}
      >
        Sign Up
      </Button>
    </Box>
  ) : (
    // Show user avatar and name when logged in
    <Box display="flex" alignItems="center" gap={1} sx={{ cursor: "pointer" }}>
      <Avatar sx={{ width: 35, height: 35, bgcolor: alpha("#fff", 0.2) }}>
        <PersonIcon />
      </Avatar>

      <Typography
        variant="body2"
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        {user?.fullName}
      </Typography>
    </Box>
  )}
</Box>

{/* ===================== MOBILE DRAWER ===================== */}
<Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
  <Box
    sx={{
      width: 280,
      background: headerGradient,
      height: "100%",
      color: "white",
      p: 3,
    }}
  >
    {/* Drawer header */}
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
      <Typography variant="h6" fontWeight={700}>
        FinSight
      </Typography>
      <IconButton color="inherit" onClick={toggleDrawer}>
        <CloseIcon />
      </IconButton>
    </Box>

    {/* Mobile navigation links */}
    <List>
      {navLinks.map((item) => (
        <ListItem
          key={item.label}
          disablePadding
          sx={{ mb: 2 }}
          onClick={() => {
            handleNavClick(item.href); // Navigate
            toggleDrawer(); // Close drawer
          }}
        >
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontSize: "1.1rem",
              fontWeight: 500,
            }}
          />
        </ListItem>
      ))}
    </List>
  </Box>
</Drawer>

      </Toolbar>
    </AppBar>
  );
}