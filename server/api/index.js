const { Router } = require("express");
const auth = require("./routes/auth");
const lesson = require("./routes/lesson");
const lessons = require("./routes/lessons");
const dictionary = require("./routes/dictionary");

module.exports = () => {
  const app = Router();

  auth(app);
  lesson(app);
  lessons(app);
  dictionary(app);

  return app;
};
