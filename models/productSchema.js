const mongoose = require("mongoose");

// review Schema for product details
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    emailOrPhone: { type: String, required: true, unique: true },
    image: { type: String },
    uploadedImage: { type: Object },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    like: {
      userLikeId: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    dislike: {
      userDisLikeId: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// QnA Schema for product details
const QnASchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: { type: String, required: true },
    question: { type: String, required: true },
    adminName: { type: String },
    answer: { type: String },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // required: true
    productCode: { type: String, required: true, trim: true },
    mainCategory: [
      {
        mainCategoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
          required: true,
        },
        mainCategoryName: { type: String },
      },
    ],
    category: [
      {
        categoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
        },
        categoryName: { type: String },
      },
    ],
    subCategory: [
      {
        subCategoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
        },
        subCategoryName: { type: String },
      },
    ],
    displayImage: { type: Object, required: true }, // required: true
    productDetailsImgs: { type: Object, required: true }, // required: true
    slug: { type: String, required: true },
    isTranding: { type: Boolean, default: false },
    sellPrice: { type: Number, required: true }, // required: true
    costPrice: { type: Number },
    taxPrice: { type: Number },
    productDisplay: { type: Boolean, default: true }, // required: true
    countInStock: { type: Number, default: 0 },
    color: { type: Object },
    status: {
      type: String,
      enum: ["Processing", "Pendding", "Published"],
      default: "Processing",
      required: true,
    },
    material: { type: String },
    model: { type: String },
    unit: { type: String },
    callForPrice: { type: Boolean, default: false },
    onSale: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    storeOnly: { type: Boolean, default: false },
    requireDocuments: { type: Boolean, default: false },
    size: { type: Object },
    feature: { type: Boolean, default: false },
    weight: { type: String },
    tag: { type: String },
    placeOfOrigin: { type: String, default: "Bangladesh" },
    entrepreneur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entrepreneur",
    },
    rating: { type: Number },
    numReviews: { type: Number },
    reviews: [reviewSchema],
    quesAndAns: [QnASchema],
    warrantyType: { type: String },
    warrantyPeriod: { type: Object },
    warrantyPolicy: { type: String },
    profitMargin: { type: String },
    sellPercentage: { type: Number },
    wishList: {
      userWishlistId: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    discount: { type: Number },
    discountPrice: { type: String },
    discountPeriod: { type: String },
    description: { type: String, required: true }, // required: true
    shortDescription: { type: String },
    shippingAndReturnPolicy: { type: String }, // required: true
    videoUrl: { type: String },
    metaTag: { type: String },
    focusKeyword: { type: String },
    metaDescription: { type: String },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
