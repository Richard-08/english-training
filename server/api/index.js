const { Router } = require("express");
const auth = require("./routes/auth");
const lessonStats = require("./routes/lessonStats");
const lessons = require("./routes/lessons");
const dictionary = require("./routes/dictionary");

module.exports = () => {
  const app = Router();

  auth(app);
  lessons(app);
  dictionary(app);
  lessonStats(app);

  return app;
};
