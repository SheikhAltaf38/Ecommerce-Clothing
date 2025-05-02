// const razorpay = require("../../config/razorpay");
// const Order = require("../../models/Order");
// const Product = require("../../models/Product");
// const Cart = require("../../models/Cart");
// const dotenv = require("dotenv");

// dotenv.config();
// const createOrder = async (req, res) => {
//   try {
//     console.log(req.body);
//     const {
//       userId,
//       cartId,
//       cartItems,
//       addressInfo,
//       orderStatus,
//       paymentStatus,
//       paymentMethod,
//       totalAmount,
//       orderDate,
//       orderUpdateDate,
//     } = req.body;

//     const options = {
//       amount: totalAmount * 100, //converting to paisa
//       currency: "INR",
//       receipt: `order_rcpt_id_${Date.now()}`,
//       payment_capture: 1,
//     };

//     const order = await razorpay.orders.create(options);
//     if (!order) {
//       return res.status(500).json({
//         success: false,
//         message: "Order not created inside try block",
//       });
//     }

//     const newOrder = new Order({
//       UserId: userId,
//       cartId: cartId,
//       cartItems: cartItems,
//       addressInfo: addressInfo,
//       orderStatus: orderStatus,
//       paymentStatus: paymentStatus,
//       paymentMethod: paymentMethod,
//       totalAmount: totalAmount,
//       orderDate: orderDate,
//       orderUpdateDate: orderUpdateDate,
//       // paymentId: order.id,
//     });
//     await newOrder.save();
//     return res.status(201).json({
//       success: true,
//       orderId: newOrder._id,
//       paymentId: order.id,
//       amount:totalAmount,
//       key:process.env.RAZORPAY_KEY_ID
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Order not created",
//     });
//   }
// };

// const capturePayment = async (req, res) => {
//   try {
//     const { paymentId , orderId} = req.body
//     if(!paymentId , !orderId){
//         return res.status(400).json({
//             success: false,
//             message: "Payment id and order id is required"
//         })
//     }
//     const order = await Order.findById(orderId)
//     if(!order){
//         return res.status(404).json({
//             success: false,
//             message: "Order not found"
//         })
//     }

//     order.orderStatus="confirmed"
//     order.paymentStatus="paid"
//     order.paymentId= paymentId
    

//     for(let item of order.cartItems){
//         const product = await Product.findById(item.productId)
//         if(!product){
//            return res.status(400).json({
//                success:false,
//                message:"Product not found"
//            })
//         }
//         product.totalStock -= item.quantity
//         await product.save()
//     }
     
//     await Cart.findByIdAndDelete(order.cartId)
//     await order.save();
//     return res.status(200).json({
//          success:true ,
//          message:"order confirmed",
//          data:order
//     })

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Order not created",
//     });
//   }
// };
// const getAllOrdersByUser = async (req, res) => {
//   try {
//     console.log(req.params);
//     const { userId}= req.params
//   if(!userId){
//        return res.status(400).json({
//       success: false,
//       message: "user id is required",
//     });
//     }
//     const getAllOrdersByUser = await Order.find({userId: userId}) 

//     if(!getAllOrdersByUser.length){
//       return res.status(404).json({
//         success: false,
//         message: "orders is not found",
//       });
//     }
//      return res.status(200).json({
//         success: true,
//         data:getAllOrdersByUser
//      })

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "internal server error",
//     });
//   }
// };
// const getOrderDetails = async (req, res) => {
//   try {
//     console.log(req.params)
//     const {orderId} = req.params
//     if(orderId){
//       return res.status(400).json({
//         sucess:false,
//         message:"user id is required"
//       })
//     }
//     const order =await Order.findById(orderId)
//     if(!order){
//       return res.status(400).json({
//         success:false,
//         message: " order not found"
//       })
//     }
//     return res.status(200).json({
//       success:true,
//       data:order
//     })
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Order not created",
//     });
//   }
// };

// module.exports = {createOrder ,capturePayment ,getAllOrdersByUser ,getOrderDetails}