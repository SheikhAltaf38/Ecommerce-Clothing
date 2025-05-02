const express = require("express");
const router = express.Router();

const {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
} = require("../../controller/shop/addressController");

router.post("/add",addAddress)
router.put("/update/:userId/:addressId",updateAddress)
router.get("/get/:userId",getAddress)
router.delete("/delete/:userId/:addressId",deleteAddress)

module.exports = router