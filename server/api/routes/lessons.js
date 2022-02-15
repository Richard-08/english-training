const { Router } = require("express");
const authMiddleware = require("../../middleware/auth");
const LessonService = require("../../services/LessonService");

const router = Router();

module.exports = (app) => {
  app.use("/lessons", router);

  router.get("/", authMiddleware, async (req, res) => {
    try {
      const lessons = await LessonService.getLessons();
      res.json(lessons);
    } catch (error) {
      res.json({ error: { message: error.message } });
    }
  });

  router.get("/:id", authMiddleware, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const lesson = await LessonService.getLesson(id);
      res.json(lesson);
    } catch (error) {
      res.json({ error: { message: error.message } });
    }
  });
};
