const mongoose = require("mongoose");

const otpSmsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, expires: "30m", default: Date.now },
});

const OtpSms = mongoose.model("OtpSms", otpSmsSchema);

module.exports = OtpSms;
