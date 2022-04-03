const { Router } = require("express");
const authMiddleware = require("../../middleware/auth");
const LessonService = require("../../services/LessonService");
const StatsService = require("../../services/StatsService");
const queryString = require("query-string");

const router = Router();

module.exports = (app) => {
  app.use("/stats", router);

  router.put("/", authMiddleware, async (req, res) => {
    try {
      let payload = req.body;
      payload.user_id = req.user.id;

      LessonService.createUserStat(payload);

      const stats = await LessonService.updateLessonStats(payload);
      res.json(stats);
    } catch (error) {
      res.json({ error: { message: error.message } });
    }
  });

  router.get("/reset", authMiddleware, async (req, res) => {
    try {
      const params = queryString.parseUrl(req.url);
      const lesson = await LessonService.resetLessonStats({
        lesson_id: parseInt(params.query.id),
        user_id: req.user.id,
      });
      res.json(lesson);
    } catch (error) {
      res.json({ error: { message: error.message } });
    }
  });

  router.get("/user", authMiddleware, async (req, res) => {
    try {
      const stats = await StatsService.getUserStats(req.user.id);
      res.json(stats);
    } catch (error) {
      res.json({ error: { message: error.message } });
    }
  });
};
