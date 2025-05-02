import { createSlice, createAsyncThunk }  from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    isLoading:false,
    productList:[]
}

export const addNewProduct=createAsyncThunk(
    "/admin/addProducts",
    async(formData)=>{     
      const result=  await axios.post("http://localhost:5000/api/admin/products/add",
            formData,
            { headers :{
                "content-type": "application/json"
            }}
        )
        return result?.data
    }
)
export const editProduct=createAsyncThunk(
    "/admin/editProduct",
    async({id,formData})=>{
      const result=  await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`,
            formData,
            { headers :{
                "content-type": "application/json"
            }}
        )
        return result?.data
    }
)
export const deleteProduct=createAsyncThunk(
    "/admin/deleteProduct",
    async(id)=>{
      const result=  await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`,
        )
        return result?.data
    }
)
export const fetchAllProducts=createAsyncThunk(
    "/admin/fetchAllProducts",
    async()=>{
      const result=  await axios.get("http://localhost:5000/api/admin/products/get",
        )
        return result?.data
    }
)
const adminProductsSlice= createSlice({ 
    name:"adminProducts",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllProducts.pending ,(state)=>{
            state.isLoading=true
        })
        .addCase(fetchAllProducts.fulfilled ,(state,action)=>{
            state.isLoading=false,
            state.productList=action.payload.data
        })
        .addCase(fetchAllProducts.rejected, (state,)=>{
            state.isLoading=true,
            state.productList=[]
        })
    }
})

export default adminProductsSlice.reducer