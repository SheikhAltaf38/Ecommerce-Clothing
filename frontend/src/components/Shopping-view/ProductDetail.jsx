import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetail } from "@/store/shop/product-slice";
import { Button } from "../ui/button";
import StarComponent from "../common/StarComponent";
import { toast } from "@/hooks/use-toast";
import { addToCart, updateCartQuantity } from "@/store/shop/cart-slice";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Delete, MessageCircle, Trash } from "lucide-react";
import {
  addProductReview,
  getProductReview,
 
} from "@/store/shop/review-slice";
import DeleteReview from "./DeleteReview";

const ProductDetail = ({
  productDetail,
  openProductDetailDialog,
  setOpenProductDetailDialog,
}) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const [reviewValue, setReviewValue] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const [userRated, setUserRated] = useState(false);
  const { reviews } = useSelector((state) => state.shoppingProductReview);
  const [openDeleteReviewDialog, setOpenDeleteReviewDialog] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState(null);
  // console.log(productDetail, "productDetails");
  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, currentReview) => {
          sum + currentReview.reviewValue, 0;
        }) / reviews.length
      : 0;
  function handleOpen() {
    setOpenProductDetailDialog(false);
    dispatch(setProductDetail());
  }
  function handleAddToCart(getCurrentProductId, getTotalStock) {
    // console.log(productDetail)
    // console.log(cartItems)
    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const findCurrentCartItemIndex = getCartItems.findIndex(
        (item) => item.ProductId === getCurrentProductId
      );

      if (findCurrentCartItemIndex > -1) {
        const getQuantityOfCart =
          getCartItems[findCurrentCartItemIndex].quantity;
        if (getQuantityOfCart + 1 > getTotalStock) {
          toast({
            title: `you can ${getQuantityOfCart} items cart of this product`,
            variant: "destructive",
          });
          return;
        }
        dispatch(
          updateCartQuantity({
            userId: user?.id,
            productId: getCurrentProductId,
            quantity: getQuantityOfCart + 1,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            toast({
              title: "product is successfully carted",
            });
          }
        });
        return;
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "product is successfully carted",
        });
      }
    });
  }
  function handleRatingChange(getRatingValue) {
    // console.log(getRatingValue);
    setReviewValue(getRatingValue);
    // setUserRated(true);
  }

  function handleAddToReview() {
    // console.log(productDetails, "productDetails");
    const isUserReviewedAtThisProduct = reviews.some((review)=>
    review.userId === user?.id && review.productId === productDetail._id)
    if( isUserReviewedAtThisProduct){
      setReviewMessage("")
      setReviewValue(0)
      toast({
        title:"You Have already reviewed"
      })
      return
    }
   
    dispatch(
      addProductReview({
        userId: user?.id,
        productId: productDetail?._id,
        userName: user?.userName,
        reviewValue: reviewValue,
        reviewMessage: reviewMessage,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setReviewValue(0);
        setReviewMessage("");
        // setUserRated(true);
        // ab only jab button click nahi hoga jab review add ho jayega}
        toast({
          title: "Review Addedd successfully",
        });
        dispatch(getProductReview(productDetail._id));
      }
    });
  }
  
  useEffect(() => {
    if (productDetail !== null) {
      dispatch(getProductReview(productDetail?._id));
      //  if(reviews){ 
      //  const hasReviewed= Array.isArray(reviews) &&reviews.some((review)=> review.userId === user?.id);
      //  setUserRated(hasReviewed)
      //  }
      // console.log(productDetail);
      // console.log(reviews);
    }
  }, [productDetail,dispatch,reviews,user?.id]);
  // console.log(productDetail);
  return (
    <div>
      <Dialog open={openProductDetailDialog} onOpenChange={handleOpen}>
        <DialogContent
          className=" w-[450px] sm:w-[600px] md:w-[800px] lg:w-[1000px] rounded-lg"
          aria-describedby="dialog-description"
        >
          <div className="flex justify-between gap-2">
            <div className="w-auto h-full">
              <img
                src={productDetail?.image}
                alt={productDetail?.title}
                className="object-cover w-72 sm:w-96 md:w-[500px] lg:w-[700px] h-auto rounded-lg hover:scale-105 transition-all duration-300 "
              />
            </div>
            <div className="w-full">
              <div>
                <DialogTitle className="font-extrabold text-3xl">
                  {productDetail?.title}
                </DialogTitle>
                <DialogDescription className="text-xl">
                  {productDetail?.description}
                </DialogDescription>
              </div>
              <div className="flex justify-between my-2">
                <h1
                  className={`font-bold text-2xl ${
                    productDetail?.salePrice > 0 ? "line-through" : ""
                  }`}
                >
                  ${productDetail?.price}
                </h1>
                {productDetail?.salePrice > 0 ? (
                  <h1 className="font-bold text-2xl">
                    ${productDetail?.salePrice}
                  </h1>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <StarComponent
                    rating={averageReview}
                    //  shyd product average review dena hain yha joh backend se aaega product.averageReview
                  />
                </div>
                <span className="text-muted-foreground">
                  {/* ({ProductDetail?.averageReview.toFixed(2)}) */}
                  {averageReview.toFixed(2)}
                </span>
              </div>
              <div className="my-5 ">
                {productDetail?.totalStock === 0 ? (
                  <Button className="w-full opacity-70 cursor-not-allowed">
                    Out Of Stock
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleAddToCart(
                        productDetail?._id,
                        productDetail?.totalStock
                      )
                    }
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          </div>
          <Separator />
          <div className="overflow-y-auto max-h-[200px] ">
            <h1 className="text-2xl font-bold ml-4  ">Reviews</h1>
            <div className="w-full my-2 mx-2 flex flex-col overflow-y-auto gap-1">
              {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <div className="flex w-full gap-2 relative" key={review._id}>
                    <div className="">
                      <Avatar>
                        <AvatarFallback>
                          <h1>{review?.userName[0]}</h1>
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-xl font-semibold mt-1">
                        {review?.userName}
                      </h1>
                      <div className="flex gap-2">
                        <StarComponent rating={review.reviewValue} />
                      </div>
                      <p className="flex flex-wrap text-lg font-medium mb-1">
                        {review?.reviewMessage}
                      </p>
                      <div className="absolute  top-2 right-3">
                        {user?.id === review.userId ? (
                          <>
                            <Button
                              className="group text-white h-auto w-auto bg-black hover:scale-110 transition-all duration-300 hover:bg-black hover:text-white"
                              variant="outline"
                              size=""
                              onClick={() => {
                                setDeleteReviewId(review._id),
                                  setOpenDeleteReviewDialog(true);
                              }}
                            >
                              <Trash className="group-hover:fill-white transition-colors duration-300" />{" "}
                              <span className="font-medium">Delete</span>
                            </Button>
                            <DeleteReview
                              openDeleteReviewDialog={openDeleteReviewDialog}
                              setOpenDeleteReviewDialog={
                                setOpenDeleteReviewDialog
                              }
                              // deleteReviewId={deleteReviewId} //optimistic ui only
                              productDetail={productDetail}
                              userId= {user?.id}
                            />
                          </>
                        ) : null}
                      </div>
                      <Separator />
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-xl font-bold text-center">
                  No reviews ...
                </h1>
              )}
            </div>
            <Separator />
            <div className="space-y-4 mb-4 mt-2">
              <div className="text-lg font-semibold text-center ">
                We’d love to hear your thoughts. Leave a review!
              </div>
              <div className="flex gap-4 items-center mt-1">
                <h1 className="text-xl font-semibold">Give Rating</h1>
                <div className="gap-2">
                  <StarComponent
                    rating={reviewValue}
                    handleRatingChange={handleRatingChange}
                    userRated={userRated}
                  />{" "}
                </div>
              </div>
              <div className="flex gap-3 items-center ">
                <input
                  name="reviewMessage"
                  value={reviewMessage}
                  onChange={(e) => setReviewMessage(e.target.value)}
                  placeholder="write your review here"
                  className="w-full rounded-lg p-2 mt-1 border border-gray-300 outline-none focus:ring focus:ring-blue-900"
                />
                <Button
                  className={`${
                    reviewMessage?.trim() === "" && reviewValue === 0
                      ? " opacity-70 bg-red-600 cursor-not-allowed"
                      : "bg-green-400 hover:bg-green-500"
                  } transition-all duration-300
                    px-4 py-2 text-white font-bold text-lg hover:scale-110 hover:shadow-lg hover:shadow-green-500/50`}
                  variant="outline"
                  size=""
                  onClick={handleAddToReview}
                  // disabled={userRated || reviewMessage?.trim() === ""}
                  disabled={ reviewMessage?.trim() === ""}
                >
                  <MessageCircle size={50} className="w-20 h-20 fill-white" />
                  <span>submit</span>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetail;
