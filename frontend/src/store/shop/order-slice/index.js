import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "shop/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      console.log(orderData);

      const result = await axios.post(
        "http://localhost:5000/api/shop/order/create",
        orderData
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "something went wrong"
      );
    }
  }
);

export const capturePayment = createAsyncThunk(
  "shop/capturePayment",
  async ({ orderId, paymentId }, { rejectWithValue }) => {
    try {
      console.log(orderId, paymentId);
      const result = await axios.post(
        "http://localhost:5000/api/shop/order/capture",
        { paymentId, orderId }
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "something went wrong"
      );
    }
  }
);
export const getAllOrdersByUser = createAsyncThunk(
  "shop/getAllOrdersByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `http://localhost:5000/api/shop/order/list/${userId}`
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "something went wrong"
      );
    }
  }
);
export const getOrderDetails = createAsyncThunk(
  "shop/getOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `http://localhost:5000/api/shop/order/details/${orderId}`
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "something went wrong"
      );
    }
  }
);

const initialState = {
  orderDetails: null,
  orderList: [],
  orderId: "",
  paymentId: "",
  isLoading: false,
};
const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId;
        state.paymentId = action.payload.paymentId;
        sessionStorage.setItem(
          "orderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderId = "";
        state.paymentId = "";
      })

      .addCase(getAllOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUser.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});
export const { resetOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
