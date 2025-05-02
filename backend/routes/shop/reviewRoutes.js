const express = require("express");
const router = express.Router();
const { addProductReview ,getProductReview,deleteProductReview } = require("../../controller/shop/ReviewController");

router.post("/add",addProductReview)
router.get("/get/:productId",getProductReview)
router.delete("/:userId/:productId",deleteProductReview)

module.exports= router
