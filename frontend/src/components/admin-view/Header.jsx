import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/authSlice'

const Header = ({setOpen}) => {
  const dispatch = useDispatch();
  function handleLogout(){
    dispatch(logoutUser())
  }
  return (
    <div className='flex justify-between lg:justify-end  items-center 
    border-b-2 bg-background pb-2'>
      <Button onClick={()=>{
        setOpen(true)
      }} className="flex items-center cursor-pointer lg:hidden ml-2">
        <AlignJustify className=""/>
        <span>Toggle menu</span>
      </Button>
      {/* onClick={() => dispatch(logoutUser())} */}
      <div onClick={handleLogout} className='flex gap-2 mr-4 text-xl font-semibold items-center border px-4 py-1
      rounded-md cursor-pointer hover:scale-105 hover:bg-muted hover:text-foreground
      bg-gradient-to-r from-purple-400 to-blue-500 hover:text-red-200
      group'>
       <LogOut/>
       <span className=''>Logout</span>
      </div>
    </div>
  )
}

export default Header