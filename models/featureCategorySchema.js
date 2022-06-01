const mongoose = require("mongoose");

const featureCatSchema = new mongoose.Schema(
  {
    tittle: { type: String, required: true },
    subTittle: { type: String, required: true },
    featureCategory: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    ],
  },
  {
    timestamps: true,
  }
);

const FeatureCategory = mongoose.model("FeatureCategory", featureCatSchema);

module.exports = FeatureCategory;
