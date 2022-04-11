const config = require("../config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: { message: "Access denied" } });
  }

  try {
    const user = jwt.verify(token, config.TOKEN_SECRET);
    if (user) {
      req.user = user;
    }
    next();
  } catch (error) {
    res.status(400).json({ error: { message: "Invalid credentials" } });
  }
};
