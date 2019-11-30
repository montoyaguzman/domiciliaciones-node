const express = require("express");
const UsersService = require("../services/users");
const { usersServiceMock } = require("../utils/mocks/users");

function usersApi(app) {
  const router = express.Router();
  app.use("/api/users", router);

  const usersService = new UsersService();

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
  router.get("/", async (req, res) => {
    try {
      const serviceResponse = await usersService.getUsers();
      res.status(200).json({
        data: serviceResponse,
        message: "Users Listed"
      });
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = usersApi;
