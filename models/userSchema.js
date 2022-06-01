const mongoose = require("mongoose");

// normal user signIn & register
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, min: 3, max: 20 },
    email: {
      type: String,
      index: true,
      unique: true,
      trim: true,
    },
    phone: { type: String, required: true, unique: true, min: 3, max: 20 },
    password: { type: String, required: true, min: 6, max: 20 },
    image: { type: Object },
    gender: { type: String },
    dateOfBirth: { type: String },
    organization: { type: String },
    occupation: { type: String },
    address: { type: Object },
    role: {
      type: String,
      enum: ["User", "Seller", "Admin"],
      default: "User",
    },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

// Google signIn user login and Register

const googleUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, min: 3, max: 20 },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
    },
    phone: { type: String, min: 3, max: 20 },
    password: { type: String, required: true, min: 6, max: 20 },
    image: { type: Object },
    gender: { type: String },
    dateOfBirth: { type: String },
    organization: { type: String },
    occupation: { type: String },
    address: { type: Object },
    role: {
      type: String,
      enum: ["User", "Seller", "Admin"],
      default: "User",
    },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const GoogleUser = mongoose.model("GoogleUser", googleUserSchema);

// google signIn user login and Register

const facebookUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, min: 3, max: 20 },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
    },
    phone: { type: String, min: 3, max: 20 },
    password: { type: String, required: true, min: 6, max: 20 },
    image: { type: Object },
    gender: { type: String },
    dateOfBirth: { type: String },
    organization: { type: String },
    occupation: { type: String },
    address: { type: Object },
    role: {
      type: String,
      enum: ["User", "Seller", "Admin"],
      default: "User",
    },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const FacebookUser = mongoose.model("FacebookUser", facebookUserSchema);

module.exports = { User, GoogleUser, FacebookUser };
