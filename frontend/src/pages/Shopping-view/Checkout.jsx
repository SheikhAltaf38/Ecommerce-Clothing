import React, { useEffect, useState } from "react";
import img1 from "../../images/1.jpg";
import Address from "@/components/Shopping-view/Address";
import CartItemsContent from "@/components/Shopping-view/CartItemsContent";
import { current } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {createOrder , capturePayment } from "@/store/shop/order-slice";
import { toast } from "react-toastify";
import Razorpay from "razorpay"
import { set } from "react-hook-form";
import { Button } from "@/components/ui/button";
const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const { orderId ,orderList , paymentId} = useSelector((state) => state.shoppingOrder);
  // console.log(cartItems);

  const dispatch = useDispatch()
  useEffect(()=>{
    const storedAddress = localStorage.getItem("selectedAddress")
    if(storedAddress){
      setSelectedAddress(JSON.parse(storedAddress))
    }
  },[])
  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce((sum, currentItem) => 
          sum +
            (currentItem.salePrice > 0
              ? currentItem.salePrice
              : currentItem.price) *
              currentItem.quantity,
            0
        )
      : 0;

      function handlePayment(){
        if(cartItems.length ===0){
          return alert("Your cart is empty. Please add items to proceed")
        }
        if(selectedAddress === null){
          return alert("Please select one address to proceed.")
        }
        const order={
          userId:user?.id,
          cartId:cartItems?._id,
          cartItems:cartItems.items.map((item)=>( {
            productId:item?.productId,
            title:item?.title,
            price:item?.salePrice > 0 ? item?.salePrice : item?.price,
            image:item?.image,
            quantity:item?.quantity
          })),
          addressInfo:{
            addressId:selectedAddress?._id,
            address:selectedAddress?.address,
            city:selectedAddress?.city,
            phone:selectedAddress?.phone,
            pincode:selectedAddress?.phone,
            notes:selectedAddress?.notes
          },
          orderStatus:"pending",
          paymentStatus:"pending",
          // paymentId:"",
          totalAmount:totalCartAmount,
          orderDate:new Date().toISOString(),
          orderUpdateDate:new Date().toISOString(),
          paymentMethod:"razorpay"          
        }
        // const order = {
        //   userId: "user_12345",           // Dummy user ID
        //   cartId: "cart_67890",           // Dummy cart ID
        //   cartItems: [
        //     {
        //       productId: "prod_001",      // Dummy product ID
        //       title: "Dummy Product 1",   // Dummy product title
        //       price: 29.99,               // Dummy price
        //       image: "https://via.placeholder.com/150", // Dummy image URL
        //       quantity: 2                 // Dummy quantity
        //     },
        //     {
        //       productId: "prod_002",      // Another dummy product
        //       title: "Dummy Product 2",
        //       price: 49.99,
        //       image: "https://via.placeholder.com/150",
        //       quantity: 1
        //     }
        //   ],
        //   addressInfo: {
        //     addressId: "addr_112233",       // Dummy address ID
        //     address: "123 Dummy Street",    // Dummy address
        //     city: "Faketown",               // Dummy city
        //     phone: "1234567890",            // Dummy phone number
        //     pincode: "54321",               // Dummy pincode (ensure correct key if different)
        //     notes: "Leave package at the door" // Dummy notes
        //   },
        //   orderStatus: "pending",         // Default order status
        //   paymentStatus: "pending",       // Default payment status
        //   totalAmount: 109.97,            // Dummy total amount (e.g., calculated from cart items)
        //   orderDate: new Date("2025-02-07T12:00:00Z").toISOString(),       // Dummy order date
        //   orderUpdateDate: new Date("2025-02-07T12:00:00Z").toISOString(),   // Dummy update date
        //   paymentMethod: "razorpay"       // Default payment method
        // };
        
        console.log(order);
        
        try {
          dispatch(createOrder(order)).then((response)=>{
            if(response.payload.success){
              setIsPaymentStart(true)
              console.log(response.payload ,"create order")
              const {paymentId , amount ,key} = response.payload

              const options={
                key:key,
                amount:amount * 100,
                currency:"INR",
                name:"Sheikh Altaf",
                description:"Test Transaction",
                order_id:paymentId,
                handler:async function (response){
                        console.log(response)
                },
                theme:{color: "#3399cc"}
              }

              const razorpay = new Razorpay(options)
              razorpay.open()
              setIsPaymentStart(false)
            }else{
              toast.error(response.payload.message || "failed to create order")
              setIsPaymentStart(false)
            }
          })
        } catch (error) {
          console.log(error);
          toast.error(error.result?.data?.message || "something went wrong")
        }
      }
  return (
    <div className="flex flex-col">
      <div className="h-[300px] w-full">
        <img src={img1} className="h-full w-full object-cover object-center " />
      </div>
      <div>
        <Address
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
        <div className="max-w-[600px] mx-auto mt-3">
          {cartItems && cartItems.items && cartItems.items.length > 0 ? (
            cartItems.items.map((item) => (
              <CartItemsContent cartItem={item} key={item.productId} />
            ))
          ) : (
            <h1 className="text-center text-lg font-semibold">NO Cart Items</h1>
          )}
        </div>
        <div className="mb-10 max-w-[600px] mx-auto mt-5">
          <div className="flex justify-between text-lg font-semibold">
            <h1 className="text-xl font-semibold">total Amount </h1>
            <h1>${totalCartAmount} </h1>
          </div>
        </div>
        <div>
          <Button onClick={()=>{setIsPaymentStart(true)
            ,handlePayment()
          }} >
             {isPaymentStart ? "processing payment...":"pay now "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
