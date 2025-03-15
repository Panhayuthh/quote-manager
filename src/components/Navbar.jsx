import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

let VITE_API_URL = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const location = useLocation();
  const { user, setToken, setUser } = useContext(AppContext);

// state for dropdown menu
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        VITE_API_URL + '/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Logged out successfully');
      } else {
        toast.error('Error logging out');
        console.error('Error logging out:', response.data.message);
      }

      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    }
  };

  return (
    <nav className="bg-white border-gray-200 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className='flex items-center space-x-2'>
            <img src="/quote.png" alt="quotator" className='h-8 w-8' />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">Qoutator</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <div className="relative">
              {/* Dropdown Button for User */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-lg hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto"
              >
                {user.name}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // display auth buttons if user is not logged in
            <div className="hidden md:flex space-x-1">
              <Link
                to="/register"
                className="py-2 px-4 text-sm font-medium text-gray-900 rounded-lg hover:text-blue-500"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="py-2 px-4 text-sm font-medium text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-cta"
            aria-expanded={isMobileOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${isMobileOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`}
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 md:p-0 rounded-sm ${
                  location.pathname === '/' ? 'text-blue-700' : 'text-gray-900'
                } hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/favorite"
                className={`block py-2 px-3 md:p-0 rounded-sm ${
                  location.pathname === '/favorite' ? 'text-blue-700' : 'text-gray-900'
                } hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700`}
              >
                Favorite
              </Link>
            </li>
            {/* if guest show auth button */}
            {!user && isMobileOpen && (
              <>
                <li>
                  <Link
                    to="/register"
                    className="block py-2 px-3 rounded-sm text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 rounded-sm text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                  >
                    Get Started
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;