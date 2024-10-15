import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Header() {
    return (
        <header className='bg-gray-800 p-4 text-white shadow-md fixed w-full top-0 z-50'>
            <nav className='bg-gray-900 border-gray-700 px-4 lg:px-6 py-2.5'>
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <div className="flex items-center">
                        <ul className="flex flex-row space-x-8 mt-4 font-medium lg:mt-0">
                            <li>
                                <NavLink
                                    to="/Home"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-blue-400 lg:p-0 ${isActive ? "text-blue-300" : "text-gray-300"}`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Browse"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-blue-400 lg:p-0 ${isActive ? "text-blue-300" : "text-gray-300"}`
                                    }
                                >
                                    Browse Cars
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/AdvanceSearch"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-blue-400 lg:p-0 ${isActive ? "text-blue-300" : "text-gray-300"}`
                                    }
                                >
                                    Advanced Search
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/FinanceOption"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-blue-400 lg:p-0 ${isActive ? "text-blue-300" : "text-gray-300"}`
                                    }
                                >
                                    Finance Options
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Contact"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-blue-400 lg:p-0 ${isActive ? "text-blue-300" : "text-gray-300"}`
                                    }
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-end space-x-4">

                        <NavLink
                            to="/Login"
                            className={({ isActive }) =>
                                `block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-blue-400 lg:p-0 ${isActive ? "text-blue-300" : "text-gray-300"}`
                            }
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/Signup"
                            className={({ isActive }) =>
                                `block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-blue-400 lg:p-0 ${isActive ? "text-blue-300" : "text-gray-300"}`
                            }
                        >
                            Signup
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
