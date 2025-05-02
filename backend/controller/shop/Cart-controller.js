const Cart = require('../../models/Cart')
const Product = require('../../models/Product')
const mongoose= require('mongoose')
const addToCart = async(req,res)=>{
try {
    const {userId,productId , quantity} = req.body
    // console.log(userId,productId , quantity)
    // console.log(req.body)
    if(!userId || !productId || quantity <= 0){
        console.log("invalid data provided")
       return res.status(400).json({
        success:false,
        message:"inavlid details"
       })
    }
    const product = await Product.findById(productId);
    if(!product){
        return res.status(400).json({
         success:false,
         message:"product is not exist"
        })
    }

    let cart = await Cart.findOne({userId})
    if(!cart){
        cart= new Cart({
            userId , items:[]
        })
    }
    const findCurrentProductIndex= cart.items.findIndex(
        (item)=> item.productId ===productId
    );
    if(findCurrentProductIndex === -1){
        cart.items.push({productId ,quantity})
    }else{
        cart.items[findCurrentProductIndex].quantity += quantity
    }
    await cart.save()
    res.status(200).json(
        {
            success:true,
           data: cart
        }
    )
} catch (error) {
    console.error(error)
    res.status(500).json(
        {
            success:false,
            message:"internal server error"
        }
    )
}
}
const fetchCartItems = async(req,res)=>{
try {
    const {userId} =req.params
    console.log(req.params)
    if(!userId || !mongoose.Types.ObjectId.isValid(userId) ){
       return res.status(404).json(
            {
                success:false,
                message:"user id is mandatory"
            }
        )
    }
    const cart = await Cart.findOne({userId}).populate({
        path:"items.productId",
        select:"image title price salePrice"
    })
    if(!cart){
        return  res.status(404).json(
            {
                success:false,
                message:"cart is not found"
            }
        )
    }
    const validItems = (cart.items || []).filter(
        (productItem)=>productItem.productId );
    if(validItems.length < cart.items.length){
        cart.items = validItems
        await cart.save()
    }

    const populateCartItems = validItems.map((item)=>({
        productId :item.productId?._id,
        quantity :item.quantity,
        title :item.productId?.title,
        image :item.productId?.image,
        price :item.productId?.price,
        salePrice :item.productId?.salePrice,
    }));
    return res.status(200).json(
        {
            success:true,
            data:{
                ...cart._doc,
                items: populateCartItems
            }
        }
    )
} catch (error) {
    console.error(error)
    res.status(500).json(
        {
            success:false,
            message:"internal server error"
        }
    )
}
}
const updateCartItemQty = async(req,res)=>{
try {
    const {productId , userId , quantity}=req.body
    if(!productId || !userId || quantity <= 0){
        return res.status(400).json(
            {
                success:false,
                message:"inavlid details provided"
            }
        )
    }

    const cart = await Cart.findOne({userId})
    if(!cart){
        return res.status(400).json(
            {
                success:false,
                message:"Cart is not present"
            }
        )
    }
    const findProductIndex= cart.items.findIndex(
        (item)=> item.productId.toString() === productId
    );
    if(findProductIndex === -1){
        return res.status(400).json(
            {
                success:false,
                message:"product is not present in your cart"
            }
        )
    }

    cart.items[findProductIndex].quantity = quantity
    await cart.save()

    await cart.populate({
        path:"items.productId",
        select:"title image price salePrice"
    })
    
    const populateCartItems = cart.items.map((item)=>({
        productId :item.productId? item.productId._id :null,
        quantity :item.quantity,
        title :item.productId? item.productId.title :"product is not present",
        image :item.productId? item.productId.image :null,
        price :item.productId? item.productId.price :null,
        salePrice :item.productId? item.productId.salePrice:null,
    }));
    return res.status(200).json({
        success:true,
        data:{
            ...cart._doc,
            items:populateCartItems
        }
    })
} catch (error) {
    console.error(error)
    res.status(500).json(
        {
            success:false,
            message:"internal server error"
        }
    )
}
}
 const deleteCartItem = async(req,res)=>{
try {
    const { userId , productId } = req.params
    console.log(req.params)
    console.log("Request params:", req.params);

    if(!userId || !productId){
        return res.status(400).json({
            success:false,
            message:"invalid details"
        })
    }
    const cart = await Cart.findOne({userId})
    if(!cart){
        return res.status(400).json(
            {
                success:false,
                message:"Cart is not present"
            }
        )
    }

    const findProductIndex= cart.items.findIndex(
        (item)=> item.productId.toString() === productId
    );
    if(findProductIndex === -1){
        return res.status(400).json(
            {
                success:false,
                message:"product is not present in your cart"
            }
        )
    }

    cart.items = cart.items.filter(
        (item)=> item.productId.toString() !== productId
        // (item)=> item.productId._id.toString() !== productId
    )
    await cart.save()
    await cart.populate({
        path:"items.productId",
        select:"title image price salePrice"
    })
    const populateCartItems = cart.items.map((item)=>({
        productId :item.productId? item.productId._id :null,
        quantity :item.quantity,
        title :item.productId? item.productId.title :"product is not present",
        image :item.productId? item.productId.image :null,
        price :item.productId? item.productId.price :null,
        salePrice :item.productId? item.productId.salePrice:null,
    }));
    return res.status(200).json({
        success:true,
        data:{
            ...cart._doc,
            items:populateCartItems
        }
    })

} catch (error) {
    console.error(error)
    res.status(500).json(
        {
            success:false,
            message:"internal server error"
        }
    )
}
};
module.exports={addToCart,fetchCartItems,updateCartItemQty,deleteCartItem}