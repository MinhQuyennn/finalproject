const customerController = require('../controller/customerController');
const express = require("express");
const router = express.Router();

router.get("/getFullNameByIDCustomer/:id", customerController.getFullNameByIDCustomer);

module.exports = router;
