import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons
import Footer from '../components/Footer';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  async function register(ev) {
    ev.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      alert('Registration successful');
      navigate('/login');
    } else {
      alert('Registration failed');
    }
  }

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
        {/* Tagline */}
        <div className='mb-8'>
          <h2 className='text-3xl font-semibold text-gray-700 dark:text-gray-300 text-center'>
            "Join us and start sharing your stories!"
          </h2>
        </div>

        {/* Registration Form */}
        <form className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md' onSubmit={register}>
          <h1 className='text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100'>Register</h1>

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
              type={showPassword ? 'text' : 'password'} // Toggle input type based on state
              placeholder='Password'
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none'
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle between eye and eye-slash icon */}
            </button>
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition duration-300'
          >
            Register
          </button>

          <p className="text-center mt-4 text-gray-700 dark:text-gray-300">
            Already have an account? <Link to='/login' className='text-blue-500 dark:text-blue-400 hover:underline'>Login</Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default RegisterPage;
