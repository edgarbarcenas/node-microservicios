const express = require("express");

const secure = require("./secure");
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

const list = async (req, res, next) => {
  try {
    const list = await Controller.list();
    response.success(req, res, list, 200);
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Controller.get(id);
    response.success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
};

const upsert = async (req, res, next) => {
  try {
    const user = await Controller.upsert(req.body);
    response.success(req, res, user, 201);
  } catch (error) {
    next(err);
  }
};

const follow = async (req, res, next) => {
  try {
    const data = await Controller.follow(req.user.id, req.params.id);
    response.success(req, res, data, 201);
  } catch (error) {
    next(error);
  }
};

const following = async (req, res, next) => {
  try {
    const data = await Controller.following(req.params.id);
    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

// Routes
router.get("/", list);
router.post("/follow/:id", secure("follow"), follow);
router.get("/:id/following", following);
router.get("/:id", get);
router.post("/", upsert);
router.put("/", secure("update"), upsert);

module.exports = router;
