
import React, { useState } from "react";
import axios from 'axios';
 import { toast} from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";



// const registrationSchema = Yup.object({
//   firstname:Yup.string().required('Firstname is required'),
//   lastname: Yup.string().required('Lastname is required'),
//   email:Yup.string().email('Invalid email format').required('Email is required'),
//   password:Yup.string().min(8,'Password must be at least 8 characters')
//   .matches(/[a-zA-Z]/,'Password must contain at least one letter')
//   .matches(/\d/,'Password must contain at least one number')
//   .required('Password is required'),
//   comfirmPassword:Yup.string().oneOf([Yup.ref('password'),null],'Passwords must match').required('Confirm password is required')
  

// })


 
function Register() {
  const [firstname,setFirstname]= useState('')
  const [lastname,setLastname]= useState('')
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const [confirmPassword,setConfirmPassword]= useState('')
  const [toastShown, setToastShown] = useState(false);
  const navigate = useNavigate();

  

  // const {register, handleSubmit,formState:{errors}}=useForm({
  //   resolver:yupResolver(registrationSchema),
  // })

  // const onSubmit=(data)=>{
  //   console.log("Registration credentials",data)

  // }

  // Handle register function 
  const handleRegister=()=>{

 
    if(!firstname || !lastname || !email || !password){
      toast.error("All fields requirred",{
        hideProgressBar: false
      });
 
    }else if( password !== confirmPassword){
      toast.error("Password mismatch")
    }
   else{
    axios.post('http://localhost:8000/register',{firstname,lastname,email,password})
    .then(res=>{
      if(res.data == 'User registered successfully'){
        toast.success(res.data);
        navigate('/')

      }else if(res.data == 'User already exists'){
        toast.error(res.data)
      }else{
        toast.error('Error encounted during registration')
      }

    })

   }
   }
  return (
    <div className="w-screen h-screen bg-grey-100 flex flex-col justify-center items-center"  >
      <div className="w-fit h-fit bg-white p-8 rounded-md">
      <div>
      <h2 className="font-bold text-2xl flex w-full justify-center item-center mb-3">REGISTER</h2>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <input type="text " value={firstname} onChange={e => setFirstname(e.target.value)}  placeholder="Firstname" className="p-2 outline-none bg-gray-100 rounded-md w-72" />
 
        <input type="text " value={lastname} onChange={e => setLastname(e.target.value)}   placeholder="Lastname" className="p-2 outline-none bg-gray-100 rounded-md w-72" />
 
        <input type="email "  value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="p-2 outline-none bg-gray-100 rounded-md w-72" />
 
        <input type="password" value={password} onChange={e =>setPassword(e.target.value)}  placeholder="Password" className="p-2 outline-none bg-gray-100 rounded-md w-72" />
 
        <input type="password" value={confirmPassword}  onChange={e=> setConfirmPassword(e.target.value)}  placeholder="Confirm password" className="p-2 outline-none bg-gray-100 rounded-md w-72" />
 
      </div>
      <div>
        <button  onClick={handleRegister} className="w-72 h-10 bg-green-600 text-white mt-3 py-1 rounded-md font-semibold">Register</button>
      </div>

    </div>
     </div>

  )
}

export default Register
