const { Router } = require("express");
const authMiddleware = require("../../middleware/auth");
const LessonService = require("../../services/LessonService");

const router = Router();

module.exports = (app) => {
  app.use("/lessons", router);

  router.get("/", authMiddleware, async (req, res) => {
    try {
      const lessons = await LessonService.getLessons();
      const categories = await LessonService.getLessonsCategories();
      res.json({ lessons, categories });
    } catch (error) {
      res.json({ error: { message: error.message } });
    }
  });

  router.get("/:id", authMiddleware, async (req, res) => {
    try {
      const lesson = await LessonService.getLesson({
        lesson_id: parseInt(req.params.id),
        user_id: req.user.id,
      });
      res.json(lesson);
    } catch (error) {
      res.json({ error: { message: error.message } });
    }
  });
};
