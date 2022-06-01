const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, trim: true },
    orderItems: [
      {
        name: { type: String, required: true },
        productCode: { type: String, required: true },
        displayImage: { type: Object, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
        discount: { type: Number },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      alternativePhone: { type: String },
      email: { type: String },
      address: { type: String, required: true },
      country: { type: String },
      cityName: { type: String },
      areaName: { type: String },
      zoneName: { type: String },
      postalCode: { type: String },
      customerNote: { type: String },
      deliveryArea: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true },
    subTotal: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number },
    grandTotal: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    isPaid: { type: Boolean, default: false },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Picked",
        "Canceled",
        "Delayed",
        "Delivered",
      ],
      default: "Pending",
      required: true,
    },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
