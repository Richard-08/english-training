import React, { useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import ls from "../../../services/ls";
import { NAV_LINKS, SETTINGS_FIELDS } from "./constants";

import LessonStats from "./LessonStats";
import LessonTabs from "./LessonTabs";
import LessonNav from "./LessonNav";
import LessonControls from "./LessonControls";
import LessonSettings from "./LessonSettings";
import Practice from "../components/PracticeConstructor";
import Box from "@mui/material/Box";

export default function LessonComponent({
  spec,
  lesson,
  updateStats,
  resetProgress,
  updateSettings,
}) {
  let navigate = useNavigate();

  let params = useParams();
  let currentPath = params["*"];

  const [showSettings, setShowSettings] = useState(false);

  const settings_data = () => {
    let settings = lesson.settings;
    return SETTINGS_FIELDS.map((field) => {
      return {
        ...field,
        value: settings[field.alias] || field.value,
      };
    });
  };

  const handleFinish = () => {
    updateStats(lesson.stats);
    ls.lessons.remove(lesson.id);
    navigate("/lessons");
  };

  const handleControl = (type) => {
    if (type === "reset") {
      resetProgress(lesson.id);
    } else if (type === "settings") {
      setShowSettings(true);
    }
  };

  const handleSettingClose = () => {
    setShowSettings(false);
  };

  const handleSettingsSave = (data) => {
    let send_data = {
      lesson_id: lesson.id,
    };

    data.forEach((item) => {
      send_data[item.alias] = item.value;
    });

    updateSettings(send_data);
    handleSettingClose();
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap-reverse",
          pb: 4,
        }}
      >
        <LessonNav links={NAV_LINKS} currentPath={currentPath} />
        <LessonControls handleControl={handleControl} />
        <LessonSettings
          open={showSettings}
          data={settings_data()}
          save={handleSettingsSave}
          cancel={handleSettingClose}
        />
      </Box>
      <Routes>
        <Route
          path=""
          element={
            <LessonStats stats={{ ...lesson.stats, ...lesson.settings }} />
          }
        ></Route>
        <Route
          path="spec"
          element={
            spec &&
            spec.length && (
              <LessonTabs key={currentPath} tabs={spec}>
                {spec.map((item) => {
                  const Component = item.component;
                  return <Component key={item.name} />;
                })}
              </LessonTabs>
            )
          }
        />
        <Route
          path="practice"
          element={
            <LessonTabs key={currentPath} tabs={lesson.practice}>
              {lesson.practice.map((item) => (
                <Practice
                  lesson={lesson}
                  practice={item}
                  handleFinish={handleFinish}
                  key={item.name}
                />
              ))}
            </LessonTabs>
          }
        />
      </Routes>
    </Box>
  );
}
