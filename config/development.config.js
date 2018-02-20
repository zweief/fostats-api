const { resolve } = require("path");

module.exports = {
  port: 8000,
  db: {
    name: "sqlitedatabase_dev",
    username: "databseadmin_dev",
    password: "sqlite3",
    options: {
      host: "localhost",
      dialect: "sqlite",
      storage: resolve(__dirname, `../db/sqlitedatabase_dev.sqlite`)
    }
  },
  jwtSecret: "secret",
  loggerFormat: "dev"
};
