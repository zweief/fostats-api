const { User } = require("../models");

module.exports = {
  async index(req, res, next) {
    try {
      const user = await User.findAll();

      if (!user || user === []) {
        throw new Error();
      }

      const userData = user.map(user => user.stripPassword());
      if (!userData || userData === []) {
        throw new Error();
      }

      res.status(200).json(userData);
    } catch (err) {
      err.status = 404;
      err.message = "No user found.";
      next(err);
    }
  },

  async show(req, res, next) {
    try {
      const { user_id } = req.params;

      const user = await User.findById(user_id);
      const userData = user.stripPassword();

      res.status(200).json(userData);
    } catch (err) {
      err.status = 404;
      err.message = "No user found.";
      next(err);
    }
  }
};
