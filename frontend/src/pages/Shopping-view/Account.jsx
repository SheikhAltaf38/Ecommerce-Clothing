import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import img1 from "../../images/1.jpg"
import Address from '@/components/Shopping-view/Address'
import ShoppingOrders from '@/components/Shopping-view/Orders'
const Account = () => {
  return (
    <div className='flex flex-col'>
       <div className='relative h-[320px] w-full overflow-hidden' >
         <img  src={img1} className='h-full w-full object-cover object-center '/>
       </div>
       <div className='container  p-6 w-full flex justify-center'>
      <Tabs  defaultValue='address' className='w-full'>
        <div className='flex justify-center'>
        <TabsList className="bg-gray-200 gap-2  py-6   flex justify-around w-[400px]"> 
          <TabsTrigger className="bg-gray-300  hover:bg-gray-400 w-[180px] border text-lg font-semibold hover:text-foreground" value="address">Adress</TabsTrigger>
          <TabsTrigger className="bg-gray-300  hover:bg-gray-400 w-[180px] border text-lg font-semibold hover:text-foreground"  value="orders">Orders</TabsTrigger>
        </TabsList>
        </div>
        <TabsContent value="address">
           <p>adress</p>
           <Address/>
        </TabsContent>
        <TabsContent value="orders">
           <p>orders</p>
           <ShoppingOrders/>
        </TabsContent>
       
      </Tabs>
      </div>
    </div>
  )
}

export default Account