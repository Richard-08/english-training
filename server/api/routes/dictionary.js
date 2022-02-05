const { Router } = require("express");
const authMiddleware = require("../../middleware/auth");

const DictionaryService = require("../../services/DictionaryService");

const router = Router();

module.exports = (app) => {
  app.use("/dictionary", router);

  router.get("/", authMiddleware, async (req, res) => {
    try {
      const dictionary = await DictionaryService.getDictionary(req.user.id);
      res.json(dictionary);
    } catch (error) {
      res.json({ error: { message: error.message } });
    }
  });

  router.get("/categories", authMiddleware, async (req, res) => {
    try {
      const categories = await DictionaryService.getCategories(req.user.id);
      res.json({ categories });
    } catch (error) {
      res.json({ error: { message: error.message } });
    }
  });

  router.post("/add", authMiddleware, async (req, res) => {
    try {
      let payload = {
        user_id: req.body.user_id,
        category_id: req.body.category_id,
        en: req.body.en,
        ru: req.body.ru,
      };

      const word_id = await DictionaryService.addWord(payload);
      res.json(word_id);
    } catch (error) {
      res.json({ error: { message: error.message } });
    }
  });

  router.delete("/delete", authMiddleware, async (req, res) => {
    try {
      let payload = {
        word_id: req.body.id,
        user_id: req.body.user_id,
      };

      const word_id = await DictionaryService.deleteWord(payload);
      res.json(word_id);
    } catch (error) {
      res.json({ error: { message: error.message } });
    }
  });
};
