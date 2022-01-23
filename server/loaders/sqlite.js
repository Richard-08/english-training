const config = require("../config");
const sqlite = require("../db/database");

module.exports = () => {
  return sqlite.open(config.DATABASE_URL);
};
