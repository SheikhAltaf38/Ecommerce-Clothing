import Filter from "@/components/Shopping-view/Filter";
import ShoppingProductTile from "@/components/Shopping-view/ProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/product-slice";
import ProductDetail from "@/components/Shopping-view/ProductDetail";
import { data, useNavigate, useSearchParams } from "react-router-dom";
import { addToCart, fetchCartItems , updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";


function createSearchParamsHelper(filterParams) {
  const params = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      params.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  // console.log(params,"params")
  return params.join("&");
}
const Listing = () => {
  const [filters, setFilters] = useState();
  const [sort, setSort] = useState(null);
  const { productList, productDetail } = useSelector(
    (state) => state.shoppingProducts
  );
  const [openProductDetailDialog, setOpenProductDetailDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [product,setProduct] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(productList);
  // console.log(productDetail);
  const categorySearchParam = searchParams.get("category");
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  // console.log(user)
  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      cpyFilters = { ...cpyFilters, [getSectionId]: [getCurrentOption] };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentOption);
      } else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    console.log(cartItems,"cartitems")
    // console.log(cartItems.items,"cartitems")
    const getCartItems = cartItems || [];
    if (getCartItems.length) {
      const findProductIndex = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (findProductIndex > -1) {
        const findQuantity = getCartItems[findProductIndex].quantity;
        // console.log(getTotalStock,findQuantity," total stock and quantity ")
        if (findQuantity + 1 > getTotalStock) {
          toast({
            title: `you can only ${findQuantity} cart of this product`,
            variant: "destructive",
          });
          return;
        }
        dispatch(updateCartQuantity({
          userId:user?.id,
          productId: getCurrentProductId,
          quantity: findQuantity + 1
        }))
        return
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      console.log(data);
      console.log(user.id);
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "product is successfully cart",
          variant: "outline",
        });
      }
    });
  }

  function handleSort(value) {
    setSort(value);
  }
  function handleProductDetails(id) {
    dispatch(fetchProductDetails(id));
    // setProduct(productList.find((product => product._id === getCurrentProductId)))
    // navigate(`/shop/products/get/${getCurrentProductId}`)
  }
  useEffect(() => {
    if (filters !== null && sort !== null) {
      // console.log(filters,sort ,"filters and sort");

      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [filters, sort, dispatch]);
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);
  // useEffect(()=>{
  //   if(product!==null) setOpenProductDetailDialog(true)
  // },[product])
  useEffect(() => {
    if (productDetail !== null) setOpenProductDetailDialog(true);
  }, [productDetail]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(()=>{
    dispatch(fetchCartItems(user?.id))
  },[dispatch])
  return (
    <div className="flex ">
      <div className=" border-r h-screen ">
        <Filter filters={filters} handleFilter={handleFilter} />
      </div>
      <div className="flex flex-col w-full bg-background ">
        <div className="flex items-center justify-between flex-wrap">
          <h1 className="text-lg font-semibold">All Products</h1>
          <div className=" hover:bg-muted flex gap-1 items-center">
            <h1 className="text-lg font bold">{productList.length}</h1>
            <span className="text-md font-medium">Products</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="">
                <ArrowUpDownIcon className="h-4 w-3" />
                <span className="text-md">sort by</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                {sortOptions.map((sortItem) => (
                  <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
                    {sortItem.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* products */}
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start p-4 mx-auto md:mx-0 ">
          {productList && productList.length > 0
            ? productList.map((product) => (
                <ShoppingProductTile
                  key={product._id}
                  product={product}
                  handleProductDetails={handleProductDetails}
                  handleAddToCart={handleAddToCart}
                />
              ))
            : null}
        </div>
      </div>

      <ProductDetail
        productDetail={productDetail}
        openProductDetailDialog={openProductDetailDialog}
        setOpenProductDetailDialog={setOpenProductDetailDialog}
      />
    </div>
  );
};

export default Listing;
