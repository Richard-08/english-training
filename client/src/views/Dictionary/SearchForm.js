import React from "react";

import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SearchForm({
  categories,
  category,
  search,
  setCategory,
  setSearch,
  deleteCategory,
}) {
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = (category, event) => {
    event.preventDefault();
    event.stopPropagation();

    if (category && category.user_id) {
      deleteCategory(category.id);
    }
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
        renderOption={(props, option) => (
          <li {...props}>
            <Box className="w-100 flex-space flex-a-center">
              {option.name}
              {option.user_id && (
                <IconButton
                  aria-label="delete"
                  onClick={(event) => handleDelete(option, event)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          </li>
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
