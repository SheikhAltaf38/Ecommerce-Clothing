const express= require("express")
const router = express.Router()
const {getAllOrdersOfAllUsers ,getOrderDetailsForAdmin ,updateOrderStatus} = require("../../controller/admin/order-controller")

router.get("/getallorders",getAllOrdersOfAllUsers)
router.get("/getorder",getOrderDetailsForAdmin)
router.post("/update/:orderId",updateOrderStatus)

module.exports = router