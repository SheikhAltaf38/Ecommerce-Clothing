import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Trash, Wrench } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, getAllAddress } from "@/store/shop/address-slice";
import { toast } from "react-toastify";
const AddressCard = ({ address, setSelectedAddress, selectedAddress, setOpenAddressForm ,addressIndex}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  function handleDeleteAddress(getAddressId) {
    dispatch(deleteAddress({ userId: user?.id, addressId: getAddressId })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(getAllAddress(user?.id));
          toast.success("Address Deleted Successfully");
        } else {
          toast.error("Failed to delete address");
        }
      }
    );
  }
  function handleSelectedAddress(getAddress){
    setSelectedAddress(getAddress)
    localStorage.setItem("selectedAddress",JSON.stringify(getAddress))
   
  }
  useEffect(()=>{
        const savedaddress = localStorage.getItem("selectedAddress")
        if(savedaddress){
          setSelectedAddress(JSON.parse(savedaddress))
        } console.log(JSON.parse(savedaddress))
      },[])
  // console.log(address);
 
  return (
    <Card
      className={`mt-4 p-0 hover:scale-105 duration-300 transition-all cursor-pointer ${
        selectedAddress?._id === address?._id
          ? "bg-teal-500 border-2 border-teal-700 text-white"
          : "bg-white"
      }`}
      onClick={() => handleSelectedAddress(address)}
    >
      <CardHeader>
        <CardTitle className="flex justify-between">
          <h1 className="text-xl font-bold">Address {addressIndex + 1}</h1>
          <Button
            className={`text-md font-semibold ${
              selectedAddress === address
                ? "bg-emerald-900 text-white shadow-lg"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            {selectedAddress === address ? "Selected" : "Select"}
          </Button>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between mx-2 text-lg font-semibold">
            <h2>Address </h2>
            <h2>{address.address} </h2>
          </div>
          <div className="flex justify-between mx-2 text-lg font-semibold">
            <h2>pincode </h2>
            <h2>{address.pincode} </h2>
          </div>
          <div className="flex justify-between mx-2 text-lg font-semibold">
            <h2>City </h2>
            <h2>{address.city} </h2>
          </div>
          <div className="flex justify-between mx-2 text-lg font-semibold">
            <h2>Phone </h2>
            <h2>{address.phone} </h2>
          </div>
          <div className="flex justify-between mx-2 text-lg font-semibold flex-wrap">
            <h2>Notes : </h2>
            <h2 className="">{address.notes || "-"} </h2>
          </div>
          <div className="flex justify-between mx-2 text-lg font-semibold">
            <h2>created at : </h2>
            <h2>{address.createdAt.split("T")[0]} </h2>
          </div>
          <div className="flex justify-between mx-2 text-lg font-semibold">
            <Button
              onClick={() => setOpenAddressForm(true)}
              className="mt-4 text-md hover:scale-105 transition-all duration-300 bg-rose-600 text-white hover:bg-rose-700"
            >
              <Wrench size={20}/>
               Edit
            </Button>
            <Button
              onClick={() => handleDeleteAddress(address._id)}
              className="mt-4 text-md hover:scale-105 transition-all duration-300"
            >
              <Trash size={20} /> Delete{" "}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
