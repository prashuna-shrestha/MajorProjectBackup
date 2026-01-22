import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Import Google fonts via Next.js
import "./globals.css"; // Global CSS including your color scheme & resets

import Providers from "./Providers"; // Context providers (Redux, theme, etc.)
import AppShell from "./AppShell";   // Header + Footer + modal dialogs wrapper

//===================================================
// 1. Load Google Fonts & attach CSS variables
//===================================================
const geistSans = Geist({
  variable: "--font-geist-sans", // CSS variable for this font
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//===================================================
// 2. Metadata for SEO & browser
//===================================================
export const metadata: Metadata = {
  title: "FinSight",
  description: "Stock analytics and learning platform",
};

//===================================================
// 3. RootLayout Component
//    Wraps the entire app with html/body, fonts, and providers
//===================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} 
        style={{
          display: "flex",
          flexDirection: "column", // Ensures footer stays at bottom
          minHeight: "100vh",      // Full viewport height
        }}
      >
        {/* Global providers: Redux, Theme, etc. */}
        <Providers>
          {/* AppShell contains Header, Footer, and modal dialogs */}
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
