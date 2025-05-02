import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState={
    cartItems:[],
    isLoading:false
}
export const addToCart=createAsyncThunk(
    "cart/addToCart",
    async ({userId , productId , quantity})=>{
        console.log(userId , productId , quantity)
        const result = await axios.post(
            "http://localhost:5000/api/shop/cart/add",
            {userId , productId ,quantity}
        );
        console.log(result.data)
       
        return result.data
    }
)
export const fetchCartItems=createAsyncThunk(
    "cart/fetchCartItems",
   
    async (userId)=>{
        console.log(userId)
        const result = await axios.get(
            `http://localhost:5000/api/shop/cart/get/${userId}`         
        );
        console.log(result)
        return result.data
    }
)

export const updateCartQuantity=createAsyncThunk(
    "cart/updateCartQuantity",
    async ({userId , productId , quantity})=>{
        const result = await axios.put(
            "http://localhost:5000/api/shop/cart/update-cart",
            {userId , productId ,quantity}
        );
        return result.data
    }
)
export const deleteCartItem=createAsyncThunk(
    "cart/deleteCartItem",
    async ({userId , productId })=>{
        console.log(userId , productId)
        const result = await axios.delete(
            `http://localhost:5000/api/shop/cart/${userId}/${productId}`,
        );
        return result.data
    }
)

const shoppingCartSlice = createSlice({
    name:"cartSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addToCart.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading=false
            state.cartItems=action.payload?.data || [];
            // console.log(action.payload.data.items)
            // console.log(state.cartItems)
        })
        .addCase(addToCart.rejected,(state)=>{
            state.isLoading=false
            state.cartItems=[]
        })
        .addCase(fetchCartItems.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(fetchCartItems.fulfilled,(state,action)=>{
            state.isLoading=false
            state.cartItems=action.payload?.data || [];
        })
        .addCase(fetchCartItems.rejected,(state)=>{
            state.isLoading=false
            state.cartItems=[]
        })
        .addCase(updateCartQuantity.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateCartQuantity.fulfilled,(state,action)=>{
            state.isLoading=false
            state.cartItems=action.payload?.data || [];
        })
        .addCase(updateCartQuantity.rejected,(state)=>{
            state.isLoading=false
            state.cartItems=[]
        })
        .addCase(deleteCartItem.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteCartItem.fulfilled,(state,action)=>{
            state.isLoading=false
            state.cartItems=action.payload?.data || [];
        })
        .addCase(deleteCartItem.rejected,(state)=>{
            state.isLoading=false
            state.cartItems=[]
        });
    }
});

export default shoppingCartSlice.reducer