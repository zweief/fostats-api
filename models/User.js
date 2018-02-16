const validation = require("../config/userValidation");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
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
  });

  return User;
};
