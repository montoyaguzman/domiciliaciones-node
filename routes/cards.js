const express = require("express");
const passport = require("passport");
const CardsService = require("../services/cards");
const { cardsServiceMock } = require("../utils/mocks/cards");

require("../utils/auth/strategies/jwt");

function cardsApi(app) {
  const router = express.Router();
  app.use("/api/cards", router);

  const cardsService = new CardsService();

  router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const serviceResponse = await cardsService.getCards();
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
    async (req, res) => {
      const { cardId } = req.params;
      try {
        const serviceResponse = await cardsService.getCard(cardId);
        res.status(200).json({
          data: serviceResponse,
          message: "Card listed"
        });
      } catch (error) {
        console.log(error);
      }
    }
  );

  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { body: card } = req;

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
