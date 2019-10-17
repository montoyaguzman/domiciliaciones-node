const express = require("express");

function paymentsApi(app) {
  const router = express.Router();
  app.use("/api/payments", router);

  router.get("/", (req, res) => {
    res.send("Hello GET from /api/payments");
  });

  router.post("/", (req, res) => {
    res.send("Hello POST from /api/payments");
  });

  router.put("/", (req, res) => {
    res.send("Hello PUT from /api/payments");
  });

  router.delete("/", (req, res) => {
    res.send("Hello DELETE from /api/payments");
  });
}

module.exports = paymentsApi;
