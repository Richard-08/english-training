import React from "react";
import { useNavigate } from "react-router-dom";
import ls from "../../../services/ls";

import OptionsForm from "../components/OptionsForm";

export default function Practice({ lesson, updateStats }) {
  let navigate = useNavigate();

  const handleFinish = () => {
    updateStats(lesson.stats);
    ls.lessons.remove(lesson.id);
    navigate("/");
  };

  return <OptionsForm lesson={lesson} handleFinish={handleFinish} />;
}
