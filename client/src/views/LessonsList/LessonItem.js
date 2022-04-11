import React from "react";

import LinearProgress from "@mui/material/LinearProgress";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
    <Item
      elevation={3}
      sx={{ height: "100%", minHeight: 235, overflow: "hidden" }}
    >
      <Typography variant="h5" color="text.primary">
        {item.name}
      </Typography>
      {item.started_at && (
        <Box>
          <Typography variant="body2">
            Progress: {item.progress} / {item.repetitions}
          </Typography>
          {item.last_visit && (
            <Typography variant="body2">
              Last practice: {item.last_visit}
            </Typography>
          )}
          {item.started_at && (
            <Typography variant="body2">Started: {item.started_at}</Typography>
          )}
          {Boolean(item.progress) && (
            <Box
              sx={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
              }}
            >
              <LinearProgress
                sx={{ height: "8px" }}
                variant="determinate"
                value={getProgress(item)}
              />
            </Box>
          )}
        </Box>
      )}
    </Item>
  );
}
