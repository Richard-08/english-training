import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const STAT_VALUES = [
  {
    id: "progress",
    name: "Progress",
    value: ({ progress, repetitions }) => `${progress} / ${repetitions}`,
  },
  {
    id: "last_visit",
    name: "Last practice",
    value: ({ last_visit }) => last_visit || "-/-",
  },
  {
    id: "started_at",
    name: "Started at",
    value: ({ started_at }) => started_at || "-/-",
  },
  {
    id: "end_at",
    name: "End at",
    value: ({ end_at }) => end_at || "-/-",
  },
];

export default function LessonStats({ stats, resetProgress }) {
  return (
    <Box sx={{ pb: 3 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
        m={3}
      >
        {STAT_VALUES.map((item) => (
          <Grid item xs={2} sm={4} md={3} key={item.id}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">{item.name}</Typography>
              <Typography
                color="primary.main"
                variant="h5"
                sx={{ fontWeight: "bold" }}
              >
                {item.value(stats)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Button variant="outlined" onClick={resetProgress}>
        Reset progress
      </Button>
    </Box>
  );
}
