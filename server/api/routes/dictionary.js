const { Router } = require("express");
const authMiddleware = require("../../middleware/auth");
const Dictionary = require("../../data-access/Dictionary");
const router = Router();

module.exports = (app) => {
  app.use("/dictionary", router);

  router.get("/", authMiddleware, (req, res) => {
    Dictionary.getAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.json({ err });
      });
  });

  router.get("/categories", authMiddleware, (req, res) => {
    Dictionary.getCategories()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.json({ err });
      });
  });

  router.post("/add", authMiddleware, (req, res) => {
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
};
