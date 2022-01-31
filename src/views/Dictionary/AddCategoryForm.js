import React, { useState } from "react";
import { connect } from "react-redux";
import {} from "../../store/actions/dictionary";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function AddCategoryForm() {
  const [category, setCategory] = useState("");

  const onChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ pb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add category
      </Typography>
      <TextField
        sx={{ flexGrow: 1 }}
        required
        fullWidth
        id="filled-basic"
        label="Category"
        name="category"
        variant="filled"
        margin="normal"
        value={category}
        onChange={onChange}
      />
      <Button sx={{ flexGrow: 1 }} type="submit" fullWidth variant="contained">
        Add category
      </Button>
    </Box>
  );
}
