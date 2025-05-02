import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, fetchCartItems, updateCartQuantity } from '@/store/shop/cart-slice'
import { toast } from '@/hooks/use-toast'
const CartItemsContent = ({cartItem}) => {
  const{ user} = useSelector((state)=> state.auth)
  const{ cartItems} = useSelector((state)=> state.shoppingCart)
  const{ productList} = useSelector((state)=> state.shoppingProducts)
  const dispatch= useDispatch()
  // console.log(user)
  function handleUpdateQuantity(getCartItem,typeOfAction){
     if(typeOfAction==="plus"){
      let getCartItems = cartItems.items || []
      if(getCartItems.length){
        const findCurrentCartItemIndex = getCartItems.findIndex(
          (item)=> item.productId === getCartItem.productId
        )
        const indexOfCurrentProduct = productList.findIndex(
          (product)=> product._id === getCartItem.productId
        )
        const totalStockOfProduct = productList[indexOfCurrentProduct].totalStock
        if(findCurrentCartItemIndex > -1){
          const getQuantity = getCartItems[findCurrentCartItemIndex].quantity
          console.log(totalStockOfProduct,getQuantity," total stock and quantity ")
          if(getQuantity + 1 > totalStockOfProduct){
            toast({
              title:`you can cart only ${getQuantity} items of this product`,
              variant :"destructive"
            })
            return
          }
        }
      }
     }
     dispatch(updateCartQuantity({
      userId:user?.id,
      productId:getCartItem.productId,
      quantity: typeOfAction ==="plus"?
      getCartItem?.quantity + 1
      :  getCartItem?.quantity - 1
     })).then((data)=>{
      if(data?.payload?.success){
        toast({
          title:"product quantity updated successfully"
        })
     }})
    
  }
  function handleCartDelete(getCurrentProductId){
    // console.log(user.id)
    if(user){
      dispatch(deleteCartItem({
        userId:user.id,
        productId:getCurrentProductId
      })).then((data)=>{
        if(data?.payload?.success){
          dispatch(fetchCartItems(user.id))
          toast({
            title:"product successfully remove from cart"
          })
        }
      })
  }else{
    toast({
      title:"user is not found"
    })
  }

}
  return (
    <div className='flex w-full space-x-4 mt-4'>
      <div>
        <img src={cartItem.image} alt={cartItem.title}
        className='w-20 h-20 rounded object-cover' />
      </div>
      <div className='flex-1'>
        <h1 className='text-lg font-bold'>{cartItem.title}</h1>
        <div className='flex space-x-2 items-center'>
        <Button size="icon" variant="outline"
        className="rounded-full" onClick={()=>handleUpdateQuantity(cartItem,"plus")}>
          <Plus size="20"/>
        </Button>
        <h1 className='text-lg font-semibold'>{cartItem?.quantity}</h1>
        <Button size="icon" variant="outline"
        className="rounded-full " 
        onClick={()=>handleUpdateQuantity(cartItem,"minus")}>
          <Minus/>
        </Button>   
        </div>
      </div>
      <div className='flex flex-col justify-center gap-1 items-end '>   
            
        <h1 className='text-lg font-semibold'>
          ${((cartItem?.salePrice >0 ?
          cartItem.salePrice : cartItem.price) * cartItem.quantity).toFixed(2)}
        </h1>
        <Trash  onClick={()=>handleCartDelete(cartItem.productId)}
        size={20} className='fill-red-500 cursor-pointer'/>       
      </div>
    </div>
  )
}

export default CartItemsContent