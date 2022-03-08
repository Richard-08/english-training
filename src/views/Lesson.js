import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getLesson, updateLessonStats } from "../store/actions/lessons";
import { useParams } from "react-router-dom";
import ls from "../services/ls";

import WithLoading from "../components/common/WithLoading";
import Lesson_1 from "../components/lessons/Lesson_1";
import Lesson_2 from "../components/lessons/Lesson_2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Components = {
  lesson_1: Lesson_1,
  lesson_2: Lesson_2,
};

function Lesson({ lessons, getLesson, updateLessonStats }) {
  let { lessonId } = useParams();
  let lesson = lessons.find((lesson) => lesson.id === parseInt(lessonId));

  useEffect(() => {
    if (!lesson?.stats || !lessonInProgress()) {
      getLesson({ id: lessonId });
    }
  }, []);

  const lessonInProgress = () => {
    return ls.lessons.get(parseInt(lessonId));
  };

  const LessonComponent = Components["lesson_" + lessonId];

  return (
    <WithLoading>
      {lesson && (
        <Box>
          <Typography variant="h3" my={3}>
            {lesson.name}
          </Typography>
          {<LessonComponent lesson={lesson} updateStats={updateLessonStats} />}
        </Box>
      )}
    </WithLoading>
  );
}

const mapStateToProps = (state) => ({
  lessons: state.lessons.currentLessons,
});

export default connect(mapStateToProps, { getLesson, updateLessonStats })(
  Lesson
);
