const { Router } = require("express");
const Lessons = require("../models/Lessons");
const router = Router();

router.get("/", (req, res) => {
  Lessons.getAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json({ err });
    });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  Lessons.getLessonById(id)
    .then((lesson) => {
      res.send(lesson);
    })
    .catch((err) => {
      res.json({ err });
    });
});

module.exports = router;
