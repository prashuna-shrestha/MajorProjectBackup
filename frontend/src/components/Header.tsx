"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Button,
  useTheme,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import {
  Search as SearchIcon,
  DarkMode,
  LightMode,
  Login,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleMode } from "@/store/themeSlice";

// 🔍 Styled search components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "28ch",
      },
    },
  },
}));

// 🧭 MAIN HEADER
const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const isLight = mode === "light";

  const handleThemeChange = () => {
    dispatch(toggleMode()); // ✅ Update global theme
  };

  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 1,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left: Logo */}
        <Box display="flex" alignItems="center" gap={1}>
          <Image src="/logo.svg" alt="FinSight Logo" width={36} height={36} />
          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
            FinSight
          </Typography>
        </Box>

        {/* Middle: Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
          <Link href="#" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="body1" sx={{ "&:hover": { color: "#7E57C2" } }}>
              Dashboard
            </Typography>
          </Link>
          <Link href="#" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="body1" sx={{ "&:hover": { color: "#7E57C2" } }}>
              Analytics
            </Typography>
          </Link>
          <Link href="#" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="body1" sx={{ "&:hover": { color: "#7E57C2" } }}>
              News
            </Typography>
          </Link>
        </Box>

        {/* Right: Search + Theme + Login */}
        <Box display="flex" alignItems="center" gap={1}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search stocks..." />
          </Search>

          {/* ✅ Global theme toggle */}
          <IconButton color="inherit" onClick={handleThemeChange}>
            {isLight ? <DarkMode /> : <LightMode />}
          </IconButton>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Login />}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
