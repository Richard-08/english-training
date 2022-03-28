const { Router } = require("express");
const auth = require("./routes/auth");
const lessons = require("./routes/lessons");
const dictionary = require("./routes/dictionary");
const lessonStats = require("./routes/lessonStats");
const lessonSettings = require("./routes/lessonSettings");

module.exports = () => {
  const app = Router();

  auth(app);
  lessons(app);
  dictionary(app);
  lessonStats(app);
  lessonSettings(app);

  return app;
};
