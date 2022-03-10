import React, { useEffect, useState } from "react";
import useQuizProgress from "../hooks/useQuizProgress";

import QuizForm from "./QuizForm";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dropdown from "../../common/Dropdown";

export default function OptionsForm({ lesson, handleFinish }) {
  const { progress, updateProgress, isLast } = useQuizProgress(
    lesson.id,
    lesson.data.length - 1
  );

  const [answers, setAnswer] = useState([]);

  useEffect(() => {
    setAnswer(
      lesson.data[progress].map((item) => {
        if (item.type === "option") {
          item.answer = "";
          item.error = false;
        }
        return item;
      })
    );
  }, [progress]);

  const handleChange = (index, event) => {
    console.log(index, event.target.value);
    setAnswer(
      lesson.data[progress].map((item, idx) => {
        if (index === idx) {
          item.answer = event.target.value;
        }
        return item;
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidAnswer()) {
      if (isLast()) {
        resetProgress();
        handleFinish();
      } else {
        updateProgress(progress + 1);
        // CLEAR FORM
      }
    } else {
      // SET ERROR
    }
  };

  const isValidAnswer = () => {
    // VALIDATION
  };

  const resetProgress = () => {
    updateProgress(0);
    // CLEAR FORM
  };

  const currentProgress = () => {
    return `${progress + 1} / ${lesson.data.length}`;
  };

  return (
    <QuizForm
      onSubmit={handleSubmit}
      resetProgress={resetProgress}
      isLastQuiz={isLast()}
      progress={currentProgress()}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          pb: 2,
          mb: 2,
          borderBottom: 1,
        }}
      >
        {answers.map((item, i) => (
          <Box key={i}>
            {item.type === "text" ? (
              <Typography variant="subtitle1" sx={{ fontSize: "h6.fontSize" }}>
                {item.value}
              </Typography>
            ) : (
              <Dropdown
                value={item.answer}
                label={"option"}
                options={lesson.options}
                handleChange={(e) => handleChange(i, e)}
              />
            )}
          </Box>
        ))}
      </Box>
    </QuizForm>
  );
}
