"use client";

import { createTheme, PaletteMode } from "@mui/material/styles";
import { Roboto } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    typography: {
      fontFamily: "Roboto, sans-serif", // Don't use roboto.style.fontFamily here
    },
    palette: {
      mode,
      primary: { main: "#1976d2" },
    },
  });
