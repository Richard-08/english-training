const { Router } = require("express");
const authMiddleware = require("../../middleware/auth");
const Dictionary = require("../../data-access/Dictionary");
const DictionaryService = require("../../services/DictionaryService");

const router = Router();

module.exports = (app) => {
  app.use("/dictionary", router);

  router.get("/", authMiddleware, async (req, res) => {
    try {
      const dictionary = await DictionaryService.getDictionary();
      res.json(dictionary);
    } catch (error) {
      res.json({ error: { message: error.message } });
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
      user_id: req.body.user_id,
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
    let payload = {
      word_id: req.body.id,
      user_id: req.body.user_id,
    };

    Dictionary.deleteWord(payload)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.json({ error: { message: err.toString() } });
      });
  });
};
