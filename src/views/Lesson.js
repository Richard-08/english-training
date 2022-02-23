import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getLesson } from "../store/actions/lessons";
import { useParams } from "react-router-dom";

import WithLoading from "../components/common/WithLoading";
import Lesson_1 from "../components/lessons/Lesson_1";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Components = {
  lesson_1: Lesson_1,
};

function Lesson({ lesson, getLesson }) {
  let { lessonId } = useParams();

  useEffect(() => {
    getLesson({ id: lessonId });
  }, []);

  const LessonComponent = Components["lesson_" + lessonId];

  return (
    <WithLoading>
      {lesson && (
        <Box>
          <Typography variant="h3" my={3}>
            {lesson.name}
          </Typography>
          {<LessonComponent lesson={lesson} />}
        </Box>
      )}
    </WithLoading>
  );
}

const mapStateToProps = (state) => ({
  lesson: state.lessons.currentLesson,
});

export default connect(mapStateToProps, { getLesson })(Lesson);
