const { Router } = require("express");
const authMiddleware = require("../../middleware/auth");

const Lessons = require("../../data-access/Lessons");

const router = Router();

module.exports = (app) => {
  app.use("/lessons", router);

  router.get("/", authMiddleware, (req, res) => {
    Lessons.getAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.json({ err });
      });
  });

  router.get("/:id", authMiddleware, (req, res) => {
    const id = parseInt(req.params.id);
    Lessons.getLessonById(id)
      .then((lesson) => {
        res.send(lesson);
      })
      .catch((err) => {
        res.json({ err });
      });
  });
};
