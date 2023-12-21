const managerController = require('../controller/managerController');
const express = require("express");
const router = express.Router();

router.get("/getFullNameByIDManager/:id", managerController.getFullNameByIDManager);

module.exports = router;
