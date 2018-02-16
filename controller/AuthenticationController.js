const { User } = require("../models");
const { jwtSignUser } = require("../utils/utils");

module.exports = {
  async register(req, res, next) {
    try {
      const user = await User.create(req.body);

      const token = await jwtSignUser(user);
      const userData = user.stripPassword();

      res.status(201).json({
        user: userData,
        token,
        status: "success"
      });
    } catch (err) {
      err.message = err.errors ? err.errors.map(err => err.message) : "";
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email
        }
      });

      const valid = await user.comparePassword(password);
      if (!valid) throw new Error();

      const token = await jwtSignUser(user);
      const userData = user.stripPassword();

      res.status(200).json({
        user: userData,
        token,
        status: "success"
      });
    } catch (err) {
      err.status = 401;
      err.message = "Incorrect authentication credentials.";
      next(err);
    }
  }
};
