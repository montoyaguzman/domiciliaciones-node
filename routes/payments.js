const express = require("express");
const PaymentsService = require("../services/payments");
const { paymentsServiceMock } = require("../utils/mocks/payments");

function paymentsApi(app) {
  const router = express.Router();
  app.use("/api/payments", router);

  const paymentsService = new PaymentsService();

  router.get("/", async (req, res) => {
    try {
      const serviceResponse = await paymentsService.getPayments();
      res.status(201).json({
        data: serviceResponse,
        message: "Payment listed"
      });
    } catch (error) {
      console.log(error);
    }
  });
  router.get("/:paymentId", async (req, res) => {
    const { paymentId } = req.params;
    try {
      const serviceResponse = await paymentsService.getPayment(paymentId);
      res.status(201).json({
        data: serviceResponse,
        message: "Payment listed"
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/", async (req, res) => {
    const { body: payment } = req;
    try {
      const serviceResponse = await paymentsService.createPayment(payment);
      res.status(201).json({
        data: serviceResponse,
        message: "Payment created"
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.put("/:paymentId", async (req, res) => {
    const { paymentId } = req.params;
    const { body: updatedPayment } = req;
    try {
      const serviceResponse = await paymentsService.updatePayment(
        paymentId,
        updatedPayment
      );
      res.status(200).json({
        data: serviceResponse,
        message: "Payment updated"
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.delete("/:paymentId", async (req, res) => {
    const { paymentId } = req.params;
    try {
      const serviceResponse = await paymentsService.deletePayment(paymentId);
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
