import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <div className='flex flex-col w-full'>
      <Header/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout