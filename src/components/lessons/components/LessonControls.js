import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";

export default function LessonControls() {
  return (
    <Box>
      <IconButton title="Reset lesson progress" sx={{ ml: 1 }}>
        <RestartAltIcon color="primary" sx={{ fontSize: 30 }} />
      </IconButton>
      <IconButton title="Lesson settings" sx={{ ml: 1 }}>
        <SettingsIcon color="primary" sx={{ fontSize: 30 }} />
      </IconButton>
    </Box>
  );
}
