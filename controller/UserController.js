const { User } = require("../models");

module.exports = {
  async index(req, res, next) {
    try {
      const user = await User.findAll();
      const userData = user.map(user => user.stripPassword());

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
      const responseData = user.stripPassword();

      res.status(200).json(responseData);
    } catch (err) {
      err.status = 404;
      err.message = "No user found.";
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { user_id } = req.params;
      let data = req.body;
      let changePassword;
      let fields = [];

      if (data.password && !data.newPassword) throw new Error("form-error");
      changePassword = data.password && data.newPassword ? true : false;

      const user = await User.findById(user_id);

      if (changePassword) {
        const valid = await user.comparePassword(data.password);

        if (!valid) throw new Error("auth-error");

        data.password = data.newPassword;
        delete data.newPassword;
      }

      for (let prop in data) {
        fields.push(prop);
      }
      const userUpdated = await user.update(data, {
        fields: fields,
        hooks: true
      });
      if (!userUpdated) throw new Error("update-error");

      const responseData = userUpdated.stripPassword(userUpdated);

      res.status(200).json(responseData);
    } catch (err) {
      if (err.message === "form-error") {
        err.status = 400;
        err.message = "Please enter a new password.";
      }
      if (err.message === "auth-error") {
        err.status = 403;
        err.message = "Please enter the corect password.";
      }
      if (err.message === "update-error") {
        err.message = "Could not update User.";
      }
      next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const { user_id } = req.params;
      const { password } = req.body;

      const user = await User.findById(user_id);
      const valid = await user.comparePassword(password);
      if (!valid) throw new Error();

      await User.destroy({
        where: {
          id: user.id
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
