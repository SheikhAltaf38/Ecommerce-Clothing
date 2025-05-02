import Commonform from '@/components/common/Commonform'
import { Toast } from '@/components/ui/toast'
import { registerFormControls } from '@/config'
import { toast } from '@/hooks/use-toast'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { registerUser } from '@/store/authSlice'
const initialState={
  userName :"",
  email:"",
  password:""
}
const register = () => {
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  function onSubmit(e){
    e.preventDefault();
    dispatch(registerUser(formData))
    .then((data)=>{
      console.log(data)
      console.log(data.payload)
      if(data?.payload?.success){
        toast({
          title:data?.payload?.message 
        })
        navigate("/auth/login")
      }else{
        toast({
          title:data?.payload?.message,
          variant:"destructive"
        })
      }
    })
  }
  console.log(formData)
  return (
    <div>
      <div className='mb-2'>
        <h1>Already have an account 
            <Link to="/auth/login"
            className='text-blue-300 hover:text-blue-500 hover:text-xl transition-all duration-300 ml-1 ' > Sign In</Link>
        </h1>
      </div>
      <div>
        <Commonform
        formcontrols={registerFormControls} 
        btnText={"register"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit} />
      </div>
    </div>
  )
}

export default register