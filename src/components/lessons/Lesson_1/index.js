import React from "react";

import LessonStats from "../components/LessonStats";
import Specification from "./Specification";
import Practice from "./Practice";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../common/TabPanel";

export default function Lesson({ lesson }) {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box>
      <LessonStats stats={lesson.stats} />
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
        <Practice data={lesson.data} />
      </TabPanel>
    </Box>
  );
}
