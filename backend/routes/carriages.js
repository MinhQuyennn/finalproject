const express = require("express");
const carriagesController = require("../controller/carriages");

const router = express.Router();

// Route to get all carriages for a specific train
router.get("/carriage/:train_id", carriagesController.getAllCarriages);

// Route to get all seats for a specific carriage and process seat status based on ticket status
router.get(
  "/carriage/:train_id/:carriage_id/:route_id",
  carriagesController.getAllSeatsForCarriage
);

module.exports = router;
