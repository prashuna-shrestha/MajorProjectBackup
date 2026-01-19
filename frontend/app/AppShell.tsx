"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Dialog } from "@mui/material";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const openLoginModal = () => {
    if (!isHome) return;
    setOpenLogin(true);
    setOpenSignup(false);
  };

  const openSignupModal = () => {
    if (!isHome) return;
    setOpenSignup(true);
    setOpenLogin(false);
  };

  return (
    <>
      <Header
        onLoginClick={isHome ? openLoginModal : undefined}
        onSignupClick={isHome ? openSignupModal : undefined}
      />

      <main style={{ flex: 1 }}>{children}</main>

      <Footer />

      {/* Render dialogs ONLY on home */}
      {isHome && (
        <>
          <Dialog
            open={openLogin}
            onClose={() => setOpenLogin(false)}
            PaperProps={{
              sx: {
                borderRadius: 3,
                width: "400px",
                maxWidth: "90%",
                p: 2,
              },
            }}
            BackdropProps={{
              sx: {
                backgroundColor: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(6px)",
              },
            }}
          >
            <LoginForm
              closeModal={() => setOpenLogin(false)}
              switchToSignup={openSignupModal}
            />
          </Dialog>

          <Dialog
            open={openSignup}
            onClose={() => setOpenSignup(false)}
            PaperProps={{
              sx: {
                borderRadius: 3,
                width: "400px",
                maxWidth: "90%",
                p: 2,
              },
            }}
            BackdropProps={{
              sx: {
                backgroundColor: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(6px)",
              },
            }}
          >
            <SignupForm
              closeModal={() => setOpenSignup(false)}
              switchToLogin={openLoginModal}
            />
          </Dialog>
        </>
      )}
    </>
  );
}
