import React from "react";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../common/TabPanel";

export default function LessonTabs({ tabs, children }) {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider", pt: 3 }}>
        <Tabs value={tab} onChange={handleChange}>
          {tabs.map((item) => (
            <Tab label={item.name} key={item.name} />
          ))}
        </Tabs>
      </Box>
      {children.map((child, index) => (
        <TabPanel value={tab} index={index} key={index}>
          {child}
        </TabPanel>
      ))}
    </Box>
  );
}