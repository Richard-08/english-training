import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuizProgress from "../hooks/useQuizProgress";
import ls from "../../../services/ls";

import QuizForm from "../components/QuizForm";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const OPTIONS = ["a", "an", "the", "some", "-"];

export default function Practice({ lesson, data, updateStats }) {
  let navigate = useNavigate();
  const { progress, updateProgress, isLast } = useQuizProgress(
    lesson.id,
    data.length - 1
  );

  const [answers, setAnswer] = useState([]);

  useEffect(() => {
    setAnswer(
      data[progress].map((item) => {
        if (item.type === "quiz") {
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
      data[progress].map((item, idx) => {
        if (index === idx) {
          item.answer = event.target.value;
        }
        return item;
      })
    );
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
    return `${progress + 1} / ${data.length}`;
  };

  return (
    <QuizForm
      onSubmit={setNext}
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
              <Typography>{item.value}</Typography>
            ) : (
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">
                  option
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={item.answer}
                  onChange={(e) => handleChange(i, e)}
                >
                  {OPTIONS.map((option) => (
                    <MenuItem value={option} key={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
        ))}
      </Box>
    </QuizForm>
  );
}
