import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

let VITE_API_URL = import.meta.env.VITE_API_URL;

const Navbar = () => {
    const location = useLocation();
    const { user, setToken, setUser } = useContext(AppContext);

    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        
        // call to API to logout
        const response = await axios.post(VITE_API_URL + '/auth/logout', 
            {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (response.status === 200) {
            toast.success('Logged out successfully');
            // console.log('Logged out successfully');
        } else {
            toast.error('Error logging out');
            console.error('Error logging out:', response.data.message);
        }
        
        localStorage.removeItem('token');

        setToken(null);
        setUser(null);
    };

    return (
        <nav className="bg-white border-gray-200 shadow-sm">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">Qoutator</span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {user ? (
                        <div className="relative">
                            {/* Dropdown Button */}
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
                        <div className="flex space-x-1">
                            <Link to="/register" className="hidden md:block py-2 px-4 text-sm font-medium text-gray-900 rounded-lg hover:text-blue-500">
                                Register
                            </Link>
                            <Link to="/login" className="hidden md:block py-2 px-4 text-sm font-medium text-white rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300">
                                Get Started
                            </Link>
                        </div>
                    )}
                    <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-cta" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <Link to="/" className={`block py-2 px-3 md:p-0 rounded-sm ${location.pathname === '/' ? 'text-blue-700' : 'text-gray-900'} hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/favorite" className={`block py-2 px-3 md:p-0 rounded-sm ${location.pathname === '/favorite' ? 'text-blue-700' : 'text-gray-900'} hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700`}>
                                Favorite
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;