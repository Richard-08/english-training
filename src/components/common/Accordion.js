import React from "react";

import AccordionContainer from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Accordion({ title, id, children }) {
  return (
    <AccordionContainer>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={id + "-content"}
        id={id + "-header"}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </AccordionContainer>
  );
}
