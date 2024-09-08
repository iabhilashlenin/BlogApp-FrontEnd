import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import logo from '../assets/logo.png';
import { FaMoon, FaSun } from 'react-icons/fa';

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/profile`, {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  const username = userInfo?.username;

  function logout() {
    fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      credentials: 'include',
      method: 'POST'
    });
    setUserInfo(null);
  }

  function toggleDarkMode() {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  }

  return (
    <header className={`flex justify-between items-center px-4 py-3 md:px-6 md:py-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md`}>
      <Link to='/' className='flex items-center text-2xl md:text-3xl font-bold hover:text-blue-600'>
        <span>VerseLane</span>
        <img src={logo} alt='Logo' className='ml-2 h-8 w-auto md:h-10' /> {/* Adjust size as needed */}
      </Link>
      <nav className='flex items-center space-x-4 md:space-x-6'>
        {username ? (
          <>
            <div className='hidden md:flex items-center space-x-2'>
              <span className='text-lg font-medium'>
                <span className='text-blue-600'>Hello,</span> {username}
              </span>
              <span className='h-8 w-px bg-gray-300' />
            </div>
            <Link 
              to='/create' 
              className='bg-blue-600 text-white px-4 py-2 rounded-md text-sm md:text-base hover:bg-blue-700 transition duration-300 ease-in-out'
            >
              Create new post
            </Link>
            <Link to='/'>
              <button 
                onClick={logout} 
                className='bg-red-600 text-white px-4 py-2 rounded-md text-sm md:text-base hover:bg-red-700 transition duration-300 ease-in-out'
              >
                Logout
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link 
              to='/login' 
              className='bg-blue-600 text-white px-4 py-2 rounded-md text-sm md:text-base hover:bg-blue-700 transition duration-300 ease-in-out'
            >
              Login
            </Link>
            <Link 
              to='/register' 
              className='bg-blue-600 text-white px-4 py-2 rounded-md text-sm md:text-base hover:bg-blue-700 transition duration-300 ease-in-out'
            >
              Register
            </Link>
          </>
        )}
        <button 
          onClick={toggleDarkMode} 
          className='p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300'
        >
          {darkMode ? <FaSun className='text-yellow-500' /> : <FaMoon className='text-blue-500' />}
        </button>
      </nav>
    </header>
  );
}

export default Header;
