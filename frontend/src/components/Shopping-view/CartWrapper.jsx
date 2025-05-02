import React from "react";
import CartItemsContent from "./CartItemsContent";
import { Button } from "../ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { useNavigate } from "react-router-dom";

const CartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price) *
              currentItem.quantity,
          0
        )
      : 0;
  console.log(cartItems.items);
  const navigate = useNavigate();
  return (
    <SheetContent className="w-72 md:w-80 lg:w-full">
      <SheetHeader>
        <SheetTitle className="text-3xl font-extrabold ">Your Carts</SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>
      <div className="h-full overflow-auto">
        {cartItems && cartItems.items && cartItems.items.length > 0
          ? cartItems.items.map((item, index) => (
              <CartItemsContent cartItem={item} key={index} />
            ))
          : null}
        <div className="mt-8">
          <div className="flex justify-between text-lg font-extrabold">
            <span>Total</span>
            <span>${totalCartAmount}</span>
          </div>
        </div>
        <div className="flex justify-center  mt-8 ">
          <div className="mb-10">
            <Button onClick={() => {setOpenCartSheet(false)
              navigate("/shop/checkout")
            }}>CheckOut</Button>
          </div>
        </div>
      </div>
    </SheetContent>
  );
};

export default CartWrapper;
