import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  getAllAddress,
  updateAddress,
} from "@/store/shop/address-slice";

import { toast } from "react-toastify";
import { DatabaseBackupIcon } from "lucide-react";
const addressSchema = z.object({
  // userId:z.string(),
  address: z.string().min(1, "Address is required"),
  pincode: z.string().min(4, "pincode is required"),
  phone: z.string().min(10, "phone number is required"),
  city: z.string().min(1, "city is required"),
  notes: z.string().optional().nullable(),
});
const AddressForm = ({ setOpenAddressForm, selectedAddress }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: selectedAddress || {},
  });
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shoppingAddress);
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    if (addressList && addressList.length === 3 && selectedAddress === null) {
      reset();
      return toast.error("You can add only 3 address");
    }
    // console.log(data);
    selectedAddress
      ? dispatch(
          updateAddress({
            formData :data,
            userId: user?.id,
            addressId: selectedAddress._id,
            
          })).then((data)=>{
            if(data?.payload?.success){
              dispatch(getAllAddress(user?.id));
              setOpenAddressForm(false)
              toast.success("Address updated successfully");
            }else{
              toast.error(data?.payload?.message || "failed to update address");
            }
          })
      : dispatch(addNewAddress({ ...data, userId: user?.id })).then((data) => {
          if (data?.payload?.success) {
            dispatch(getAllAddress(user?.id));
            setOpenAddressForm(false);
            toast.success("address added succesfully");
            reset();
          } else {
            toast.error(data?.payload?.message || "failed to add address");
          }
        });
  };
  useEffect(() => {
    // console.log('userId',user?.id)
    dispatch(getAllAddress(user?.id));
  }, [dispatch, user]);
  // useEffect(() => {
  //   if (selectedAddress) {
  //     reset(selectedAddress);
  //   }else{
  //     reset()
  //   }
  // },[selectedAddress,reset])
  return (
    <Card className="w-[150px] sm:w-auto ">
      <CardContent className="p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3 mt-1">
            <div className="flex flex-col ">
              <Label className="text-md font-semibold"> Address</Label>
              <textarea
                className="border-2 rounded-md h-[60px] p-1 border-gray-300 "
                {...register("address")}
                placeholder="enter address"
              />
              {errors.address && (
                <p className="text-red-400">{errors.address.message}</p>
              )}
            </div>
            <div className="flex flex-col ">
              <Label className="text-md font-semibold"> City</Label>
              <input
                className="border-2 border-gray-300 rounded-md py-1 px-2"
                {...register("city")}
                placeholder="enter city"
              />
              {errors.city && (
                <p className="text-red-400">{errors.city.message}</p>
              )}
            </div>
            <div className="flex flex-col ">
              <Label className="text-md font-semibold"> pincode</Label>
              <input
                className="border-2 border-gray-300 rounded-md py-1 px-2"
                {...register("pincode")}
                placeholder="enter pincode"
              />
              {errors.pincode && (
                <p className="text-red-400">{errors.pincode.message}</p>
              )}
            </div>
            <div className="flex flex-col ">
              <Label className="text-md font-semibold"> Number</Label>
              <input
                className="border-2 border-gray-300 rounded-md py-1 px-2"
                {...register("phone")}
                placeholder="enter number"
              />
              {errors.number && (
                <p className="text-red-400">{errors.number.message}</p>
              )}
            </div>
            <div className="flex flex-col ">
              <Label className="text-md font-semibold"> Notes</Label>
              <input
                className="border-2 border-gray-300 rounded-md py-1 px-2"
                {...register("notes")}
                placeholder="enter notes"
              />
              {errors.notes && (
                <p className="text-red-400">{errors.notes.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-pink-200 to-blue-800 hover:scale-105 duration-300 transition-all rounded-lg"
            >
              {selectedAddress !== null ? "Update Address" : "Add Address"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddressForm;
