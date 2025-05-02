import axios from "axios";

// const {  } = require("@reduxjs/toolkit");
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

const initialState={
    isloading:false,
    productList:[],
    productDetail:null
};
export const fetchAllFilteredProducts=createAsyncThunk(
    "/products/fetchAllProducts",
    async({filterParams , sortParams})=>{
        const query =  new URLSearchParams({
            ...filterParams, sortBy:sortParams
        })
        // console.log(query)
        // console.log(filterParams)
        // console.log(sortParams)
        const result = await axios.get(
            `http://localhost:5000/api/shop/products/get?${query}`
        )
        // console.log(result);
        return result?.data
    }
);
export const fetchProductDetails=createAsyncThunk(
    "/products/productDetail",
    async(id)=>{
        
        const result = await axios.get(
            `http://localhost:5000/api/shop/products/get/${id}`
        )
        return result?.data
    }
);


const shoppingProductSlice= createSlice({
    name:"shoppingProducts",
    initialState,
    reducers:{
        setProductDetail:(state)=>{
            state.productDetail=null
        }
    },
    extraReducers:(builder)=>{
         builder
         .addCase(fetchAllFilteredProducts.pending,(state)=>{
            state.isloading=true
         })
         .addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
            // console.log(action.payload.data);
            
            state.isloading=false,
            state.productList=action.payload.data || []
         })
         .addCase(fetchAllFilteredProducts.rejected,(state)=>{
            state.isloading=false
            state.productList=[]
            console.error("Failed to fetch products:", action.error.message);
         })
         .addCase(fetchProductDetails.pending,(state)=>{
            state.isloading=true
            
         })
         .addCase(fetchProductDetails.fulfilled,(state,action)=>{
            state.isloading=false
            state.productDetail=action.payload.data || null
         })
         .addCase(fetchProductDetails.rejected,(state)=>{
            state.isloading=false
            state.productDetail=null
            console.error("Failed to fetch product details:", action.error.message);
         });
    }
});

export const {setProductDetail}=shoppingProductSlice.actions;
export default shoppingProductSlice.reducer
