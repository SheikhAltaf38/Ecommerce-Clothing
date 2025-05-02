const express = require("express");
const router = express.Router();
const  {searchProducts}  = require("../../controller/shop/searchController");

router.get("/:search",searchProducts);

module.exports=router;