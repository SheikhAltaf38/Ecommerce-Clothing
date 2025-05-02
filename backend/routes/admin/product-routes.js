const express = require("express")
const { upload } = require("../../config/cloudinary")
const {handleImageUpload ,addProduct,deleteProduct,fetchAllProducts,editProduct  } = require("../../controller/admin/product-controller")
const router = express.Router()


router.post("/upload-image",upload.single("my_file"),handleImageUpload);
router.post("/add",addProduct)
router.delete("/delete/:id",deleteProduct)
router.get("/get",fetchAllProducts)
router.put("/edit/:id",editProduct)

module.exports=router