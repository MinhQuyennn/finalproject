const AuthController = require('../controller/authenticationController');
const express = require("express");
const router = express.Router();

router.post("/login", AuthController.login);
router.post("/signUp", AuthController.signUp);
router.post('/getPasswordToken', AuthController.requestPasswordReset);
router.post('/reset-password', AuthController.resetPassword);
module.exports = router;