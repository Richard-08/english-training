import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";

export default function LessonControls({ handleControl }) {
  return (
    <Box>
      <Button variant="outlined" onClick={() => handleControl("reset")}>
        Reset progress
      </Button>
      <IconButton
        title="Lesson settings"
        sx={{ ml: 1 }}
        onClick={() => handleControl("settings")}
      >
        <SettingsIcon color="primary" sx={{ fontSize: 30 }} />
      </IconButton>
    </Box>
  );
}
