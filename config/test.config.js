const { resolve } = require("path");

module.exports = {
  port: 8100,
  db: {
    name: "sqlitedatabase_test",
    username: "databseadmin_test",
    password: "sqlite3_test",
    options: {
      host: "localhost",
      dialect: "sqlite",
      storage: resolve(__dirname, `../db/sqlitedatabase_test.sqlite`),
      logging: false
    }
  },
  jwtSecret: "secret"
};
