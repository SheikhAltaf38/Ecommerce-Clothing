import ProductDetail from "@/components/Shopping-view/ProductDetail";
import ProductTile from "@/components/Shopping-view/ProductTile";
import { Toast } from "@/components/ui/toast";
import {
  addToCart,
  fetchCartItems,
  updateCartQuantity,
} from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/product-slice";
import { getSearchResults } from "@/store/shop/search-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetSearchResults } from "@/store/shop/search-slice";
const SearchProducts = () => {
  const [search, setSearch] = useState("");
  const { searchResults } = useSelector((state) => state.shoppingSearch);
  const { productDetail } = useSelector((state) => state.shoppingProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();

  function handleProductDetails(productId) {
    dispatch(fetchProductDetails(productId));
  }
  console.log(productDetail);
  function handleAddToCart(getProductId, getTotalStock) {
    let getCartItems = cartItems || [];
    if (getCartItems.length) {
      const findCartItemIndex = getCartItems.findIndex(
        (item) => item.productId === getProductId
      );
      if (findCartItemIndex > -1) {
        const getQuantity = getCartItems[findCartItemIndex].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error("Out of stock");
          return;
        }
        dispatch(
          updateCartQuantity({
            userId: user?.id,
            productId: getProductId,
            quantity: getQuantity + 1,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            toast.success("Product added to cart successfully");
            dispatch(fetchCartItems(user?.id));
          }
        });
        return;
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Product added to cart successfully");
        dispatch(fetchCartItems(user?.id));
      }
    });
  }

  useEffect(() => {
    if (search && search.trim() !== "" && search.trim().length > 0) {
      setTimeout(() => {
        dispatch(getSearchResults(search));
      }, [1000]);
    }
  }, [search]);
  useEffect(() => {
    if (productDetail !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetail]);
  useEffect(() => {
    if (search.trim() === "") {
      dispatch(resetSearchResults());
    }
  }, [search, dispatch]);
  console.log(searchResults);
  return (
    <div className="w-full">
      hey
      <div className="w-full">
        <input
          type="text"
          placeholder="search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-600 focus:bg-gray-800 text-white rounded-3xl shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300 h-10"
        />
      </div>
      <h1 className="text-2xl font-semibold text-center">Searched Products </h1>
      {!searchResults.length > 0 ? (
        <div>
          {" "}
          <h1 className="text-3xl font-bold text-center mt-5">
            No products found
          </h1>
        </div>
      ) : null}
      <div
       
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mx-5"
      >
        {searchResults.map((product, index) => (
          <ProductTile  key={product._id}
            product={product}
            handleProductDetails={handleProductDetails}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <ProductDetail
        productDetail={productDetail}
        openProductDetailDialog={openDetailsDialog}
        setOpenProductDetailDialog={setOpenDetailsDialog}
      />
    </div>
  );
};

export default SearchProducts;
