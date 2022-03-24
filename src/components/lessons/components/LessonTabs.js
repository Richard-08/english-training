import React from "react";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function LessonTabs({ tabs, children }) {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={tab}
          onChange={handleChange}
        >
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
