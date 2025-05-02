import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    
    deleteProductReview,
    getProductReview,
  } from "@/store/shop/review-slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast";


const DeleteReview = ({
  openDeleteReviewDialog,
  setOpenDeleteReviewDialog,
//   deleteReviewId,
   productDetail, userId
}) => {
    const {reviews} = useSelector((state)=>state.shoppingProductReview)
    const dispatch= useDispatch()
    function handleDeleteReview() {
        if(userId && productDetail._id){
            const oldReviews =[...reviews]
            // reviews.filter((review)=>{ review._id !== deleteReviewId})
            const productId = productDetail._id
            dispatch(deleteProductReview({userId ,productId} )).then((data)=>{
               if(data?.payload?.success){
                  dispatch(getProductReview(productId));
                  setOpenDeleteReviewDialog(false)
                  toast({
                    title: 'Review deleted successfully',
                  })
               }else{
                toast({
                    title  :"Review not deleted",
                })
               }
            })
        }else{
            toast({
                title:"user or product is not found"
            })
        }
    }
  return (
    <div>
      <AlertDialog open={openDeleteReviewDialog} onOpenChange={setOpenDeleteReviewDialog}>
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent className="w-[400px] rounded-xl hover:scale-105 hover:shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
               review from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=> setOpenDeleteReviewDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteReview}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteReview;
