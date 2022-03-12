import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function DropdownSearch({
  options,
  value,
  label,
  placeholder,
  onChange,
  required = false,
  multiple = false,
}) {
  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      getOptionLabel={(option) => option.name}
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          required={required}
        />
      )}
    />
  );
}
