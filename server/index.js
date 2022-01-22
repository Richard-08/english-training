const config = require("./config");
const express = require("express");
const loaders = require("./loaders");

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app
    .listen(config.PORT, () =>
      console.log(`Server listening on port: ${config.PORT}`)
    )
    .on("error", (err) => {
      console.log(err);
    });
}

startServer();
