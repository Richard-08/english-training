import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";

export default function SearchForm({
  categories,
  category,
  search,
  setCategory,
  setSearch,
}) {
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <FormGroup sx={{ pb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Search word
      </Typography>
      <Autocomplete
        fullWidth
        multiple
        id="tags-outlined"
        options={categories}
        getOptionLabel={(option) => option.name}
        value={category}
        onChange={(event, newValue) => {
          setCategory(newValue);
        }}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} label="Category" placeholder="Category" />
        )}
      />
      <TextField
        fullWidth
        id="filled-basic"
        label="Search word"
        variant="filled"
        margin="normal"
        name="search"
        value={search}
        onChange={handleSearch}
      />
    </FormGroup>
  );
}
