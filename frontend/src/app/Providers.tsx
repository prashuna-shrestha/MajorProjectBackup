"use client";
import React, { useEffect, useMemo } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { getTheme } from "./theme";
import { store, RootState } from "@/store";
import { setMode, type Mode } from "@/store/themeSlice";
import { CssBaselineWrapper } from "@/components/CssBaselineWrapper";

/**
 * sets light/dark mode
 * @param param
 * @returns
 */
function Themed({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const mode = useSelector((s: RootState) => s.theme.mode);

  useEffect(() => {
    try {
      const saved = (localStorage.getItem("theme") as Mode) || null;
      if (saved && saved !== mode) dispatch(setMode(saved));
    } catch (err) {
      console.log("err", err);
    }
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme" && e.newValue) {
        const next = e.newValue as Mode;
        if (next !== mode) dispatch(setMode(next));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [dispatch, mode]);

  // Update DOM styles when mode changes (after hydration)
  useEffect(() => {
    localStorage.setItem("theme", mode);
    if (typeof document !== "undefined" && document.body) {
      if (mode === "dark") {
        document.documentElement.style.background = "#0a0a0a";
        document.body.style.background = "#0a0a0a";
        document.body.style.color = "#ededed";
      } else {
        document.documentElement.style.background = "#ffffff";
        document.body.style.background = "#ffffff";
        document.body.style.color = "#171717";

        // CRITICAL: Remove any injected dark mode style tags when switching to light
        const allStyles = document.head.querySelectorAll("style");
        allStyles.forEach((styleEl) => {
          const content = styleEl.textContent || "";
          // Check if this style contains the dark mode important rules
          if (
            content.includes("#0a0a0a!important") &&
            content.includes("html{background")
          ) {
            styleEl.remove();
          }
        });
      }
    }
  }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaselineWrapper />
      {children}
    </ThemeProvider>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Themed>{children}</Themed>
    </Provider>
  );
}
