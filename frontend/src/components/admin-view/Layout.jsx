import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = () => {
  const [openSidebar , setOpenSidebar]= useState(false)
  return (
    <div className='flex min-h-screen w-full '>
      {/* side bar  */}
      <Sidebar open={openSidebar} setOpen={setOpenSidebar}/>
      <div className='flex flex-1 flex-col'>
        <Header setOpen={setOpenSidebar} />
        <main className='flex flex-col flex-1 bg-muted/40 p-4'>
          <Outlet/>
        </main>
      </div>
    </div>
    
  )
}

export default Layout