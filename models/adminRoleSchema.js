const mongoose = require("mongoose");

adminRoleSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    password: { type: String, required: true },
    image: { type: Object },
    address: { type: String },
    position: { type: String },
    company: { type: String, default: "oikko foundation" },
    isAdmin: { type: Boolean, default: true },
    role: {
      type: String,
      enum: [
        "EC Members",
        "Super Admin",
        "Admin",
        "Sales Staff",
        "Inventory Manager",
        "POS Manager",
        "Editor",
        "Author",
        "Contributor",
        "Subcriber",
      ],
      default: "Super admin",
    },
  },
  {
    timestamps: true,
  }
);

const AdminRole = mongoose.model("AdminRole", adminRoleSchema);

module.exports = AdminRole;
