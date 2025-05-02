const { uploadImageUtil } = require("../../config/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    if(!req.file){
      return res.json({
        success:false ,
        message:"file is not received"
      })
    }
    // const b64 = Buffer.from(req.file.buffer).toString("base64");
    // const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await uploadImageUtil(req.file);
    return res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "error occured in uploading image file",
    });
  }
};
// add a new product
const addProduct = async (req, res) => {
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    averageReview,
  } = req.body;
  console.log(req.body)
  try {
    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });
    await newProduct.save();
    return res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error orccurs",
    });
  }
};
// edit a product
const editProduct = async (req, res) => {
  const { id } = req.params;
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
    averageReview,
  } = req.body;
  try {
    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(400).json({
        success: false,
        message: "product is not exist",
      });
    }
    findProduct.title = title || findProduct.title;
    findProduct.image = image || findProduct.image;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    await findProduct.save();
    return res.status(200).json({
      success: true,
      message: "error orccurs",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error orccurs",
    });
  }
};
// fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    return res.status(200).json({
      success: true,
      data: allProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error orccurs",
    });
  }
};
// delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Product does not exist or deleted",
      });
    }
    return res.status(200).json({
      success: true,
      message: "delted succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error orccurs",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  editProduct,
  deleteProduct,
  fetchAllProducts,
};
