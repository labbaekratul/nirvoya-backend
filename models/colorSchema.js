const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
    colorCode: { type: String, trim: true },
    description: { type: String },
    status: { type: Boolean, default: true },
    orderBy: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Color = mongoose.model("Color", colorSchema);

module.exports = Color;
