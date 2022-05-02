const { Router } = require("express");
const authMiddleware = require("../../middleware/auth");

const UserService = require("../../services/UserService");

const router = Router();

module.exports = (app) => {
  app.use("/user", router);

  router.get("/", authMiddleware, async (req, res) => {
    try {
      const user = await UserService.getUserById(req.user.id);
      if (!user) {
        throw new Error("User not found");
      }
      res.send(user);
    } catch (error) {
      return res.status(400).json({ error: { message: error.message } });
    }
  });

  router.delete("/", authMiddleware, async (req, res) => {
    try {
      const user = await UserService.deleteUserByEmail(req.user.email);
      if (!user) {
        throw new Error("User not found");
      }
      res.send(user);
    } catch (error) {
      return res.status(400).json({ error: { message: error.message } });
    }
  });
};
