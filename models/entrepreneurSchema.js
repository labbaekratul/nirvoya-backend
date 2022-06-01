const mongoose = require("mongoose");

const entrepreneurSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: Object, required: true },
    description: { type: String },
    sellPercentage: { type: String, trim: true, required: true },
    phone: { type: Array, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    merchantType: { type: String, default: "oikko.com.bd" },
    email: { type: String, unique: true }, //require: true
    idtype: { type: String }, //require: true
    idNumber: { type: String, unique: true, trim: true }, //require: true
    nidImgFrontPart: { type: Object },
    nidImgBackPart: { type: Object },
    businessName: { type: String },
    businessRegistrationNumber: { type: String },
    legalForm: { type: String }, //require: true
    address: { type: String }, //require: true
    division: { type: String }, //require: true
    district: { type: String },
    postCode: { type: Number }, //require: true
    bankAccInfo: { type: Object },
    uploadBankDocuments: { type: Object }, //require: true
    metaTitle: { type: String }, //require: true
    focusKeyword: { type: String, trim: true },
    metaDescription: { type: String },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Entrepreneur = mongoose.model("Entrepreneur", entrepreneurSchema);

module.exports = Entrepreneur;
