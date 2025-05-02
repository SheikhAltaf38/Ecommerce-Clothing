import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

function adminProductTile({
  product,
  setOpenCreateProductsDialog,
  handleDelete,
  setFormData,
  setCurrentEditedId,
}) {
  // console.log(product)
  return (
    <Card className="flex flex-col  "
     >
      <CardHeader className=" py-1">
        <div className="flex justify-center text-2xl font-bold">
        <CardTitle>{product.title} </CardTitle>
        </div>     
      </CardHeader>
      <CardContent>
        <div className="w-full relative hover:translate-x-4 transition-all duration-300">
          <img className="h-[260px] w-[300px] rounded-t-lg rounded-r-lg object-cover"
           src={product.image} alt={product.title}/>
        </div>
        <div className="flex justify-between px-2 mt-1 font-bold text-2xl">
          <p className={`${product.price >0?"line-through":""}`}>${product.price}</p>
          <p>${product.salePrice}</p>
        </div>
        <div>
          <h1>Total Stock is <span>
          {product.totalStock > 0 ?
           (<div className="text-xl font-semibold">
            {product.totalStock}
           </div>):(<div className="bg-red-500 px-2 py-1 rounded-r-full rounded-l-md w-[150px] my-1 text-white text-xl font-semibold">
            Out of Stock
            </div>)}</span></h1>
        </div>
      </CardContent>
      <CardFooter className="flex justify-around ">
       <Button onClick={()=>{
        setCurrentEditedId(product?._id)
        setOpenCreateProductsDialog(true)
        setFormData(product)
       }}
       className="hover:scale-110 hover:text-lg transition-all duration-300">
         Edit</Button>
       <Button onClick={()=>{
        handleDelete(product?._id)
       }}
       className="hover:scale-110 hover:text-lg transition-all duration-300">
        Delete</Button>
      </CardFooter>
    </Card>
   
  );
}

export default adminProductTile;
