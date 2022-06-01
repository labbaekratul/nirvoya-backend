const mongoose = require("mongoose");

// const descriptionSchema = new mongoose.Schema(
//   {
//     userName: { type: String, require: true },
//     userImage: { type: String },
//     userComment: { type: String, required: true },
//     adminComment: { type: String },
//   },
//   {
//     timestamps: true,
//   }
// );

const supportTicketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: { type: String, required: true },
    problemType: { type: String, required: true },
    priority: { type: String, required: true },
    descriptions: [
      {
        userName: { type: String, require: true },
        userImage: { type: String },
        userComment: { type: String, required: true },
        adminName: { type: String },
        adminImage: { type: String },
        adminComment: { type: String },
      },
    ],
    image: { type: Object },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Complete", "Cancel"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Support = mongoose.model("Support", supportTicketSchema);

module.exports = Support;
