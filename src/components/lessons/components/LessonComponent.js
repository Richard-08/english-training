import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ls from "../../../services/ls";

import LessonStats from "./LessonStats";
import LessonTabs from "./LessonTabs";
import LessonNav from "./LessonNav";
import Practice from "../components/PracticeConstructor";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const NAV_LINKS = [
  {
    link: "",
    name: "Specifications",
  },
  {
    link: "practice",
    name: "Practices",
  },
];

export default function LessonComponent({
  spec,
  lesson,
  updateStats,
  resetProgress,
}) {
  let navigate = useNavigate();

  const handleFinish = () => {
    updateStats(lesson.stats);
    ls.lessons.remove(lesson.id);
    navigate("/");
  };

  return (
    <Box>
      <LessonStats stats={lesson.stats} resetProgress={resetProgress} />
      <Divider />
      <LessonNav links={NAV_LINKS} />
      <Routes>
        <Route
          path=""
          element={
            spec &&
            spec.length && (
              <LessonTabs tabs={spec}>
                {spec.map((item) => {
                  const Component = item.component;
                  return <Component key={item.name} />;
                })}
              </LessonTabs>
            )
          }
        />
        <Route
          path="practice"
          element={
            <LessonTabs tabs={lesson.practice}>
              {lesson.practice.map((item) => (
                <Practice
                  lesson={lesson}
                  practice={item}
                  handleFinish={handleFinish}
                  key={item.name}
                />
              ))}
            </LessonTabs>
          }
        />
      </Routes>
    </Box>
  );
}
