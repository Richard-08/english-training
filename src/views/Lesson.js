import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/api/lessons";

import Lesson_1 from "../components/lessons/Lesson_1";
import Box from "@mui/material/Box";

const Components = {
  lesson_1: Lesson_1,
};

export default function Lesson() {
  let { lessonId } = useParams();
  const [lesson, setLesson] = useState({});

  useEffect(() => {
    service.getLesson(lessonId).then((response) => {
      setLesson(response);
    });
  }, []);

  const LessonComponent = Components["lesson_" + lessonId];

  return (
    <Box>
      <LessonComponent lesson={lesson} />
    </Box>
  );
}
