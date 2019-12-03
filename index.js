const express = require("express");
const cors = require("cors");
const app = express();

//Modules of project
const config = require("./config");
const cardsApi = require("./routes/cards.js");
const usersApi = require("./routes/users.js");
const paymentsApi = require("./routes/payments.js");
const authApi = require("./routes/auth");
const startBatch = require("./utils/batchs/payments");

app.use(express.json());
app.use(cors());
startBatch();

//Routes
authApi(app);
cardsApi(app);
usersApi(app);
paymentsApi(app);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(config.port, () => {
  let mode = config.dev ? "Development" : "Production";
  console.log(`App listening on port ${config.port}! ${mode} mode`);
});
