const express = require("express");

function cardsApi(app) {
  const router = express.Router();
  app.use("/api/cards", router);

  router.get("/", (req, res) => {
    res.send("Hello GET from /api/cards");
  });

  router.post("/", (req, res) => {
    res.send("Hello POST from /api/cards");
  });

  router.put("/", (req, res) => {
    res.send("Hello PUT from /api/cards");
  });

  router.delete("/", (req, res) => {
    res.send("Hello DELETE from /api/cards");
  });
}

module.exports = cardsApi;
