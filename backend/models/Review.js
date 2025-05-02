const mongoose = require("mongoose");

const ProductReviewSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    userId: {type:mongoose.Schema.Types.ObjectId , ref:"User"},
    userName: String,
    reviewValue: Number,
    reviewMessage: String,
  },
  { timestamps: true }
);
const ProductReview = mongoose.model("ProductReview", ProductReviewSchema);
module.exports = ProductReview;
