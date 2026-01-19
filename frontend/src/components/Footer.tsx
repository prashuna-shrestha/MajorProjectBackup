"use client";

import React from "react";
import { Box, Typography, Stack, Divider, Link } from "@mui/material";
import { Email, Phone } from "@mui/icons-material";
import Image from "next/image";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        color: "white",
        background: "linear-gradient(90deg, #6e4adb 0%, #5936d3 100%)",
        py: { xs: 4, md: 5 },
        px: { xs: 2, md: 6 },
        textAlign: "center",
        width: "100%",
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <Image
          src="/assets/logo.png"
          alt="FinSight Logo"
          width={60}
          height={60}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>

      <Divider
        sx={{
          bgcolor: "rgba(255,255,255,0.2)",
          width: { xs: "80%", md: "60%" },
          mx: "auto",
          mb: 3,
        }}
      />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 4 }}
        justifyContent="center"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Email fontSize="small" sx={{ color: "rgba(255,255,255,0.9)" }} />
          <Link
            href="mailto:prashuna.shrestha021@apexcollege.edu.np"
            underline="hover"
            sx={{ color: "rgba(255,255,255,0.9)", "&:hover": { color: "#FFD700" } }}
          >
            prashuna.shrestha021@apexcollege.edu.np
          </Link>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Email fontSize="small" sx={{ color: "rgba(255,255,255,0.9)" }} />
          <Link
            href="mailto:pratima.singh021@apexcollege.edu.np"
            underline="hover"
            sx={{ color: "rgba(255,255,255,0.9)", "&:hover": { color: "#FFD700" } }}
          >
            pratima.singh021@apexcollege.edu.np
          </Link>
        </Box>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 4 }}
        justifyContent="center"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Phone fontSize="small" sx={{ color: "rgba(255,255,255,0.9)" }} />
          <Link
            href="tel:9864111755"
            underline="hover"
            sx={{ color: "rgba(255,255,255,0.9)", "&:hover": { color: "#FFD700" } }}
          >
            9864111755
          </Link>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Phone fontSize="small" sx={{ color: "rgba(255,255,255,0.9)" }} />
          <Link
            href="tel:9803257815"
            underline="hover"
            sx={{ color: "rgba(255,255,255,0.9)", "&:hover": { color: "#FFD700" } }}
          >
            9803257815
          </Link>
        </Box>
      </Stack>

      <Typography
        variant="body2"
        sx={{ color: "rgba(255,255,255,0.8)", mt: 2, fontSize: "0.85rem" }}
      >
        © {new Date().getFullYear()} FinSight Analytics — All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
