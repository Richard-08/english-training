import React from "react";
import { useNavigate } from "react-router-dom";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function LessonNav({ links, currentPath }) {
  let navigate = useNavigate();
  const [link, setLink] = React.useState(currentPath || links[0].link);

  const handleChange = (event, value) => {
    if (value !== null) {
      setLink(value);
      navigate(value);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={link}
      exclusive
      onChange={handleChange}
      sx={{ pb: 4 }}
    >
      {links.map((item) => (
        <ToggleButton value={item.link} key={item.name}>
          {item.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
