const { Router } = require("express");
const Dictionary = require("../models/Dictionary");
const router = Router();

router.get("/", (req, res) => {
  Dictionary.getAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json({ err });
    });
});

router.get("/categories", (req, res) => {
  Dictionary.getCategories()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json({ err });
    });
});

router.post("/add", (req, res) => {
  let payload = {
    category_id: req.body.category_id,
    en: req.body.en,
    ru: req.body.ru,
  };

  Dictionary.addWord(payload)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json({ error: { message: err.toString() } });
    });
});

module.exports = router;
