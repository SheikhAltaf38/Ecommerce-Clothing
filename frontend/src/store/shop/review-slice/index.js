import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  reviews: null,
};

export const addProductReview = createAsyncThunk(
  "/shop/addProductReview",
  async ({ productId, userId, userName, reviewValue, reviewMessage }) => {
    // console.log(productId, userId, userName, reviewValue, reviewMessage);
    const response = await axios.post(
      `http://localhost:5000/api/shop/review/add`,
      { productId, userId, userName, reviewValue, reviewMessage }
    );
    return response?.data;
  }
);
export const getProductReview = createAsyncThunk(
  "/shop/getProductReview",
  async ( productId ) => {
    // console.log(productId);
    const response = await axios.get(
      `http://localhost:5000/api/shop/review/get/${productId}`
    );
    return response?.data;
  }
);
export const deleteProductReview = createAsyncThunk(
  "/shop/deleteProductReview",
  async ({ productId, userId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/review/${userId}/${productId}`
    );
    return response?.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductReview.fulfilled, (state, action) => {
        (state.isLoading = false), (state.reviews = action.payload?.data || []);
      })
      .addCase(addProductReview.rejected, (state) => {
        (state.isLoading = false), (state.reviews = []);
      })
      .addCase(getProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReview.fulfilled, (state, action) => {
        (state.isLoading = false), (state.reviews = action.payload?.data || []);
      })
      .addCase(getProductReview.rejected, (state) => {
        (state.isLoading = false), (state.reviews = []);
      })
      .addCase(deleteProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductReview.fulfilled, (state, action) => {
        (state.isLoading = false),
        state.reviews = state.reviews.filter(
        (review) => review._id !== action.meta.arg.productId
        );
      })
      .addCase(deleteProductReview.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default reviewSlice.reducer