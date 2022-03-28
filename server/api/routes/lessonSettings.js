const { Router } = require("express");
const authMiddleware = require("../../middleware/auth");
const LessonService = require("../../services/LessonService");

const router = Router();

module.exports = (app) => {
  app.use("/settings", router);

  router.put("/", authMiddleware, async (req, res) => {
    try {
      let payload = req.body;
      payload.user_id = req.user.id;

      const settings = await LessonService.updateLessonSettings(payload);
      res.json(settings);
    } catch (error) {
      res.json({ error: { message: error.message } });
    }
  });
};
