import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleSucess } from '../Toastmessage'
import { ToastContainer } from 'react-toastify'

const Home = () => {
  const [message, SetMessage] = useState('')

  useEffect(()=>{
    SetMessage(localStorage.getItem('message'))
  },[])

  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    localStorage.removeItem('token')
    localStorage.removeItem('message')
    handleSucess("Logout Sucessfull")
    setTimeout(() => {
      navigate('/login')
    }, 1000);
  }

  setTimeout(() => {
    navigate('/login')
  }, 300000);

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={handleSubmit}>LogOut</button>
      <ToastContainer/>
    </div>
  )
}

export default Home
