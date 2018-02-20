const passport = require("passport");
const { ExtractJwt } = require("passport-jwt");
const JwtStrategy = require("passport-jwt").Strategy;
const { User } = require("./models");
const config = require("./config/config");

options = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.use(
  new JwtStrategy(options, async function(jwtPayload, next) {
    try {
      const user = await User.findOne({
        where: {
          id: jwtPayload.id
        }
      });

      if (!user) {
        return next(err, false);
      }

      return next(null, user);
    } catch (err) {
      return next(err, false);
    }
  })
);

module.exports = null;
