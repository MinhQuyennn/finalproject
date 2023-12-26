// Updated backend code

const express = require("express");
const router = express.Router();
const carriagesController = require("../controller/carriages");

router.get("/carriage/:train_id", carriagesController.getAllCarriages);
router.get("/carriage/:train_id/:carriage_id", carriagesController.getAllSeats);

module.exports = router;
