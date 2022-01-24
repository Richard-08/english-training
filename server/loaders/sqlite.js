const config = require("../config");
const sqliteDB = require("../db/sqlite/Database");

module.exports = () => {
  return sqliteDB.open(config.DATABASE_URL);
};
