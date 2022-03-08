import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuizProgress from "../hooks/useQuizProgress";
import ls from "../../../services/ls";

import QuizForm from "../components/QuizForm";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Practice({ lesson, data, updateStats }) {
  let navigate = useNavigate();
  const { progress, updateProgress, isLast } = useQuizProgress(
    lesson.id,
    data.length
  );

  const [en, setEn] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setEn(e.target.value);
  };

  const setNext = (e) => {
    e.preventDefault();

    if (isValidAnswer()) {
      if (isLast()) {
        updateStats(lesson.stats);
        resetProgress();
        ls.lessons.remove(lesson.id);
        navigate("/");
      } else {
        updateProgress(progress + 1);
        setEn("");
        setError(false);
      }
    } else {
      setError(true);
    }
  };

  const isValidAnswer = () => {
    return en.toLowerCase() === data[progress].en.toLowerCase();
  };

  const resetProgress = () => {
    updateProgress(0);
    setEn("");
    setError(false);
  };

  return (
    <QuizForm lesson={lesson} data={data}>
      <Typography variant="h6">{data[progress].ru}</Typography>
      <TextField
        sx={{ width: "100%", mt: 1, mb: 1 }}
        id="filled-basic"
        label="Translate"
        variant="filled"
        error={error}
        value={en}
        onChange={handleChange}
      />
    </QuizForm>
  );
}
