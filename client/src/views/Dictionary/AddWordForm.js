import React, { useState } from "react";
import { connect } from "react-redux";
import { addWord } from "../../store/actions/dictionary";

import DropdownSearch from "../../components/common/DropdownSearch";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const AddWordForm = ({ categories, addWord }) => {
  const [enWord, setEnWord] = useState("");
  const [ruWord, setRuWord] = useState("");
  const [category, setCategory] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (enWord && ruWord && category && category.id) {
      addWord({
        en: enWord,
        ru: ruWord,
        category,
      });
      setEnWord("");
      setRuWord("");
      setCategory(null);
    }
  };

  const changeCategory = (value) => {
    setCategory(value);
  };

  const onChange = (event) => {
    if (event.target.name === "en") {
      setEnWord(event.target.value);
    } else if (event.target.name === "ru") {
      setRuWord(event.target.value);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ pb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add word
      </Typography>
      <DropdownSearch
        options={categories}
        value={category}
        onChange={changeCategory}
        label="Category"
        placeholder="Category"
        required={true}
      />
      <TextField
        sx={{ flexGrow: 1 }}
        required
        fullWidth
        id="filled-basic"
        label="EN"
        name="en"
        variant="filled"
        margin="normal"
        value={enWord}
        onChange={onChange}
      />
      <TextField
        sx={{ flexGrow: 1 }}
        required
        fullWidth
        id="filled-basic"
        label="RU"
        name="ru"
        variant="filled"
        margin="normal"
        value={ruWord}
        onChange={onChange}
      />
      <Button sx={{ flexGrow: 1 }} type="submit" fullWidth variant="contained">
        Add word
      </Button>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  categories: state.dictionary.categories,
});

export default connect(mapStateToProps, { addWord })(AddWordForm);
