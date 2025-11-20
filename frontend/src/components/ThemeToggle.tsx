"use client";

//===================================================
// 1.Init
//===================================================
// 1-1. package import
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

// 1-2. custom components
import { RootState } from "@/store";
import { toggleMode } from "@/store/themeSlice";

//===================================================
// 2.Main Component
//===================================================
export default function ThemeToggle() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();
  const isDark = mode === "dark";

  return (
    <Tooltip title={`Switch to ${isDark ? "light" : "dark"} mode`}>
      <IconButton
        onClick={() => dispatch(toggleMode())}
        size="small"
        color="inherit"
      >
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
