const express = require("express");
const router = express.Router();
const task1Controllers = require("../controllers/task1.controller");

router.get("/food-list", task1Controllers.getTask1);

module.exports = router;
