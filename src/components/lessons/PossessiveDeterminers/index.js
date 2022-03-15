import React from "react";

import LessonStats from "../components/LessonStats";
import LessonTabs from "../components/LessonTabs";
import Specification from "./Specification";
import Practice from "../components/PracticeConstructor";
import Box from "@mui/material/Box";

export default function Lesson({ lesson, updateStats }) {
  const tabs = [{ name: "Specification" }, { name: "Practice" }];
  return (
    <Box>
      <LessonStats stats={lesson.stats} />
      <LessonTabs tabs={tabs}>
        <Specification />
        <Practice lesson={lesson} updateStats={updateStats} />
      </LessonTabs>
    </Box>
  );
}