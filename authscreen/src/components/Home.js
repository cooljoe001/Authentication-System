import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home() {
    const [userdata,setuserData]= useState(null);
    const navigate =  useNavigate();

    const checkUser=()=>{
        // GETTING TOKEN AND CHECKING IF IT EXIST
        const token = localStorage.getItem('authtoken');
        
        if(!token){
            navigate('/');
        }else{
            axios.post('http://localhost:8000/check-user',{token})
            .then(res=>{

                setuserData(res.data);
            })
            toast.success('Welcome back');
        }
    }

    //LOGGING OUT USER
    const logoutUser=()=>{
        localStorage.removeItem('authtoken');
        checkUser();
    }

    // HANDLING SIDE EFFECT WITH USEEFFECT

    useEffect(()=>{
        checkUser();
    },[])

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <div>
      <h2 className='font-bold text-2xl '>Welcome, {userdata?.firstname} {userdata?.lastname} </h2>
      <button onClick={logoutUser}   className='bg-red-500 hover:bg-red-700 p-2 px-5 text-white justify-center w-full mt-5 '>Logout</button>
      </div>
    </div>
  )
}

export default Home
