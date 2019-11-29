const express = require("express");
const boom = require("@hapi/boom");
const UsersService = require("../services/users");
const validationHandler = require("../utils/middleware/validationHanddler");
const { createUserSchema } = require("../utils/schemas/users");

function authApi(app) {
  const router = express.Router();
  app.use("/api/auth", router);

  const usersService = new UsersService();

  router.post("/sign-in", async (req, res, next) => {
    const { apiKeyToken } = req.body;
    if (!apiKeyToken) {
      next(boom.unauthorized("apiKeyToken is required"));
    }

    try {
      const serviceResponse = await usersService.getUser();
      res.status(200).json({
        data: serviceResponse,
        message: "User listed"
      });
    } catch (error) {
      console.log(error);
    }
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
