import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getLesson } from "../store/actions/lessons";
import { updateLessonStats, resetProgress } from "../store/actions/lessonStats";
import { updateLessonSettings } from "../store/actions/lessonSettings";
import { useParams } from "react-router-dom";
import useDocumentTitle from "../components/hooks/useDocumentTitle";
import ls from "../services/ls";

import WithLoading from "../components/common/WithLoading";
import TensesSimple from "../components/lessons/TensesSimple";
import Articles from "../components/lessons/Articles";
import DemoDeterminers from "../components/lessons/DemoDeterminers";
import PossessiveDeterminers from "../components/lessons/PossessiveDeterminers";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Components = {
  lesson_1: TensesSimple,
  lesson_2: Articles,
  lesson_3: DemoDeterminers,
  lesson_4: PossessiveDeterminers,
};

function Lesson({
  lessons,
  getLesson,
  updateLessonStats,
  resetProgress,
  updateLessonSettings,
}) {
  let { lessonId } = useParams();
  let lesson = lessons.find((lesson) => lesson.id === parseInt(lessonId));

  useDocumentTitle(lesson?.name || "Lesson");

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
          <Typography variant="h4" my={3}>
            {lesson.name}
          </Typography>
          {
            <LessonComponent
              lesson={lesson}
              updateStats={updateLessonStats}
              resetProgress={resetProgress}
              updateSettings={updateLessonSettings}
            />
          }
        </Box>
      )}
    </WithLoading>
  );
}

const mapStateToProps = (state) => ({
  lessons: state.lessons.currentLessons,
});

export default connect(mapStateToProps, {
  getLesson,
  updateLessonStats,
  resetProgress,
  updateLessonSettings,
})(Lesson);
