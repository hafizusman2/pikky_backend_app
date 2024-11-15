const express = require("express");
const flightController = require("../controllers/flight.controller");
const { protect, authorize } = require("../middlewares/auth");
const router = express.Router();

router.get("/", flightController.getFlightsController);

router.put(
  "/update",
  protect,
  authorize("admin"),
  flightController.updateFlightStatusController
);

module.exports = router;
