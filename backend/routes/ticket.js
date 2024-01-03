const express = require("express");
const router = express.Router();
const ticketController = require("../controller/ticket");

router.get(
  "/ticket/:customer_id",
  ticketController.TicketInformationByCustomerID
);
router.post("/ticket", ticketController.createTicketAPI);
router.delete("/ticket/:booking_id", ticketController.deleteTicketByBookingId);

module.exports = router;
