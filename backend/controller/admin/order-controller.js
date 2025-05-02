const Order = require("../../models/Order");
const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "orders not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return res.status(404).json({
        success: false,
        message: "order id is required",
      });
    }
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "order is not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    if (!orderId) {
      return res.status(404).json({
        success: false,
        message: "order id is required",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "order is not found",
      });
    }

    const updateOrderStatus = await Order.findByIdAndUpdate(orderId, {
      orderStatus,
    });

    if (!updateOrderStatus) {
      return res.status(400).json({
        success: false,
        message: "order is not updated",
      });
    }

    return res.status(200).json({
      success: true,
      message: "order is successfully updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};
