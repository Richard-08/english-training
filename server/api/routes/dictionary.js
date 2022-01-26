const { Router } = require("express");
const authMiddleware = require("../../middleware/auth");
const Dictionary = require("../../data-access/Dictionary");
const router = Router();

module.exports = (app) => {
  app.use("/dictionary", router);

  router.get("/", authMiddleware, async (req, res) => {
    try {
      let dictionary = await Dictionary.getDictionary();
      let categories = await Dictionary.getCategories();
      res.json({ dictionary, categories });
    } catch (error) {
      res.json({ error });
    }
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

  router.delete("/delete", authMiddleware, (req, res) => {
    Dictionary.deleteWord(req.body.id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.json({ error: { message: err.toString() } });
      });
  });
};
