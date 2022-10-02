const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await Controller.login(username, password);
    response.success(req, res, token, 200);
  } catch (error) {
    response.error(req, res, "Informacion invalida", 400);
  }
};

// Routes
router.post("/login", login);

module.exports = router;
