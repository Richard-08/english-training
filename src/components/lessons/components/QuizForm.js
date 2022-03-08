import React from "react";
import { useNavigate } from "react-router-dom";
import useQuizProgress from "../hooks/useQuizProgress";
import ls from "../../../services/ls";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import IconButton from "@mui/material/IconButton";

export default function QuizForm({ lesson, data, children }) {
  let navigate = useNavigate();
  const { progress, updateProgress, isLast } = useQuizProgress(
    lesson.id,
    data.length
  );

  const setNext = (e) => {
    e.preventDefault();

    if (true) {
      if (isLast()) {
        ls.lessons.remove(lesson.id);
        navigate("/");
      } else {
        updateProgress(progress + 1);
      }
    } else {
    }
  };

  const resetProgress = () => {
    updateProgress(0);
  };

  return (
    <Box>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          pt: 2,
          pb: 2,
        }}
        autoComplete="off"
        onSubmit={setNext}
      >
        {children}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">
            ({progress + 1} / {data.length})
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={resetProgress}>
            <RestartAltIcon />
          </IconButton>
          <Button sx={{ ml: "auto" }} variant="contained" type="submit">
            {isLast() ? "Finish" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
