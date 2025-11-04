"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        textAlign: "center",
        py: 3,
        mt: "auto",
        backgroundColor: "background.default",
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        <Image src="/logo.svg" alt="FinSight Logo" width={24} height={24} />
        <Typography variant="subtitle1" color="primary" fontWeight={600}>
          FinSight
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" mt={1}>
        © {new Date().getFullYear()} FinSight Analytics 
      </Typography>
    </Box>
  );
};

export default Footer;
