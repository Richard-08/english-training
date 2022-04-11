import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <Box
      className="flex-center"
      sx={{
        p: 5,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
