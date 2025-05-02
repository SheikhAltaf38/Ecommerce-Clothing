const mongoose = require("mongoose");

const OrderSchema= new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId , ref:"User" , required:true},
    cartId: {type:mongoose.Schema.Types.ObjectId , ref:"Cart" , required:true},
    cartItems:[
        {
            productId: {type:mongoose.Schema.Types.ObjectId , ref:"Product" , required:true},
            image:String ,
            title:String ,
            price :Number ,
            quantity : Number,
        },
    ],
    addressInfo:{
        addressId: {type:mongoose.Schema.Types.ObjectId , ref:"Address" , required:true},
        address:String ,
        pincode:Number ,
        phone:Number,
        city: String,
        notes:String,
    },
    orderStatus :{ type:String , enum:["pending ","shipped","delivered","confirmed" , "rejected"] , default:"pending"},
    paymentStatus:{type:String , enum:["pending","paid",'failed'] , default:"pending"},
    paymentMethod:String,
    paymentId :String,
    totalAmount :{type :Number , required:true},
    orderDate : {type:Date ,default:Date.now()},
    orderUpdateDate : Date,
    // payerId:String  only in paypal here no required
});

module.exports = mongoose.model("Order", OrderSchema);