import React from "react";
import { useNavigate } from "react-router-dom";
import ls from "../../../services/ls";

import TranslateForm from "../components/TranslateForm";

export default function Practice({ lesson, updateStats }) {
  let navigate = useNavigate();

  const handleFinish = () => {
    updateStats(lesson.stats);
    ls.lessons.remove(lesson.id);
    navigate("/");
  };

  return <TranslateForm lesson={lesson} handleFinish={handleFinish} />;
}
