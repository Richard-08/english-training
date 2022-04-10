import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import IconButton from "@mui/material/IconButton";

export default function QuizForm({
  onSubmit,
  resetProgress,
  isLastQuiz,
  progress,
  children,
}) {
  return (
    <Box>
      <Box
        component="form"
        className="flex-column"
        sx={{ pt: 2, pb: 2 }}
        autoComplete="off"
        onSubmit={onSubmit}
      >
        {children}
        <Box className="flex-a-center">
          <Typography variant="h6">{progress}</Typography>
          <IconButton sx={{ ml: 1 }} onClick={resetProgress}>
            <RestartAltIcon />
          </IconButton>
          <Button sx={{ ml: "auto" }} variant="contained" type="submit">
            {isLastQuiz ? "Finish" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
