import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductsSlice from "./admin/product-slice"
import adminOrderSlice from "./admin/order-slice"
import shoppingProductSlice from "./shop/product-slice"
import shoppingCartSlice from "./shop/cart-slice"
import shoppingProductReviewSlice from './shop/review-slice'
import shoppingAddressSlice from './shop/address-slice'
import shoppingOrderSlice from "./shop/order-slice"
import SearchProductsSlice from "./shop/search-slice"
export const store = configureStore({
    reducer:{
        auth: authReducer,
        adminProducts:adminProductsSlice,
        adminOrders:adminOrderSlice,

        shoppingProducts:shoppingProductSlice,
        shoppingCart :shoppingCartSlice,
        shoppingProductReview:shoppingProductReviewSlice,
        shoppingAddress:shoppingAddressSlice,
        shoppingOrder:shoppingOrderSlice,
        shoppingSearch:SearchProductsSlice
    }
})
export default store