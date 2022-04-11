import React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ToggleButtons({ value, data, handleChange }) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={handleChange}
    >
      {data.map((item) => (
        <ToggleButton value={item.id} key={item.name}>
          {item.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
