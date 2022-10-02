const express = require("express");
const bodyParser = require("body-parser");
const router = require("./network");

const config = require("../config");

const app = express();

app.use(bodyParser.json());

//Route
app.use("/", router);

app.listen(config.mysqlService.port, () => {
  console.log(
    `Servicio de mysqlService esuchando en el puerto ${config.mysqlService.port}`
  );
});
