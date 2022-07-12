const { fatal } = require("../utils");

require("dotenv").config();

const config = {
  port: process.env.PORT || fatal("FATAL: PORT is not defined"),
  dbConfig: process.env.DB_CONFIG || fatal("FATAL: DB_CONFIG is not defined"),
};

module.exports = config;
