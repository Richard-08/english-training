import React, { useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import ls from "../../../services/ls";

import Button from "@mui/material/Button";
import LessonStats from "./LessonStats";
import LessonTabs from "./LessonTabs";
import LessonNav from "./LessonNav";
import LessonControls from "./LessonControls";
import Practice from "../components/PracticeConstructor";
import Box from "@mui/material/Box";
import Modal from "../../common/Modal";

const NAV_LINKS = [
  {
    link: "",
    name: "Stats",
  },
  {
    link: "spec",
    name: "Specifications",
  },
  {
    link: "practice",
    name: "Practices",
  },
];

export default function LessonComponent({
  spec,
  lesson,
  updateStats,
  resetProgress,
}) {
  let navigate = useNavigate();

  let params = useParams();
  let currentPath = params["*"];

  const [showSettings, setShowSettings] = useState(false);

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

  const handleSettingsSave = () => {};

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
      </Box>
      <Routes>
        <Route path="" element={<LessonStats stats={lesson.stats} />}></Route>
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
      <Modal
        open={showSettings}
        title="Lesson settings"
        handleClose={handleSettingClose}
        actions={
          <>
            <Button variant="outlined" onClick={handleSettingClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSettingsSave}>
              Save
            </Button>
          </>
        }
      ></Modal>
    </Box>
  );
}
