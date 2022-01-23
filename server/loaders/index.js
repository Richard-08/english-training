const expressLoader = require("./express");
const sqliteLoader = require("./sqlite");
const Logger = require("./logger");

module.exports = async ({ expressApp }) => {
  await sqliteLoader();
  Logger.info("DB loaded and connected");

  await expressLoader({ app: expressApp });
  Logger.info("Express loaded");
};
