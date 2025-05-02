import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import NotFound from "./pages/Notfound/NotFound";
import AdminLayout from "./components/admin-view/Layout";
import AdminDashboard from "./pages/Admin-view/Dashboard";
import AdminFeature from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/Orders";
import AdminProducts from "./pages/admin-view/Products";
import ShopLayout from "./components/shopping-view/Layout";
import ShoppingHome from "./pages/shopping-view/Home";
import ShoppingAccount from "./pages/shopping-view/Account";
import ShoppingCheckout from "./pages/shopping-view/Checkout";
import ShoppingListing from "./pages/shopping-view/Listing";
import SearchProducts from "./pages/shopping-view/SearchProducts";
import Unauthpage from "./pages/unauthpage/unauthpage";
import CheckAuth from "./components/common/CheckAuth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "@/store/authSlice/index";
import { Skeleton } from "./components/ui/skeleton";
import { ToastContainer } from "react-toastify";
function App() {
  const { user, isAuthenticated, isloading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isloading) return <Skeleton />;

  // const isAuthenticated = false
  // const user = {
  //   role:"admin"
  // }
  return (
    <>
      <ToastContainer position="top-center" autoClose="3000" />
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeature />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="Products" element={<AdminProducts />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShopLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="Account" element={<ShoppingAccount />} />
          <Route path="Checkout" element={<ShoppingCheckout />} />
          <Route path="Listing" element={<ShoppingListing />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        <Route path="/unauth-page" element={<Unauthpage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
