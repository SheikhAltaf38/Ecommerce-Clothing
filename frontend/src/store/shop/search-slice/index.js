import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    isLoading:false,
    searchResults:[]
}
export const getSearchResults = createAsyncThunk(
    "shop/getSearchResults",
    async(search ,{rejectWithValue})=>{
        try {
            const response = await axios.get(`http://localhost:5000/api/shop/search/${search}`);
            return response.data
        } catch (error) {
           toast.error(error.response?.data?.message || "something went wrong")
           return rejectWithValue(error.response?.data?.message || "something went wrong")
        }
    }
)
const searchSlice = createSlice({
    name:"searchSlice",
    initialState,
    reducers:{ 
        resetSearchResults:(state)=>{
            state.searchResults=[]
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getSearchResults.pending,(state)=>{
            state.isLoading=true;
            state.searchResults=[];
        })
        .addCase(getSearchResults.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.searchResults=action.payload.data || [];
        })
        .addCase(getSearchResults.rejected,(state)=>{
            state.isLoading=false;
            state.searchResults=[];
        })
    }
});
export const {resetSearchResults}= searchSlice.actions
export default searchSlice.reducer