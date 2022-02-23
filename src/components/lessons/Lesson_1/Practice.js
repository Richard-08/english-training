import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import IconButton from "@mui/material/IconButton";

export default function Practice({ data }) {
  const state = JSON.parse(localStorage.getItem("lesson1"));

  const [index, setIndex] = useState((state && state.index) || 0);
  const [en, setEn] = useState("");
  const [error, setError] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("lesson1", JSON.stringify({ index }));
  }, [index]);

  const handleChange = (e) => {
    setEn(e.target.value);
  };

  const setNext = (e) => {
    e.preventDefault();

    if (en.toLowerCase() === data[index].en.toLowerCase()) {
      if (isLast()) {
        navigate("/");
        resetProgress();
      } else {
        setIndex(index + 1);
        setEn("");
        setError(false);
      }
    } else {
      setError(true);
    }
  };

  const isLast = () => {
    return index === data.length - 1;
  };

  const resetProgress = () => {
    setIndex(0);
    setEn("");
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
        onSubmit={setNext}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">
            {data[index].ru} ({index + 1} / {data.length})
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
          value={en}
          onChange={handleChange}
        />
        <Button sx={{ ml: "auto" }} variant="contained" type="submit">
          {isLast() ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}
