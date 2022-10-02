const express = require("express");

const response = require("../network/response");
const Store = require("../store/mysql");

const router = express.Router();

const list = async (req, res, next) => {
  try {
    const list = await Store.list(req.params.table);
    response.success(req, res, list, 200);
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const user = await Store.get(req.params.table, req.params.id);
    response.success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
};

const insert = async (req, res, next) => {
  try {
    const user = await Store.insert(req.params.table, req.body);
    response.success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
};

const upsert = async (req, res, next) => {
  try {
    const user = await Store.upsert(req.params.table, req.body);
    response.success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
};

router.get("/:table", list);
router.get("/:table/:id", get);
router.post("/:table", insert);
router.put("/:table", upsert);

module.exports = router;
