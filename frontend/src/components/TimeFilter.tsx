"use client";
import React from "react";
import { Button, ButtonGroup } from "@mui/material";

interface TimeFilterProps {
  onFilterChange: (value: string) => void;
}

const TimeFilter: React.FC<TimeFilterProps> = ({ onFilterChange }) => {
  const timeframes = ["1D", "1W", "1M", "6M", "1Y", "3Y", "5Y"];

  return (
    <div style={{ margin: "10px 0" }}>
      <ButtonGroup variant="outlined" color="secondary">
        {timeframes.map((tf) => (
          <Button key={tf} onClick={() => onFilterChange(tf)}>
            {tf}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default TimeFilter;
