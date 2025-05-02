const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    address: String,
    pincode: String,
    city: String,
    phone: String,
    notes: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Address", addressSchema);
