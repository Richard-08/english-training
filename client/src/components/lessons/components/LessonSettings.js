import React, { Fragment, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "../../common/Modal";
import TextField from "@mui/material/TextField";

export default function LessonSettings({ open, data, save, cancel }) {
  const [settings, setSettings] = useState(data);

  const canSave = () => {
    return data.some((item, idx) => item.value !== settings[idx].value);
  };

  const handleChange = (value, e) => {
    setSettings(
      settings.map((setting) => {
        if (value.alias === setting.alias) {
          return {
            ...setting,
            value: parseInt(e.target.value),
          };
        }
        return setting;
      })
    );
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (canSave()) {
      save(settings);
    }
  };

  return (
    <Modal
      open={open}
      title="Lesson settings"
      handleClose={cancel}
      content={
        <Box sx={{ width: "400px", maxWidth: "100%" }}>
          {settings.map((setting) => {
            if (setting.type === "number") {
              return (
                <TextField
                  fullWidth
                  variant="filled"
                  key={setting.alias}
                  label={setting.name}
                  type="number"
                  value={setting.value}
                  onChange={(e) => handleChange(setting, e)}
                />
              );
            }
          })}
        </Box>
      }
      actions={
        <Fragment>
          <Button variant="outlined" onClick={cancel}>
            Cancel
          </Button>
          <Button
            disabled={!canSave()}
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </Fragment>
      }
    ></Modal>
  );
}
