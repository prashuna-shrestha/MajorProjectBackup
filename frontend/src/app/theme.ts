import { Roboto } from "next/font/google";
import { createTheme, PaletteMode } from "@mui/material/styles";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    typography: { fontFamily: roboto.style.fontFamily },
    palette: {
      mode,
      primary: { main: "#1976d2" },
    },
  });
