const express = require("express");

function usersApi(app) {
  const router = express.Router();
  app.use("/api/users", router);

  router.get("/sign-in", (req, res) => {
    res.send("Hello GET sign-in from /api/users/sign-in");
  });

  router.post("/sign-up", (req, res) => {
    res.send("Hello POST sign-up from /api/users");
  });

  router.put("/", (req, res) => {
    res.send("Hello PUT sign-in from /api/users");
  });
}

module.exports = usersApi;
