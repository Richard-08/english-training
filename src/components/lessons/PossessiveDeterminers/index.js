import React from "react";

import LessonComponent from "../components/LessonComponent";
import Specification from "./Specification";

export default function Lesson({ lesson, updateStats, resetProgress }) {
  const spec = [{ name: "Specification", component: Specification }];
  return (
    <LessonComponent
      spec={spec}
      lesson={lesson}
      updateStats={updateStats}
      resetProgress={resetProgress}
    ></LessonComponent>
  );
}
