const { body, validationResult } = require("express-validator");
const { Router } = require("express");
const authMiddleware = require("../../middleware/auth");

const AuthService = require("../../services/AuthService");
const User = require("../../data-access/User");

const router = Router();

module.exports = (app) => {
  app.use("/auth", router);

  router.get("/user", authMiddleware, async (req, res) => {
    const user = await User.findUserById(req.user.id); //////// Refactor
    if (!user) {
      return res.status(400).json({ error: { message: "User not found" } });
    }
    res.send(user);
  });

  router.post(
    "/register",
    body("username").notEmpty(),
    body("email").notEmpty(),
    body("email").isEmail(),
    body("password").notEmpty(),
    async (req, res) => {
      try {
        const { username, email, password } = req.body;

        let errors = validationResult(req);
        if (!errors.isEmpty()) {
          const message = errors
            .array()
            .map((err) => `Param ${err.param} - ${err.msg}; `);
          throw new Error(message);
        }

        const authServiceInstanse = new AuthService(User);
        const { user, token } = await authServiceInstanse.signUp(
          username,
          email,
          password
        );
        res.status(201).json({ user, token });
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: { message: error.message } });
      }
    }
  );

  router.post(
    "/login",
    body("email").notEmpty(),
    body("email").isEmail(),
    body("password").notEmpty(),
    async (req, res) => {
      try {
        const { email, password } = req.body;

        let errors = validationResult(req);
        if (!errors.isEmpty()) {
          const message = errors
            .array()
            .map((err) => `Param ${err.param} - ${err.msg}; `);
          throw new Error(message);
        }

        const authServiceInstanse = new AuthService(User);
        const { user, token } = await authServiceInstanse.signIn(
          email,
          password
        );
        res.status(200).json({ user, token });
      } catch (error) {
        res.status(400).json({ error: { message: error.message } });
      }
    }
  );

  router.post("/logout", authMiddleware, async (req, res) => {
    res.json({ message: { message: "User logged out" } }); // maybe need token blacklist
  });
};
