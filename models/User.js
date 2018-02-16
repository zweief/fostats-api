const bcrypt = require("bcryptjs");

const validation = require("../config/userValidation");
const { hashPassword } = require("../utils/utils");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: validation.username
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Looks like there is already an account with this email adress."
        },
        validate: validation.email
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: validation.password
      }
    },
    {
      hooks: {
        beforeSave: hashPassword
      }
    }
  );

  // compare user password and user hash
  User.prototype.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  User.prototype.stripPassword = function() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };

  User.associate = models => {};

  return User;
};
