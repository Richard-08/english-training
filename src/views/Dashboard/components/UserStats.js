import React from "react";
import { STATS } from "../contants";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function LessonStats({ stats }) {
  return (
    <Box sx={{ pb: 3 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
        m={3}
      >
        {STATS.map((item) => (
          <Grid item xs={2} sm={4} md={3} key={item.alias}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography color="text" variant="h6">
                {item.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h3" sx={{ fontWeight: "bold", mx: 1 }}>
                  {stats[item.alias]}
                </Typography>
                <Typography color="text.secondary" variant="subtitle1">
                  {item.unit}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
