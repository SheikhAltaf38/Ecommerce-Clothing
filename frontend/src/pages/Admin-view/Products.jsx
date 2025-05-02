import Commonform from "@/components/common/Commonform";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";
import { addProductFormElements } from "@/config";
import ProductImageupload from "@/components/admin-view/imageupload";
import { useDispatch, useSelector } from "react-redux";
import {addNewProduct , editProduct, deleteProduct,fetchAllProducts} from "../../store/admin/product-slice/index";
import { Toast } from "@radix-ui/react-toast";
import AdminProductTile from "@/components/admin-view/Product-tile";
import { toast } from "@/hooks/use-toast";


const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

const Products = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const {productList} = useSelector((state)=> state.adminProducts)
  const [currentEditedId, setCurrentEditedId] = useState(null);
  function onSubmit(event) {
     event.preventDefault();
     console.log(productList);
     
    //  console.log(formData,uploadedImageUrl);
    currentEditedId !== null ?
    dispatch(editProduct({
      id: currentEditedId,formData
    })).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
        setOpenCreateProductsDialog(false)
        // setImageFile(null)
        setCurrentEditedId(null)
        setFormData(initialFormData)
        toast({
          title:"edited Successfully"
        })
      }
    }) :(
    dispatch(addNewProduct({
      ...formData,
    image:uploadedImageUrl}))
    .then((data)=>{
      // console.log(data);
      if(data?.payload?.success){
         dispatch(fetchAllProducts())
         setOpenCreateProductsDialog(false)
         setImageFile(null)
         setFormData(initialFormData)
         toast({
           title:"Product added successfully"
         })       
      }
    }) 
  ) 
  }
  function handleDelete(getCurrentProductId){
    dispatch(deleteProduct(getCurrentProductId))
    .then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
      }
    })
  }
  function isFormValid(){
    return Object.keys(formData)
    .filter((currentKey)=> currentKey !== "averageReview")
    .map((key)=> formData[key] !== "")
    .every((item)=> item);
  }
  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[dispatch])
  return (
    <div className="">
      <div className="flex justify-center w-full">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add Product
        </Button>
      </div>
      <div className="flex gap-4 flex-wrap sm:justify-center lg:justify-start">
        {productList && productList.length> 0 ? 
         productList.map((productItem)=>(
             <AdminProductTile key={ productItem._id}
             product={productItem}
             setOpenCreateProductsDialog={setOpenCreateProductsDialog}
             setFormData={setFormData}
             handleDelete={handleDelete}
             setCurrentEditedId={setCurrentEditedId} />
         )):null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
        }}
        className=""
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              <div
                className="text-2xl font-bold flex w-full justify-center
              bg-gradient-to-r from-purple-300 to-blue-400 rounded-md py-1 "
              >
                Add Product{" "}
              </div>
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <ProductImageupload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={false}
          />
          <Commonform
            formcontrols={addProductFormElements}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            buttonText={"Add product"}
            isBtnDisabled={!isFormValid()}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Products;
