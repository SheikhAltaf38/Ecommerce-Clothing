import React, { useEffect, useState } from "react";
import banner1 from "../../images/banner-1.webp";
import banner2 from "../../images/banner-2.webp";
import banner3 from "../../images/banner-3.webp";
import { Airplay, BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, Heater, Images, MoveLeftIcon, Shirt, ShirtIcon, ShoppingBasket, UmbrellaIcon, WashingMachine, WatchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductTile from "@/components/Shopping-view/ProductTile";
import { toast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems, updateCartQuantity } from "@/store/shop/cart-slice";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/product-slice";
import ProductDetail from "@/components/Shopping-view/ProductDetail";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon},
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banner = [banner1, banner2, banner3];
  const navigate = useNavigate()
  const {productList , productDetail}= useSelector((state)=>state.shoppingProducts)
  const {cartItems} = useSelector((state)=> state.shoppingCart)
  const {user} = useSelector((state)=> state.auth)
  const dispatch = useDispatch()
  const [openDetailsDialog,setOpenDetailsDialog] =useState(false)
  // console.log(productDetail,cartItems)
  function handleNavigateToListing(getCurrentItem , section){
    sessionStorage.removeItem("filters");
    const currentFilter= {
      [section]: [getCurrentItem.id]
    }
    sessionStorage.setItem("filters",JSON.stringify(currentFilter));
    navigate("/shop/listing")
  }
  function handleAddToCart(getCurrentProductId, getTotalStock){
    let getCartItems = cartItems || []
    if(getCartItems.length){
      const findCurrentCartItemIndex = getCartItems.findIndex(
        (item)=> item.productId === getCurrentProductId
      )
      if(findCurrentCartItemIndex > -1){
        const getQuantityOfCart= getCartItems[findCurrentCartItemIndex].quantity
        if(getQuantityOfCart + 1> getTotalStock){
          toast({
            title:`you can cart ${getQuantityOfCart} items of this product`,
            variant : "destructive"
          })
          return
        }
        dispatch(updateCartQuantity({
          userId:user?.id,
          productId:getCurrentProductId,
          quantity:getQuantityOfCart + 1
        })).then((data)=>{
          if(data?.payload?.success){
            toast({
              title:`successfully carted`,
              variant : "outline"
            })
          }
         
        })
        return
      }
    }
    dispatch(addToCart({
      userId:user?.id,
          productId:getCurrentProductId,
          quantity: 1
    })).then((data)=>{
      if(data?.payload?.success){
        toast({
          title:"successfully carted"
        })
      }
    })
  }

  function handleProductDetails(getCurrentProductId){
    dispatch(fetchProductDetails(getCurrentProductId))
  }
  useEffect(()=>{
    if(productDetail !==null) setOpenDetailsDialog(true)
  }),[productDetail]
  
  useEffect(()=>{
    dispatch(fetchAllFilteredProducts({
      filterParams:{},
      sortParams:"price-lowtohigh"
    }))
  },[dispatch])
  useEffect(()=>{
    dispatch(fetchCartItems(user?.id))
  },[dispatch])
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banner.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [banner.length]);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative overflow-hidden h-[600px] w-full">
        {banner.map((item, index) => (
          <img
            src={item}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } object-cover h-full w-full absolute top-0 z-0 mx-auto left-1/2 -translate-x-1/2
             transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline "
          size="icon"
          className="rounded-xl absolute top-1/2 left-4 bg-gray-300 hover:bg-muted-foreground
          -translate-y-1/2 transform"
          onClick={() =>
            setCurrentSlide(
              (prevslide) => (prevslide - 1 + banner.length) % banner.length
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4 " />
        </Button>
        <Button
          variant="outline "
          size="icon"
          className="rounded-xl absolute top-1/2 right-4 bg-gray-300 hover:bg-muted-foreground"
          onClick={() =>
            setCurrentSlide(
              (prevslide) => (prevslide +1) % banner.length
            )
          }
        >
          <ChevronRightIcon className="w-4 h-4 " />
        </Button>
      </div>

      <section className=" bg-gray-200">
        <div className="flex flex-col my-12 mx-4">
           <h1 className="text-3xl font-bold text-center mb-8">Shop By Category</h1>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-auto">
            {categoriesWithIcon.map((categoryItem)=>(
              <Card key={categoryItem.id} className="cursor-pointer p-6 hover:shadow-lg group hover:bg-gray-400 transition-colors duration-300"
              onClick={()=>handleNavigateToListing(categoryItem,"category")}>
                <CardContent className="flex flex-col justify-center items-center h-full">
                  <categoryItem.icon className="w-12 h-12 text-primary group-hover:fill-gray-200 group-hover:scale-110 transition-all duration-300"/>
                  <div className="mt-2 text-xl font-semibold group-hover:scale-110 transition-all duration-300">
                  {categoryItem.label}
                  </div>
                </CardContent>
                
              </Card>
            ))}

           </div>
        </div>
      </section>

      <section className=" bg-gray-200">
        <div className="flex flex-col my-12 mx-4">
           <h1 className="text-3xl font-bold text-center mb-8">Shop By Brand</h1>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mx-auto">
            {brandsWithIcon.map((brandItem)=>(
              <Card className="cursor-pointer p-6 hover:shadow-lg group hover:bg-gray-400 transition-colors duration-300"
              onClick={()=>handleNavigateToListing(brandItem,"brand")}
              key={brandItem.id}>
                <CardContent className="flex flex-col justify-center items-center h-full">
                  <brandItem.icon className="w-12 h-12 text-primary group-hover:fill-gray-200 group-hover:scale-110 transition-all duration-300"/>
                  <div className="mt-2 text-xl font-semibold group-hover:scale-110 transition-all duration-300">
                  {brandItem.label}
                  </div>
                </CardContent>               
              </Card>
            ))}

           </div>
        </div>
      </section>

      <section className="my-12">
        <div className="">
          <h1 className="text-3xl font-extrabold text-center mb-8">Featured Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-2">
            {productList && productList.length>0?
            productList.map((productItem)=>(
              <ProductTile key={productItem._id}
              product={productItem}
              handleProductDetails={handleProductDetails}
              handleAddToCart={handleAddToCart}/>
            ))
          :null}
          </div>
        </div>
      </section>
      <ProductDetail 
      openProductDetailDialog={openDetailsDialog}
      setOpenProductDetailDialog={setOpenDetailsDialog}
      productDetail={productDetail}/>
    </div>
  );
};

export default Home;
