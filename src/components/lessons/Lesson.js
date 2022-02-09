import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import service from "../../services/api";

import Specification from "./Specification";
import Practice from "./Practice";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Lesson() {
  let { lessonId } = useParams();
  const [lesson, setLesson] = useState({});
  const [tab, setTab] = React.useState(0);

  useEffect(() => {
    service.getLesson(lessonId).then((response) => {
      setLesson(response);
    });
  }, []);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box>
      <h1>Lesson {lessonId}</h1>
      <p>
        Progress: {lesson.count_repetitions} / {lesson.total_repetitions}
      </p>
      <p>Last visit: {lesson.last_visit || 'no visit'}</p>
      <Button variant="contained">Reset progress</Button>
      <Box sx={{ borderBottom: 1, borderColor: "divider", pt: 3 }}>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Specification" />
          <Tab label="Practice" />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <Specification />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Practice data={lesson.quiz} />
      </TabPanel>
    </Box>
  );
}
