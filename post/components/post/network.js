const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

const list = (req, res, next) => {
  Controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch(next);
};

router.get("/", list);

module.exports = router;
