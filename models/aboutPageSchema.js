const mongoose = require("mongoose");

const aboutPage = new mongoose.Schema(
  {
    heading: { type: String, require: true },
    description: { type: String, require: true },
    smallHeading: { type: String },
    others: { type: Object },
  },
  {
    timestamps: true,
  }
);

const AboutPage = mongoose.model("AboutPage", aboutPage);

module.exports = AboutPage;
