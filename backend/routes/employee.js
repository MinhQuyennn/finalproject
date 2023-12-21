const employeeController = require('../controller/employeeController');
const express = require("express");
const router = express.Router();

router.get("/getFullNameByIDEmployee/:id", employeeController.getFullNameByIDEmployee);

module.exports = router;
