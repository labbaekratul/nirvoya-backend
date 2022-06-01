const OtpSms = require("../models/otpSmsSchema");
const expressAsyncHandler = require("express-async-handler");

//Create otp sms
exports.createOtpCode = expressAsyncHandler(async (req, res) => {
  const smsCode = new OtpSms({
    userId: req.body.userId,
    token: req.body.token,
  });
  const createdSmsCode = await smsCode.save();
  res.send({ message: "New color Created", SmsCode: createdSmsCode });
});

// Get all data
exports.allSmsCode = expressAsyncHandler(async (req, res) => {
  const smsCode = await OtpSms.find({});
  res.send(smsCode);
});

// Verify OTP
exports.verifyOtp = expressAsyncHandler(async (req, res) => {
  const otpVerify = await OtpSms.findOne({
    $or: [{ token: req.body.token }, { userId: req.body.userId }],
  });
  if (otpVerify) {
    res.send({ user: otpVerify.userId });
  }
});
