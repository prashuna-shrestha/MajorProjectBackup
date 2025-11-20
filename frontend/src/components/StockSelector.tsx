"use client";
import React, { useState, useMemo } from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { STOCK_CATEGORY_MAP } from "@/utils/stockCategories";

interface StockSelectorProps {
  symbols: string[];
  onSelect: (symbol: string) => void;
}

export default function StockSelector({
  symbols,
  onSelect,
}: StockSelectorProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const unique = new Set(Object.values(STOCK_CATEGORY_MAP));
    return ["All", ...Array.from(unique)];
  }, []);

  // Categorize + search filter
  const filteredSymbols = useMemo(() => {
    return symbols
      .filter((sym) => {
        const cat = STOCK_CATEGORY_MAP[sym] || "Others";

        return (
          (category === "All" || cat === category) &&
          sym.toLowerCase().includes(search.toLowerCase())
        );
      })
      .sort();
  }, [search, category, symbols]);

  return (
    <Box display="flex" gap={2} mb={2}>
      {/* Category Dropdown */}
      <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ width: 180 }}
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>

      {/* Search Bar */}
      <TextField
        label="Search Stock"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ width: 250 }}
      />

      {/* Stock Dropdown */}
      <TextField
        select
        label="Select Stock"
        defaultValue=""
        onChange={(e) => onSelect(e.target.value)}
        sx={{ width: 200 }}
      >
        {filteredSymbols.length === 0 && (
          <MenuItem disabled>No stock found</MenuItem>
        )}

        {filteredSymbols.map((sym) => (
          <MenuItem key={sym} value={sym}>
            {sym}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
