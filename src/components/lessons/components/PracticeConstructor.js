import React from "react";

import OptionsForm from "./OptionsForm";
import TranslateForm from "./TranslateForm";

export default function Practice({ lesson, practice, handleFinish }) {
  if (practice.type === "translate") {
    return (
      <TranslateForm
        lesson={lesson}
        practice={practice}
        handleFinish={handleFinish}
      />
    );
  } else if (practice.type === "options") {
    return (
      <OptionsForm
        lesson={lesson}
        practice={practice}
        handleFinish={handleFinish}
      />
    );
  }
}
