import React from "react";

import LessonComponent from "../components/LessonComponent";
import SpecTable from "./SpecTable";
import Spec1 from "./Spec1";
import Spec2 from "./Spec2";
import Spec3 from "./Spec3";

const SPEC = [
  { name: "General", component: SpecTable },
  { name: "a/an, some", component: Spec1 },
  { name: "the", component: Spec2 },
  { name: "No article", component: Spec3 },
];

export default function Lesson({ lesson, updateStats, resetProgress }) {
  return (
    <LessonComponent
      spec={SPEC}
      lesson={lesson}
      updateStats={updateStats}
      resetProgress={resetProgress}
    ></LessonComponent>
  );
}
