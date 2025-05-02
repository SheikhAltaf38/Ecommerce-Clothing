// import { resetOrderDetails } from "@/store/shop/order-slice"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"

export const getAllOrdersOfAllUsers= createAsyncThunk(
    "/admin/getAllOrdersOfAllUsers",
    async({rejectWithValue})=>{
        try { console.log()
            const response = await axios.get(
                "http://localhost:5000/api/admin/order/getallorders"
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "some error occured")
        }
    }
)
export const getOrderDetails= createAsyncThunk(
    "/admin/getOrderDetails",
    async({rejectWithValue})=>{
        try { console.log()
            const response = await axios.get(
                "http://localhost:5000/api/admin/order/getorder"
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "some error occured")
        }
    }
)
export const updateOrderStatus= createAsyncThunk(
    "/admin/updateOrderStatus",
    async({orderId,orderStatus},{rejectWithValue})=>{
        try { console.log()
            const response = await axios.post(
                `http://localhost:5000/api/admin/order/update/${orderId}`,
                orderStatus
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "some error occured")
        }
    }
)

const initialState={
    orderDetail :null,
    allOrdersOfAllUsers :[],
    isLoading:false
}
const adminOrderSlice = createSlice({
    name:"adminOrderSlice",
    initialState,
    reducers:{
        resetOrderDetails:(state)=>{
            state.orderDetail = null
        }
    },
    extraReducers:(builder)=>
        builder
        .addCase(getAllOrdersOfAllUsers.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getAllOrdersOfAllUsers.fulfilled,(state ,action)=>{
            state.isLoading=false;
            state.allOrdersOfAllUsers=action.payload.data;
        })
        .addCase(getAllOrdersOfAllUsers.rejected,(state)=>{
            state.isLoading=false;
            state.allOrdersOfAllUsers=[];
            toast.error(action.payload.message || "")
        })
        .addCase(getOrderDetails.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getOrderDetails.fulfilled,(state ,action)=>{
            state.isLoading=false;
            state.orderDetail=action.payload.data;
        })
        .addCase(getOrderDetails.rejected,(state,action)=>{
            state.isLoading=false;
            state.orderDetail= null
            toast.error(action.payload.message || "")
        })
        .addCase(updateOrderStatus.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateOrderStatus.fulfilled,(state ,action)=>{
            state.isLoading=false;
            state.orderDetail=action.payload.data;
        })
        .addCase(updateOrderStatus.rejected,(state,action)=>{
            state.isLoading=false;
            state.orderDetail=  []
            toast.error(action.payload.message || "some error occured")
        })
})

export const {resetOrderDetails} = adminOrderSlice.actions
export default adminOrderSlice.reducer