const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    slug: { type: String, require: true },
    description: { type: String },
    status: { type: Boolean, default: true },
    orderBy: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Size = mongoose.model("Size", sizeSchema);

module.exports = Size;
