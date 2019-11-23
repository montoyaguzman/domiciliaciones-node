const express = require("express");
const { usersServiceMock } = require("../utils/mocks/users");

function usersApi(app) {
  const router = express.Router();
  app.use("/api/users", router);

  router.get("/sign-in", async (req, res) => {
    try {
      const serviceResponse = await usersServiceMock.prototype.getUser();
      res.status(200).json({
        data: serviceResponse,
        message: "User listed"
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/sign-up", async (req, res) => {
    try {
      const serviceResponse = await usersServiceMock.prototype.createUser();
      res.status(200).json({
        data: serviceResponse,
        message: "User created"
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.put("/", async (req, res) => {
    try {
      const serviceResponse = await usersServiceMock.prototype.updateUser();
      res.status(200).json({
        data: serviceResponse,
        message: "User updated"
      });
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = usersApi;
