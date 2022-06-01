const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, require: true, trim: true },
    image: { type: Object },
    slug: { type: String, require: true, unique: true },
    type: { type: String },
    parentId: { type: String },
    parentName: { type: String },
    description: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
