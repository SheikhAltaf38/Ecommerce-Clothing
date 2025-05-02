const express=require("express");
const router= express.Router();
const {fetchAllFilteredProducts,fetchProductDetails}= require("../../controller/shop/product-controller")

router.get("/get",fetchAllFilteredProducts);
router.get("/get/:id",fetchProductDetails);

module.exports=router;
