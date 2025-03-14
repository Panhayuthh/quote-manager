import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const location = useLocation();
    const { user, setToken, setUser } = useContext(AppContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link
                    to="/"
                >
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Qoutator</span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <div className="text-sm font-medium text-gray-700 dark:text-white">{user.name}</div>
                            <button
                                onClick={handleLogout}
                                className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-600 dark:focus:ring-offset-gray-900"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex space-x-1">
                            <Link
                                to="/register"
                                className='hidden md:block py-2 px-4 text-sm font-medium text-gray-9 rounded-lg dark:hover:text-blue-500'>
                                Register
                            </Link>
                            <Link to="/login"
                                className="hidden md:block py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-900">
                                Get Started
                            </Link>
                        </div>
                    )}
                    <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link
                                to="/"
                                className={`block py-2 px-3 md:p-0 rounded-sm 
                                    ${location.pathname === '/' ? 'text-blue-700' : 'text-gray-900 dark:text-white'}
                                    hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 
                                    dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/favorite"
                                className={`block py-2 px-3 md:p-0 rounded-sm 
                                    ${location.pathname === '/favorite' ? 'text-blue-700' : 'text-gray-900 dark:text-white'}
                                    hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 
                                    dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                            >
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