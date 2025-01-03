import React, { useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form'; 
import { yupResolver } from '@hookform/resolvers/yup';  
import axios from 'axios';
import { toast } from 'react-toastify';
  
// export const loginSchema = Yup.object({
//   email: Yup.string()
//     .email('Invalid email format')
//     .required('Email is required'),
//   password: Yup.string()
//     .min(8, 'Password must be at least 8 characters')
//     .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
//     .matches(/\d/, 'Password must contain at least one number')
//     .required('Password is required'),
// });



function Login() {

  // const {register, handleSubmit,formState:{errors}}=useForm({
  //   resolver: yupResolver(loginSchema),
  // });

  // const onSubmit=(data)=>{
  //   console.log(data);
  // }
  const navigate = useNavigate();

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const handleLogin=()=>{
  // e.preventDefault();

  if(!email && !password){
    toast.error("All field are required")
  }else{

    console.log(email,password);
  axios.post('http://localhost:8000/login',{email,password})
  .then( res => {
    if(res.data.message == 'Login successful'){
      toast.success(res.data.message);
      localStorage.setItem('authtoken',res.data.token);
      navigate('/home');

      }else if(res.data == "Invalid email"){
      toast.error(res.data);
    }else if(res.data == 'Invalid password'){
      toast.error(res.data)

    }
    

    
  })

  }
  

  }

  return (
    
<div className="w-screen h-screen bg-grey-100 flex flex-col justify-center items-center bg-gray-100">
      <div className="w-fit h-fit bg-white p-8 rounded-md">
      <div>
      <h2 className="font-bold text-2xl flex w-full justify-center item-center mb-3">Login</h2>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <input type="email "   value={email} onChange={e =>setEmail(e.target.value)} placeholder="Email" className="p-2 outline-none bg-gray-100 rounded-md w-72" />
        {/* {errors.email && <p className='text-red-500 mt-2 text-sm'>{errors.email.message}</p>} */}

        <input type="password"  value={password} onChange={e =>setPassword(e.target.value)} placeholder=" Password" className="p-2 outline-none bg-gray-100 rounded-md w-72" />
          {/* {errors.password && <p className='text-red-500 mt-2 text-sm'>{errors.password.message}</p>} */}
      </div>
      <div>
        <button onClick={handleLogin} className="w-72 h-10 bg-green-600 text-white mt-3 py-1 rounded-md font-semibold" >
          Login
          </button>
      </div>
      <div className='mt-5'>
      <Link to='/register'> Don't have an account? <a className='text-blue-400'>Click here to register</a> </Link>

      </div>
    </div>
     </div>
      
    
  )
}

export default Login
