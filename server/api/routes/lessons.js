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

  router.put("/", authMiddleware, async (req, res) => {
    try {
      let payload = req.body;
      payload.user_id = req.user.id;

      const stats = await LessonService.updateLessonStats(payload);
      res.json(stats);
    } catch (error) {
      res.json({ error: { message: error.message } });
    }
  });

  router.get("/reset/:id", authMiddleware, async (req, res) => {
    try {
      const lesson = await LessonService.resetLessonStats({
        lesson_id: parseInt(req.params.id),
        user_id: req.user.id,
      });
      res.json(lesson);
    } catch (error) {
      res.json({ error: { message: error.message } });
    }
  });
};
