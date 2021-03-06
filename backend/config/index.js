const path = require("path");
const dotenv = require("dotenv");
const result = dotenv.config({ path: path.resolve("../.env") });

if (result.error) {
  throw result.error;
}

module.exports = {
  ...result.parsed,
  api: {
    prefix: "/api",
  },
};
