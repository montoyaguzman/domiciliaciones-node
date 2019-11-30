const express = require("express");
const boom = require("@hapi/boom");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/index");
const UsersService = require("../services/users");
const validationHandler = require("../utils/middleware/validationHanddler");
const { createUserSchema } = require("../utils/schemas/users");

//Basic
require("../utils/auth/strategies/basic");

function authApi(app) {
  const router = express.Router();
  app.use("/api/auth", router);

  const usersService = new UsersService();

  router.post("/sign-in", async (req, res, next) => {
    const { apiKeyToken } = req.body;
    if (!apiKeyToken) {
      next(boom.unauthorized("apiKeyToken is required"));
    }

    passport.authenticate("basic", function(error, user) {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }

        req.login(user, { session: false }, async function(error) {
          if (error) {
            next(error);
          }

          // const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

          // if (!apiKey) {
          //   next(boom.unauthorized());
          // }

          const { _id: id, name, email } = user;
          const payload = {
            sub: id,
            name,
            email
            // scopes: apiKey.scopes
          };

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: "15m"
          });

          res.status(200).json({ token, user: { id, name, email } });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post(
    "/sign-up",
    validationHandler(createUserSchema),
    async (req, res, next) => {
      const { body: user } = req;
      try {
        const serviceResponse = await usersService.createUser(user);
        res.status(200).json({
          data: serviceResponse,
          message: "User created"
        });
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  );
}

module.exports = authApi;
