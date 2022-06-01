const mongoose = require("mongoose");

const bannerSchemma = new mongoose.Schema(
  {
    title: { type: String, require: true, trim: true },
    url: { type: String },
    image: { type: Object, require: true },
    orderby: { type: Number, require: true },
    status: { type: String, enum: ["Active", "Deactive"], default: "Active" },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("Banner", bannerSchemma);

module.exports = Banner;
