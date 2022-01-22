const { Router } = require("express");
const authMiddleware = require("../../middleware/auth");
const router = Router();

module.exports = (app) => {
  app.use("/lesson", router);
};
