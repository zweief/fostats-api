const fs = require("fs");
const Sequelize = require("sequelize");
const colors = require("colors");
const { resolve } = require("path");

const config = require("../config/config");

const db = {};

const sequelize = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password,
  config.db.options
);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Database connection has been established successfully.".bgGreen
    );
  })
  .catch(err => {
    console.error("Unable to connect to the database:".bgRed, err);
  });

fs
  .readdirSync(__dirname)
  .filter(file => file !== "index.js")
  .forEach(file => {
    const model = sequelize.import(resolve(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

sequelize.sync({ force: true });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
