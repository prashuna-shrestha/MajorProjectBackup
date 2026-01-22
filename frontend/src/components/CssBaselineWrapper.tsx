"use client";

import React from "react";
import { CssBaseline } from "@mui/material";

// ===================================================
// CssBaselineWrapper Component
// ---------------------------------------------------
// This component applies Material UI's CssBaseline,
// which:
// - Normalizes CSS across different browsers
// - Removes default margins
// - Applies consistent typography and layout
// - Ensures Material UI components look uniform
//
// It is typically placed at the root level of the app
// (e.g., in layout.tsx or _app.tsx).
// ===================================================
export function CssBaselineWrapper() {
  return (
    <>
      {/* Applies global CSS reset and base styles */}
      <CssBaseline />
    </>
  );
}
