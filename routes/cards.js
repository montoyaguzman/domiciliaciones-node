const express = require("express");
const { cardsServiceMock } = require("../utils/mocks/cards");

function cardsApi(app) {
  const router = express.Router();
  app.use("/api/cards", router);

  router.get("/", async (req, res) => {
    try {
      const serviceResponse = await cardsServiceMock.prototype.getCard();
      res.status(200).json({
        data: serviceResponse,
        message: "Card listed"
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/", async (req, res) => {
    try {
      const serviceResponse = await cardsServiceMock.prototype.createCard();
      res.status(201).json({
        data: serviceResponse,
        message: "Card created"
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.put("/", async (req, res) => {
    try {
      const serviceResponse = await cardsServiceMock.prototype.updateCard();
      res.status(201).json({
        data: serviceResponse,
        message: "Card updated"
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.delete("/", async (req, res) => {
    try {
      const serviceResponse = await cardsServiceMock.prototype.deleteCard();
      res.status(200).json({
        data: serviceResponse,
        message: "Card updated"
      });
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = cardsApi;
