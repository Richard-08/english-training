import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import IconButton from "@mui/material/IconButton";

export default function Practice({ data }) {
  const state = JSON.parse(localStorage.getItem("state"));

  const [index, setIndex] = useState((state && state.index) || 0);
  const [answer, setAnswer] = useState((state && state.answer) || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify({ answer, index }));
  }, [answer, index]);

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const setNext = () => {
    if (answer.toLowerCase() === data[index].answer.toLowerCase()) {
      setIndex(index + 1);
      setAnswer("");
      setError(false);
    } else {
      setError(true);
    }
  };

  const resetProgress = () => {
    setIndex(0);
    setAnswer("");
    setError(false);
    localStorage.removeItem("state");
  };

  return (
    <Box>
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          pt: 2,
          pb: 2,
        }}
        autoComplete="off"
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">
            {data[index].question} ({index + 1} / {data.length})
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={resetProgress}>
            <RestartAltIcon />
          </IconButton>
        </Box>
        <TextField
          sx={{ width: "100%", mt: 1, mb: 1 }}
          id="filled-basic"
          label="Translate"
          variant="filled"
          error={error}
          value={answer}
          onChange={handleChange}
        />
        <Button sx={{ ml: "auto" }} variant="contained" onClick={setNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
}
