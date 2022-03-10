import React, { useState } from "react";
import useQuizProgress from "../hooks/useQuizProgress";

import QuizForm from "./QuizForm";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function TranslateForm({ lesson, handleFinish }) {
  const { progress, updateProgress, isLast } = useQuizProgress(
    lesson.id,
    lesson.data.length - 1
  );

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidAnswer()) {
      if (isLast()) {
        resetProgress();
        handleFinish();
      } else {
        updateProgress(progress + 1);
        setAnswer("");
        setError(false);
      }
    } else {
      setError(true);
    }
  };

  const isValidAnswer = () => {
    return answer.toLowerCase() === lesson.data[progress].answer.toLowerCase();
  };

  const resetProgress = () => {
    updateProgress(0);
    setAnswer("");
    setError(false);
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
      <Typography variant="h6">{lesson.data[progress].question}</Typography>
      <TextField
        sx={{ width: "100%", mt: 1, mb: 1 }}
        id="filled-basic"
        label="Translate"
        variant="filled"
        error={error}
        value={answer}
        onChange={handleChange}
      />
    </QuizForm>
  );
}
