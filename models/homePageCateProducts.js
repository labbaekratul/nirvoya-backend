const mongoose = require("mongoose");

const homeCateProductSchema = new mongoose.Schema({
  tittle: { type: String, required: true },
  products: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  ],
});

const HomeCateProducts = mongoose.model(
  "HomeCateProduct",
  homeCateProductSchema
);

module.exports = HomeCateProducts;
