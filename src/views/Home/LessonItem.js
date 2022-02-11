import React from "react";

import LinearProgress from "@mui/material/LinearProgress";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(9, 5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  position: "relative",
}));

export default function LessonItem({ item }) {
  const getProgress = (lesson) => {
    return (lesson.progress * 100) / lesson.repetitions;
  };

  return (
    <Item elevation={3}>
      <Box sx={{ typography: "h5" }}>{item.name}</Box>
      {item.stats && (
        <Box>
          <Box sx={{ typography: "subtitle1" }}>
            {item.progress} / {item.repetitions}
          </Box>
          <Box sx={{ typography: "subtitle1" }}>{item.last_visit}</Box>
          <Box sx={{ typography: "subtitle1" }}>{item.started_at}</Box>
          <Box sx={{ typography: "subtitle1" }}>{item.end_at}</Box>
          <Box
            sx={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
            }}
          >
            <LinearProgress variant="determinate" value={getProgress(item)} />
          </Box>
        </Box>
      )}
    </Item>
  );
}
