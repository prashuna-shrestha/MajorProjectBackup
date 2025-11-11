"use client";

import React, { useEffect, useMemo } from "react";
import { Provider as ReduxProvider, useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { getTheme } from "./theme";
import { store, RootState } from "@/store";
import { setMode, type Mode } from "@/store/themeSlice";
import { CssBaselineWrapper } from "@/components/CssBaselineWrapper";
import MuiRegistry from "./MuiRegistry";

/* ✅ Theme wrapper */
function Themed({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const mode = useSelector((s: RootState) => s.theme.mode);

  useEffect(() => {
    try {
      const saved = (localStorage.getItem("theme") as Mode) || null;
      if (saved && saved !== mode) dispatch(setMode(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <MuiRegistry>
      <ThemeProvider theme={theme}>
        <CssBaselineWrapper />
        {children}
      </ThemeProvider>
    </MuiRegistry>
  );
}

/* ✅ Global providers */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <Themed>{children}</Themed>
    </ReduxProvider>
  );
}
