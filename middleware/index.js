const passport = require("passport");

const isAuthenticated = (req, res, next) => {
  passport.authenticate("jwt", function(err, user) {
    if (err || !user) {
      const err = new Error();
      err.status = 403;
      err.message = "You have no access to this resource. Please login.";
      next(err);
    }

    const paramId = parseInt(req.params.user_id);

    if (user.id !== paramId) {
      const err = new Error();
      err.status = 403;
      err.message = "You have no access to this resource. Please login.";
      next(err);
    }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = {
  isAuthenticated
};
