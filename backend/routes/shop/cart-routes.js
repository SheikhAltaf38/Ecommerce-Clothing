const express = require("express");
const router = express.Router();
const {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteCartItem,
} = require("../../controller/shop/Cart-controller");

router.post("/add",addToCart)
router.put("/update-cart",updateCartItemQty)
router.get("/get/:userId",fetchCartItems)
router.delete("/:userId/:productId",deleteCartItem)

module.exports=router