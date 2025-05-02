import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='flex'>
      <div className='w-1/2 h-screen flex justify-center items-center bg-black'>
        <div className='text-3xl font-bold text-white'>
            AuthLayout
        </div>
       
      </div>
      <div className='w-1/2 flex justify-center items-center'>
        <div>
       <Outlet/>

        </div>
      </div>
    
    </div>
    
  )
}

export default AuthLayout