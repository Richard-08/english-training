import React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Dropdown({
  label,
  value,
  required = false,
  error = false,
  options,
  minWidth = 120,
  variant = "filled",
  handleChange,
}) {
  return (
    <FormControl
      required={required}
      error={error}
      variant={variant}
      sx={{ m: 1, minWidth: minWidth }}
    >
      {label && <InputLabel id="select">{label}</InputLabel>}
      <Select
        labelId="select"
        id="select"
        value={value}
        onChange={handleChange}
      >
        {options.map((option, i) => (
          <MenuItem value={option} key={i}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
