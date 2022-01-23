require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  api: {
    prefix: "/api",
  },
};
