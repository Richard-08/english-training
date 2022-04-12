import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Woops404() {
  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="h2">Woops...</Typography>
      <Typography variant="h3">Page not found</Typography>
    </Box>
  );
}
