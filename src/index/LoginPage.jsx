import React, { useContext, useState } from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import Footer from '../components/Footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': "application/json" },
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo); // Save user info to context 
        setRedirect(true);
      });
    } else {
      alert('Wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
        {/* Tagline */}
        <div className='mb-20'>
          <h2 className='text-3xl font-semibold text-gray-700 dark:text-gray-300 text-center'>
            "Your journey to insightful blogs begins here!"
          </h2>
        </div>

        {/* Login Form */}
        <form className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md' onSubmit={login}>
          <h1 className='text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100'>Login</h1>

          <div className='mb-4'>
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={ev => setUsername(ev.target.value)}
              className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='mb-6 relative'>
            <input
              type={showPassword ? 'text' : 'password'} // Toggle between text and password
              placeholder='Password'
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className='absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition duration-300'
          >
            Login
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
