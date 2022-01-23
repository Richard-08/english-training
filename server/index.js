const config = require("./config");
const express = require("express");
const loaders = require("./loaders");
const Logger = require("./loaders/logger");

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app
    .listen(config.PORT, () => {
      Logger.info(`
        ****************************************
        🚀 Server listening on port: ${config.PORT}
        ****************************************
      `);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
