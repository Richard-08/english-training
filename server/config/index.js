require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  SQLITE_DATABASE: process.env.SQLITE_DATABASE,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  api: {
    prefix: "/api",
  },
};
