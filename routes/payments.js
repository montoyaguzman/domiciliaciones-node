const express = require("express");
const { paymentsServiceMock } = require("../utils/mocks/payments");

function paymentsApi(app) {
  const router = express.Router();
  app.use("/api/payments", router);

  router.get("/", async (req, res) => {
    try {
      const serviceResponse = await paymentsServiceMock.prototype.getPayment();
      res.status(201).json({
        data: serviceResponse,
        message: "Payment listed"
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/", async (req, res) => {
    try {
      const serviceResponse = await paymentsServiceMock.prototype.createPayment();
      res.status(201).json({
        data: serviceResponse,
        message: "Payment created"
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.put("/", async (req, res) => {
    try {
      const serviceResponse = await paymentsServiceMock.prototype.updatePayment();
      res.status(200).json({
        data: serviceResponse,
        message: "Payment updated"
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.delete("/", async (req, res) => {
    try {
      const serviceResponse = await paymentsServiceMock.prototype.deletePayment();
      res.status(200).json({
        data: serviceResponse,
        message: "Payment deleted"
      });
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = paymentsApi;
