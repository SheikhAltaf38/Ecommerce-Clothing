const { z } = require("zod");
const Address = require("../../models/address");
const addressSchema = z.object({
  // userId: z.string(),
  address: z.string().min(1, "Address is required"),
  pincode: z.string().min(4, "pincode is required"),
  city: z.string().min(1, "city is required"),
  phone: z.string().min(10, "phone number is required"),
  notes: z.string().optional().nullable(),
});

const cleanValue = (data) => {
  return Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== null)
  );
};
const addAddress = async (req, res) => {
  try {
    const parsedAddress = addressSchema.safeParse(req.body);
    if (!parsedAddress.success) {
     return res.status(400).json({
        success: false,
        message: parsedAddress.error.errors.map((err) => err.message).join(","),
      });
    }
    // it cleans null value data
    const cleanAddress = cleanValue(parsedAddress.data);
    const newlyCreatedAddress = new Address(cleanAddress);
    await newlyCreatedAddress.save();
    return res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
const getAddress = async (req, res) => {
  try {
    const userId= req.params.userId.trim()
    // console.log(req.params ,"get address")
    // console.log(userId ,"address user id")
    if(!userId ){
     return res.status(400).json({
        success: false,
        message: "userid is required",
      });
    }
    const addressList =await Address.find({userId})
    return res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
const updateAddress = async (req, res) => {
  try {

    const { userId, addressId } = req.params;
    // console.log( userId, addressId , "req.body" , req.body)
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "invalid userid or address",
      });
    }
    const parsedAddress = addressSchema.safeParse(req.body);
    if (!parsedAddress.success) {
      return res.status(400).json({
        success: false,
        message: parsedAddress.error.errors.map((err) => err.message).join(","),
      });
    }

    const cleanAddress = cleanValue(parsedAddress.data);
    const updateAddress = await Address.findByIdAndUpdate(
      {   _id: addressId ,userId },
      cleanAddress,
      { new: true }
    );
    if (!updateAddress) {
      return res.status(400).json({
        success: false,
        message: "address is not updated",
      });
    }
    return res.status(200).json({
      success: true,
      data: updateAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const {userId, addressId}= req.params
    if(!userId || !addressId){
      return res.status(400).json({
        success: false,
        message: "invalid userid or address",
      });
    }
    const deleteAddress = await Address.findOneAndDelete({_id:addressId ,userId})
    if(!deleteAddress){
      return res.status(400).json({
        success: false,
        message: "address not deleted",
      })
    }
    return res.status(200).json({
      success: true,
      message:"address deleted successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports = { addAddress, getAddress, updateAddress, deleteAddress };
