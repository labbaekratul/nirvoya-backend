const mongoose = require("mongoose");

// Main Category Distinct Data
const distrincMinCateSchema = new mongoose.Schema(
  {
    mainCategoryId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const DistrincMainCate = mongoose.model(
  "DistrincMainCate",
  distrincMinCateSchema
);

//  Category Distinct Data
const distrincCateSchema = new mongoose.Schema(
  {
    categoryId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const DistrincCate = mongoose.model("DistrincCate", distrincCateSchema);

//Sub Category Distinct Data
const distrincSubCateSchema = new mongoose.Schema(
  {
    subCategoryId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const DistrincSubCate = mongoose.model(
  "DistrincSubCate",
  distrincSubCateSchema
);

module.exports = { DistrincMainCate, DistrincCate, DistrincSubCate };
