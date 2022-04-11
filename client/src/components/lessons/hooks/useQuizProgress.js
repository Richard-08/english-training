import { useState, useEffect } from "react";
import ls from "../../../services/ls";

const useQuizProgress = (lessonId, total) => {
  const savedLesson = ls.lessons.get(lessonId);
  const [progress, setProgress] = useState(
    (savedLesson && savedLesson.progress) || 0
  );

  useEffect(() => {
    ls.lessons.set({
      id: lessonId,
      progress,
    });
  }, [progress]);

  return {
    progress,
    updateProgress: (value) => setProgress(value),
    isLast: () => progress === total,
  };
};

export default useQuizProgress;
