const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const boom = require("@hapi/boom");

const UserService = require("../../../services/users");
const config = require("../../../config");

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function(tokenPayload, cb) {
      const userService = new UserService();

      try {
        const user = await userService.getUser(tokenPayload.email);
        if (!user) {
          return boom.unauthorized(), false;
        }
        delete user.passport;
        cb(null, { ...user });
      } catch (error) {
        cb(error);
      }
    }
  )
);
