import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSucess } from '../Toastmessage';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

const Login = () => {

  const [signinInfo,setSigninInfo] = useState({
    email:'',
    password:""
  })

  const handleChange = (e)=>{
    const {name,value}  = e.target
    setSigninInfo({...signinInfo,[name]:value})
  }
  console.log(signinInfo);

  const navigate = useNavigate()
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    const {email,password} = signinInfo
    if(!email || !password){
      return handleError("Email and Password are required")
    }
    else{
      try {
        const url="http://localhost:3001/login"
        const response =await axios.post(url,{email,password});
        if(response.data.token){
          localStorage.setItem('token',response.data.token)
          localStorage.setItem('message',response.data.message)
          handleSucess(response.data.message)
          setTimeout(() => {
            navigate('/home')
          }, 1000);

          
        }
        else{
          handleError(response.data.message)
          setTimeout(() => {
            navigate('/signup')
          }, 1000);
        }
      } catch (error) {
        if(error.response)
        {
            if(error.response.data.errors)
            {
                const message=error.response.data.errors.map(err=>err.msg).join(', ')
                handleError(message)
            }
            else
            {
                handleError(error.response.data.message||'login failed')
            }
        }
        else
        {
            handleError("unexpected error occured")
        }
       } 
    }
}

  return (
    <div className='container'>
      <h1>SignIn</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="email">E-Mail</label>
        <input 
        onChange={handleChange}
        type="email" 
        name='email' 
        placeholder='Enter Your E-Mail' 
        />
        </div>

        <div>
        <label htmlFor="password">Password</label>
        <input 
        onChange={handleChange}
        type="password" 
        name='password'
        placeholder='Enter Your Password'  
        />
        </div>
        <button>SignIn</button>
        <span>Don't have an Account ? <Link to= '/signup'>Register</Link></span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login
