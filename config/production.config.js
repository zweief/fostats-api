const { resolve } = require("path");

module.exports = {
  port: process.env.PORT || 8080,
  db: {
    name: process.env.DB_NAME || "sqlitedatabase",
    username: process.env.DB_USERNAME || "databseadmin",
    password: process.env.DB_PASSWORD || "sqlite3",
    options: {
      host: process.env.HOST || "localhost",
      dialect: process.env.DIALECT || "sqlite",
      storage: resolve(__dirname, `../db/sqlitedatabase.sqlite`),
      logging: process.env.DB_LOGGING || false
    }
  },
  jwtSecret: process.env.JWT_SECRET || "secret",
  loggerFormat: process.env.LOGGER_FORMAT || "combined"
};
