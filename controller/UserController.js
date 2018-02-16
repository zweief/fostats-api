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
  },

  async destroy(req, res, next) {
    try {
      const { user_id } = req.params;
      const { password } = req.body;

      const confirmUser = await User.findById(user_id);
      const valid = await confirmUser.comparePassword(password);
      if (!valid) throw new Error();

      const user = await User.destroy({
        where: {
          id: confirmUser.id
        }
      });

      res.status(200).json({
        message: "You successfully deleted your account.",
        status: "success"
      });
    } catch (err) {
      err.status = 403;
      err.message =
        "You are not authorized to delete this account. Please enter your password.";
      next(err);
    }
  }
};
