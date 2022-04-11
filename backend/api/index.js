const { Router } = require("express");
const auth = require("./routes/auth");
const lessons = require("./routes/lessons");
const dictionary = require("./routes/dictionary");
const stats = require("./routes/stats");
const lessonSettings = require("./routes/lessonSettings");

module.exports = () => {
  const app = Router();

  auth(app);
  stats(app);
  lessons(app);
  dictionary(app);
  lessonSettings(app);

  return app;
};
