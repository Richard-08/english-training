import React from "react";
import { Route, Routes } from "react-router-dom";

import LessonsList from "./LessonsList";
import Lesson from "./Lesson";

export default function Lessons() {
  return (
    <Routes>
      <Route path="/" element={<LessonsList />} />
      <Route path=":lessonId/*" element={<Lesson />} />
    </Routes>
  );
}
