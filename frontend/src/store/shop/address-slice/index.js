import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isloading:false,
    addressList:[],
    error:null
} 

export const addNewAddress= createAsyncThunk(
    "address/addNewAddress",
    async(formData,{rejectWithValue})=>{
       try {
         console.log(formData)
       const response=  await axios.post(`http://localhost:5000/api/shop/address/add`,formData);
       return response.data
       } catch (error) {
        return rejectWithValue(error.response?.data?.message || "something went wrong")
       }
    }
)
export const getAllAddress= createAsyncThunk(
    "address/getAllAddress",
    async(userId,{rejectWithValue})=>{
       try {
         console.log(userId)
       const response=  await axios.get(`http://localhost:5000/api/shop/address/get/${userId}`);
       return response.data
       } catch (error) {
        return rejectWithValue(error.response?.data?.message || "something went wrong")
       }
    }
)
export const updateAddress= createAsyncThunk(
    "address/updateAddress",
    async({formData ,userId , addressId},{rejectWithValue})=>{
       try {
         console.log(formData ,userId ,addressId)
       const response=  await axios.put(`http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,formData);
       return response.data
       } catch (error) {
        return rejectWithValue(error.response?.data?.message || "something went wrong")
       }
    }
)
export const deleteAddress= createAsyncThunk(
    "address/deleteAddress",
    async({userId,addressId},{rejectWithValue})=>{
       try {
         console.log(userId ,addressId)
       const response=  await axios.delete(`http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`);
       return response.data
       } catch (error) {
        return rejectWithValue(error.response?.data?.message || "something went wrong")
       }
    }
)

const addressSlice = createSlice({
    name:"addressSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addNewAddress.pending,(state)=>{
            state.isloading=true,
            state.error=null
        })
        .addCase(addNewAddress.fulfilled,(state,action)=>{
            state.isloading=false,
            state.addressList= action.payload.data,
            state.error=null
        })
        .addCase(addNewAddress.rejected,(state,action)=>{
            state.isloading=false,
            state.error=action.payload
        })
        .addCase(getAllAddress.pending,(state)=>{
            state.isloading=true,
            state.error=null
        })
        .addCase(getAllAddress.fulfilled,(state,action)=>{
            state.isloading=false,
            state.addressList= action.payload.data,
            state.error=null
        })
        .addCase(getAllAddress.rejected,(state,action)=>{
            state.isloading=false,
            state.error=action.payload
        })
        .addCase(updateAddress.pending,(state)=>{
            state.isloading=true,
            state.error=null
        })
        .addCase(updateAddress.fulfilled,(state,action)=>{
            state.isloading=false,
            state.addressList= action.payload.data,
            state.error=null
        })
        .addCase(updateAddress.rejected,(state,action)=>{
            state.isloading=false,
            state.error=action.payload
        })
        .addCase(deleteAddress.pending,(state)=>{
            state.isloading=true,
            state.error=null
        })
        .addCase(deleteAddress.fulfilled,(state,action)=>{
            state.isloading=false,
            state.addressList= action.payload.data,
            state.error=null
        })
        .addCase(deleteAddress.rejected,(state,action)=>{
            state.isloading=false,
            state.error=action.payload
        })
    }
})

export default addressSlice.reducer