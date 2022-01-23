const config = require("../../config");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const authMiddleware = require("../../middleware/auth");

const User = require("../../data-access/User");

const router = Router();

module.exports = (app) => {
  app.use("/auth", router);

  router.get("/user", authMiddleware, async (req, res) => {
    const user = await User.findUserById(req.user.id);
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
      const { username, email, password } = req.body;

      let errors = validationResult(req);

      if (!errors.isEmpty()) {
        const message = errors
          .array()
          .map((err) => `Param ${err.param} - ${err.msg}; `);
        return res.status(400).json({ error: { message } });
      }

      const emailExists = await User.findUserByEmail(email);
      if (emailExists) {
        return res.status(400).json({
          error: "The user with the given email already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        username,
        email,
        password: hashedPassword,
      };

      const response = await User.create(newUser);

      if (response) {
        const user = await User.findUserByEmail(email);

        const token = jwt.sign(
          {
            id: user.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 10,
          },
          config.TOKEN_SECRET
        );
        res.status(200).send({ user, token });
      } else {
        res.status(500).json({ error: response });
      }
    }
  );

  router.post(
    "/login",
    body("email").notEmpty(),
    body("email").isEmail(),
    body("password").notEmpty(),
    async (req, res) => {
      const { email, password } = req.body;

      let errors = validationResult(req);

      if (!errors.isEmpty()) {
        const message = errors
          .array()
          .map((err) => `Param ${err.param} - ${err.msg}; `);
        return res.status(400).json({ error: { message } });
      }

      const user = await User.findUserByEmail(email);
      if (!user) {
        return res.status(400).json({
          error: {
            message: "User with this email does not exist",
          },
        });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: { message: "Invalid password" } });
      }

      const token = jwt.sign(
        {
          id: user.id,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        config.TOKEN_SECRET
      );

      res.status(200).json({ user, token });
    }
  );

  router.post("/logout", authMiddleware, async (req, res) => {
    res.json({ message: { message: "User logged out" } }); // maybe need token blacklist
  });
};
