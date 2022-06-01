const express = require("express");
const {
  createOtpCode,
  allSmsCode,
  verifyOtp,
} = require("../controllers/otpSmsController");
const smsOtpRouter = express.Router();
smsOtpRouter.get("/", allSmsCode);
smsOtpRouter.post("/", createOtpCode);
smsOtpRouter.post("/resetPassword", verifyOtp);

module.exports = smsOtpRouter;
