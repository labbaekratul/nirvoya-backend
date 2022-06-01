const mongoose = require("mongoose");

const userSubsSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email: { type: String, required: true, trim: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const UserSub = mongoose.model("UserSub", userSubsSchema);

module.exports = UserSub;
