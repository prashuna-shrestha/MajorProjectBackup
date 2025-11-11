"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Menu,
  MenuItem,
  InputBase,
  useTheme,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  Search as SearchIcon,
  DarkMode,
  LightMode,
  ArrowDropDown,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleMode } from "@/store/themeSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius * 5,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: 250,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: "all 0.3s ease",
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
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

export default function Header() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const isLight = mode === "light";

  const handleThemeChange = () => {
    dispatch(toggleMode());
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: isLight
          ? "linear-gradient(90deg, #6e4adb 0%, #5936d3 100%)"
          : "linear-gradient(90deg, #332a6d 0%, #1d1649 100%)",
        color: "white",
        boxShadow: 3,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1.2,
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Left Section: Logo + Menu Icon */}
        <Box display="flex" alignItems="center" gap={2}>
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/assets/logo.png"
              alt="FinSight Logo"
              width={55}
              height={55}
            />
          </Link>

          {/* Hamburger menu (mobile only) */}
          <IconButton
            color="inherit"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Nav Links */}
          <Box
            display={{ xs: "none", md: "flex" }}
            alignItems="center"
            gap={3}
            ml={2}
          >
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant="body1"
                sx={{ cursor: "pointer", fontWeight: 500, "&:hover": { color: "#FFD700" } }}
              >
                Home
              </Typography>
            </Link>

            <Link href="/news" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant="body1"
                sx={{ cursor: "pointer", fontWeight: 500, "&:hover": { color: "#FFD700" } }}
              >
                News
              </Typography>
            </Link>

            <Link href="/about" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant="body1"
                sx={{ cursor: "pointer", fontWeight: 500, "&:hover": { color: "#FFD700" } }}
              >
                About Us
              </Typography>
            </Link>

            <Box>
              <Button
                endIcon={<ArrowDropDown />}
                onClick={handleClick}
                sx={{
                  color: "inherit",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { color: "#FFD700" },
                }}
              >
                Analysis
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    borderRadius: 2,
                    minWidth: 180,
                    bgcolor: isLight ? "#faf5ff" : "#1f1b2e",
                    color: isLight ? "#3a2d7d" : "#e0d7ff",
                  },
                }}
              >
                <MenuItem onClick={handleClose} component={Link} href="/analysis/banks">
                  Bank Sector
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose} component={Link} href="/analysis/hydropower">
                  Hydropower
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose} component={Link} href="/analysis/others">
                  Others
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>

        {/* Right Section: Search + Actions */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box sx={{ display: { xs: "none", sm: "flex" }, mr: 2 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search stocks..." />
            </Search>
          </Box>

          <IconButton
            color="inherit"
            onClick={handleThemeChange}
            sx={{
              bgcolor: alpha("#fff", 0.1),
              "&:hover": { bgcolor: alpha("#fff", 0.2) },
              transition: "0.3s",
            }}
          >
            {isLight ? <DarkMode /> : <LightMode />}
          </IconButton>

          <Button
            component={Link}
            href="/login"
            variant="outlined"
            sx={{
              color: "white",
              borderColor: alpha("#fff", 0.5),
              borderRadius: 2,
              textTransform: "none",
              "&:hover": { bgcolor: alpha("#fff", 0.15) },
              display: { xs: "none", sm: "inline-flex" },
            }}
          >
            Login
          </Button>

          <Button
            component={Link}
            href="/signup"
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "#6e4adb",
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": { bgcolor: alpha("#fff", 0.9) },
              display: { xs: "none", sm: "inline-flex" },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>

      {/* Drawer for mobile menu */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            background: isLight
              ? "linear-gradient(180deg, #6e4adb 0%, #5936d3 100%)"
              : "linear-gradient(180deg, #332a6d 0%, #1d1649 100%)",
            height: "100%",
            color: "white",
            p: 2,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={600}>
              FinSight
            </Typography>
            <IconButton color="inherit" onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.2)" }} />
          <List>
            <ListItem button component={Link} href="/" onClick={toggleDrawer}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} href="/news" onClick={toggleDrawer}>
              <ListItemText primary="News" />
            </ListItem>
            <ListItem button component={Link} href="/about" onClick={toggleDrawer}>
              <ListItemText primary="About Us" />
            </ListItem>
            <ListItem button component={Link} href="/analysis/banks" onClick={toggleDrawer}>
              <ListItemText primary="Analysis" />
            </ListItem>
            <Divider sx={{ my: 1, bgcolor: "rgba(255,255,255,0.2)" }} />
            <ListItem button component={Link} href="/login" onClick={toggleDrawer}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} href="/signup" onClick={toggleDrawer}>
              <ListItemText primary="Sign Up" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
