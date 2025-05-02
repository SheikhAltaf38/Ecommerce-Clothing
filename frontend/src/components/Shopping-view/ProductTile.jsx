import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const ProductTile = ({product , handleProductDetails ,handleAddToCart}) => {
  return (     
        <Card className="w-full max-w-sm mx-auto hover:cursor-pointer hover:scale-105 transition-all duration-300">
          <div  className='p-2 ' onClick={()=>handleProductDetails(product?._id)}>
            {/* image section */}
            <div className="w-full bg-cover h-[200px] sm:h-[300px] rounded-t-lg" style={{backgroundImage:`url(${product.image})`}}>
              
               <div className='flex justify-end'>
               {product.totalStock===0? (
                <Badge className=" bg-red-500 hover:bg-red-600 text-md mt-2 mr-1" >
                  Out of Stock
                </Badge>
               ):product.totalStock < 10 ? (
                <Badge className=" bg-red-500 hover:bg-red-600 text-md mt-2 mr-1">
                  Only {product.totalStock} Items Left
                </Badge>
               ):(product.salePrice >0?(
                <Badge className=" bg-red-500 hover:bg-red-600 text-md mt-2 mr-1">
                   Sale
                </Badge>
               ):(null))}
               </div>
               
            </div>
            <CardContent>
              <h1 className='text-lg font-bold'>{product.title}</h1>
              <div className='flex justify-between '>
                <div className='text-md font-semibold'>
                Category:<span className='text-gray-600'> {product.category}</span>
                </div>
                <div className='text-md font-semibold'>
                Brand:<span className='text-gray-600'> {product.brand}</span>
                </div>
              </div>
              <div className='flex justify-between mt-1'>
                <div className={`${product.salePrice > 0? "line-through":""} 
                text-lg font-semibold`}>
                  <h1>${product.price}</h1>
                </div>
                <div className={`  
                text-lg font-semibold`}>
                  <h1>${product.price}</h1>
                </div>
              </div>             
            </CardContent>
          </div>
          <CardFooter>
            <div className='flex justify-center w-full '>
              {product.totalStock === 0?(
                <Button className="bg-red-500 hover:bg-red-600 cursor-not-allowed hover:scale-110 transition-all duration-300 
                text-md  opacity-70">
                  Out of Stock
                </Button>
              ):(
                <Button className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 hover:scale-110 transition-all duration-300 
                text-md  " onClick={()=>handleAddToCart(product._id,product.totalStock)}>
                Add to Cart
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
  )
}

export default ProductTile
