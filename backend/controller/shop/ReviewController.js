const ProductReview = require("../../models/Review");
const Product = require("../../models/Product");

const addProductReview = async (req, res) => {
  try {
    console.log(req.body);
    const { productId, userId, userName, reviewValue, reviewMessage } =
      req.body;
    if (
      [productId, userId, userName, reviewValue, reviewMessage].some(
        (field) => field === undefined || field === null || field === ""
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "details is invalid",
      });
    }

    const newReview = new ProductReview({
      productId: productId,
      userId: userId,
      userName: userName,
      reviewValue: reviewValue,
      reviewMessage: reviewMessage,
    });
    await newReview.save();

    const reviews = await ProductReview.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      totalReviewsLength > 0
        ? reviews.reduce((sum, currentReview) => 
            sum + currentReview.reviewValue, 0
          ) / totalReviewsLength
        : 0;
    console.log(averageReview);

    await Product.findByIdAndUpdate(productId, {
      averageReview: averageReview,
    });

    return res.status(200).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in adding review",
    });
  }
};
const getProductReview = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(404).json({
        success: false,
        message: "details is invalid",
      });
    }
    const reviews = await ProductReview.find({ productId });
    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in getting review",
    });
  }
};
const deleteProductReview = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "details is invalid",
      });
    }
    const review = await ProductReview.findOne({ userId, productId });
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "review not found to delete",
      });
    }
    await ProductReview.deleteOne({ _id: review._id });
    return res.status(200).json({
      success: true,
      message: "review deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in deleting review",
    });
  }
};

module.exports = { addProductReview, getProductReview, deleteProductReview };
