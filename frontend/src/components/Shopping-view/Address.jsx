import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import{ getAllAddress} from "@/store/shop/address-slice";
const Address = () => {
  const { addressList } = useSelector((state) => state.shoppingAddress);
  const [openAddressForm, setOpenAddressForm] = useState(false);
  const [selectedAddress ,setSelectedAddress] =useState(null)
  // console.log(addressList ," addressList")
  const dispatch = useDispatch();
  const {user}= useSelector((state)=>state.auth)
 useEffect(()=>{
     dispatch(getAllAddress(user?.id));
   },[dispatch, user])
  useEffect(()=>{
      const savedaddress = localStorage.getItem("selectedAddress")
      if(savedaddress){
        setSelectedAddress(JSON.parse(savedaddress))
      } console.log(JSON.parse(savedaddress))
    },[])
  return (
    <div className="flex flex-col px-2 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
      {/* <div className="flex justify-around flex-wrap gap-4  "> */}
        {addressList && addressList.length > 0 ? (
        addressList.map((address ,index) => <AddressCard address={address} setSelectedAddress={setSelectedAddress} selectedAddress={selectedAddress} setOpenAddressForm={setOpenAddressForm} key={address._id} addressIndex={index}/>)
        ) : (
          <div>No Address Found... Add address</div>
        )}
      </div>
      <div className="my-4 mt-7 flex justify-center ">
        <Dialog open={openAddressForm} onOpenChange={setOpenAddressForm}>
          <DialogTrigger asChild>
            <Button onClick={()=>setOpenAddressForm(true)} className="text-md w-[200px] rounded-lg bg-gradient-to-r from-transparent to-green-500 hover:scale-105 duration-300 transition-all">
              {selectedAddress !== null ? "Edit Address" : "Add Address"} </Button>
          </DialogTrigger>
          <DialogContent className="w-[200px] sm:w-[300px] md:w-[500px] lg:w-[700px] rounded-lg hover:shadow-xl p-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center">
                Address
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            {/* form */}
            <AddressForm selectedAddress={selectedAddress} setOpenAddressForm={setOpenAddressForm} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Address;
