import Commonform from '@/components/common/Commonform'
import { loginFormControls } from '@/config'
import { toast } from '@/hooks/use-toast'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser } from '@/store/authSlice'
const initialState ={
  email:"",
  password:""
}
const login = () => {
  const [formData,setFormData]= useState(initialState)
  const dispatch = useDispatch()
  
  function onSubmit(e){
   e.preventDefault();
   dispatch(loginUser(formData))
   .then((data)=>{
    if(data?.payload?.success){
      toast({
        title:data?.payload?.message
      })
    }else{
      toast({
        title:data?.payload?.message,
        variant : "destructive"
      })
    }
   })
  }
  return (
    <div>
      <div className='my-2'>
        <h1>Dont have an account? 
          <Link to="/auth/register"
          className='ml-2 underline text-blue-400 hover:text-blue-600 hover:text-lg transition-all duration-300'>
              Sign up</Link>
        </h1>
      </div>
      <div>
        <Commonform 
        formcontrols={loginFormControls}
        btnText={"Sing In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit} />
      </div>
    </div>
  )
}

export default login