import React from "react";
import { useNavigate } from "react-router-dom";
import ls from "../../../services/ls";

import OptionsForm from "./OptionsForm";
import TranslateForm from "./TranslateForm";

export default function Practice({ lesson, updateStats }) {
  let navigate = useNavigate();

  const handleFinish = () => {
    updateStats(lesson.stats);
    ls.lessons.remove(lesson.id);
    navigate("/");
  };

  if (lesson.type === "translate") {
    return <TranslateForm lesson={lesson} handleFinish={handleFinish} />;
  } else if (lesson.type === "options") {
    return <OptionsForm lesson={lesson} handleFinish={handleFinish} />;
  }
}
