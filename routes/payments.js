const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");

const validationHandler = require("../utils/middleware/validationHanddler");
const { paymentsCardSchema } = require("../utils/schemas/payments");
const PaymentsService = require("../services/payments");

require("../utils/auth/strategies/jwt");

function paymentsApi(app) {
  const router = express.Router();
  app.use("/api/payments", router);

  const paymentsService = new PaymentsService();

  router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { _id: userId } = req.user;

      try {
        const serviceResponse = await paymentsService.getPayments({
          userId: userId
        });
        res.status(200).json({
          data: serviceResponse,
          message: "Payment listed"
        });
      } catch (error) {
        console.log(error);
      }
    }
  );
  router.get(
    "/:paymentId",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      const { paymentId } = req.params;
      try {
        const serviceResponse = await paymentsService.getPayment(paymentId);

        if (req.user._id.toString() != serviceResponse.userId.toString()) {
          next(boom.unauthorized());
        } else {
          res.status(201).json({
            data: serviceResponse,
            message: "Payment listed"
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    validationHandler(paymentsCardSchema),
    async (req, res) => {
      const { body: payment } = req;
      const { _id: userId } = req.user;
      payment.userId = userId;
      try {
        const serviceResponse = await paymentsService.createPayment(payment);
        res.status(201).json({
          data: serviceResponse,
          message: "Payment created"
        });
      } catch (error) {
        console.log(error);
      }
    }
  );

  router.put(
    "/:paymentId",
    passport.authenticate("jwt", { session: false }),
    validationHandler(paymentsCardSchema),
    async (req, res) => {
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
    }
  );

  router.delete(
    "/:paymentId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
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
    }
  );
}

module.exports = paymentsApi;
