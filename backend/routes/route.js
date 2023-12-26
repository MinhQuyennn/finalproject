const express = require("express");
const router = express.Router();
const routeController = require("../controller/route");

router.get("/route", routeController.getAllRoutes);
router.get(
  "/route/:departure_station/:arrival_station/:departure_date",
  routeController.searchStation
);

module.exports = router;
