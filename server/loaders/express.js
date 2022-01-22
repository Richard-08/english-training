const express = require("express");
const cors = require("cors");
const config = require("../config");
const routes = require("../api");

module.exports = ({ app }) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(config.api.prefix, routes());
};
