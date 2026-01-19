"use client";
import React from "react";
import { Button, ButtonGroup } from "@mui/material";

interface TrendToggleProps {
  selected: string[];
  onToggle: (type: string) => void;
}

const TrendToggle: React.FC<TrendToggleProps> = ({ selected, onToggle }) => {
  const options = ["EMA12", "EMA26", "BB", "RSI", "VOLUME"];

  return (
    <div style={{ marginTop: "10px" }}>
      <ButtonGroup
        variant="outlined"
        color="primary"
        aria-label="trend toggle group"
      >
        {options.map((opt) => (
          <Button
            key={opt}
            onClick={() => onToggle(opt)}
            variant={selected.includes(opt) ? "contained" : "outlined"}
          >
            {opt}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default TrendToggle;
