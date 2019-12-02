const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const CardsService = require("../services/cards");
const validationHandler = require("../utils/middleware/validationHanddler");
const { createCardSchema } = require("../utils/schemas/cards");

require("../utils/auth/strategies/jwt");

function cardsApi(app) {
  const router = express.Router();
  app.use("/api/cards", router);

  const cardsService = new CardsService();

  router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { _id: userId } = req.user;

      try {
        const serviceResponse = await cardsService.getCards({
          userId: userId
        });
        res.status(200).json({
          data: serviceResponse,
          message: "Card listed"
        });
      } catch (error) {
        console.log(error);
      }
    }
  );

  router.get(
    "/:cardId",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      const { cardId } = req.params;
      try {
        const serviceResponse = await cardsService.getCard(cardId);

        if (req.user._id.toString() != serviceResponse.userId.toString()) {
          next(boom.unauthorized());
        } else {
          res.status(200).json({
            data: serviceResponse,
            message: "Card listed"
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
    validationHandler(createCardSchema),
    async (req, res) => {
      const { body: card } = req;

      card.userId = req.user._id;

      try {
        const serviceResponse = await cardsService.createCard(card);
        res.status(201).json({
          data: serviceResponse,
          message: "Card created"
        });
      } catch (error) {
        console.log(error);
      }
    }
  );

  router.put(
    "/:cardId",
    passport.authenticate("jwt", { session: false }),
    validationHandler(createCardSchema),
    async (req, res) => {
      const { cardId } = req.params;
      const { body: updatedCard } = req;

      try {
        const serviceResponse = await cardsService.updateCard(
          cardId,
          updatedCard
        );
        res.status(201).json({
          data: serviceResponse,
          message: "Card updated"
        });
      } catch (error) {
        console.log(error);
      }
    }
  );

  router.delete(
    "/:cardId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { cardId } = req.params;

      try {
        const serviceResponse = await cardsService.deleteCard(cardId);
        res.status(200).json({
          data: serviceResponse,
          message: "Card deleted"
        });
      } catch (error) {
        console.log(error);
      }
    }
  );
}

module.exports = cardsApi;
