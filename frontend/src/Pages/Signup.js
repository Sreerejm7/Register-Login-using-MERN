import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSucess } from '../Toastmessage';
import axios from 'axios';

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    } else {
      try {
        const url = 'http://localhost:3001/register';
        const response = await axios.post(url, { name, email, password });

        if (response.data) {
          handleSucess(response.data.message);
          setTimeout(() => {
            navigate('/login'); 
          }, 1000);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          handleError(error.response.data.message); 
        } else {
          handleError('An error occurred during registration'); 
        }
      }
    }
  };

  return (
    <div className='container'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Enter Your Name"
            autoFocus
            value={signupInfo.name}
          />
        </div>

        <div>
          <label htmlFor="email">E-Mail</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter Your E-Mail"
            value={signupInfo.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={signupInfo.password}
          />
        </div>

        <button type="submit">Sign Up</button>
        <span>Already have an account? <Link to="/login">Login</Link></span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
