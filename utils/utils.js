const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuidv1 = require("uuid/v1");

const { jwtSecret } = require("../config/config");

const hashPassword = async user => {
  const SALT_FACTOR = 12;
  const { password } = user;

  if (!user.changed("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(SALT_FACTOR);
  const hash = await bcrypt.hash(password, salt);
  return user.setDataValue("password", hash);
};

const jwtSignUser = user => {
  const ONE_DAY = 60 * 60 * 24;
  const jwtid = uuidv1();

  const options = {
    expiresIn: ONE_DAY,
    audience: ["web-frontend"],
    issuer: "auth-backend",
    jwtid: jwtid
  };

  const id = user.id;
  const username = user.username;

  const payload = {
    id,
    username
  };

  return jwt.sign(payload, jwtSecret, options);
};

module.exports = {
  hashPassword,
  jwtSignUser
};
