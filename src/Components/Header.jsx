import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed w-full top-0 z-50 transition-colors duration-300 group ${isScrolled ? 'bg-gradient-to-r from-gray-950 to-gray-600 text-white' : 'bg-transparent text-black shadow-lg'}`}
        >
            <nav className='py-2.5 w-full relative'>
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-red-300 transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left"></span>
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 lg:px-6">
                    <Link to="/">
                        <img src="./CAR_latest.png" alt="logo" className='h-8 w-auto cursor-pointer' />
                    </Link>

                    {/* Mobile Hamburger Icon */}
                    <div className="flex items-center lg:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)}>
                            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-gray-300 text-2xl" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className={`flex-col lg:flex lg:flex-row lg:space-x-8 mt-4 font-medium lg:mt-0 ${menuOpen ? 'flex' : 'hidden'} lg:flex`}>
                        <ul className="flex flex-row space-x-8">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-red-400 lg:p-0 ${isActive ? "text-red-400" : "text-gray-300"}`}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <div className="relative">
                                    <button
                                        onClick={() => setSearchDropdownOpen(!searchDropdownOpen)}
                                        className="block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-red-400 lg:p-0 text-gray-300"
                                    >
                                        Search
                                    </button>
                                    {searchDropdownOpen && (
                                        <div className="absolute z-10 bg-gradient-to-r from-gray-600 to-red-600 rounded-md shadow-lg mt-1">
                                            <NavLink
                                                to="/Browse"
                                                className="block px-4 py-2 text-sm hover:bg-red-500 text-gray-300"
                                                onClick={() => setSearchDropdownOpen(false)}
                                            >
                                                Browse Cars
                                            </NavLink>
                                            <NavLink
                                                to="/AdvanceSearch"
                                                className="block px-4 py-2 text-sm hover:bg-red-500 text-gray-300"
                                                onClick={() => setSearchDropdownOpen(false)}
                                            >
                                                Advanced Search
                                            </NavLink>
                                        </div>
                                    )}
                                </div>
                            </li>
                            <li>
                                <div className="relative">
                                    <button
                                        onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                                        className="block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-red-400 lg:p-0 text-gray-300"
                                    >
                                        Services
                                    </button>
                                    {servicesDropdownOpen && (
                                        <div className="absolute z-10 bg-gradient-to-r from-gray-600 to-red-600 rounded-md shadow-lg mt-1">
                                            <NavLink
                                                to="/Maintenance"
                                                className="block px-4 py-2 text-sm hover:bg-red-500 text-gray-300"
                                                onClick={() => setServicesDropdownOpen(false)}
                                            >
                                                Maintenance Booking
                                            </NavLink>
                                            <NavLink
                                                to="/InsuranceOptions"
                                                className="block px-4 py-2 text-sm hover:bg-red-500 text-gray-300"
                                                onClick={() => setServicesDropdownOpen(false)}
                                            >
                                                Insurance Options
                                            </NavLink>
                                            <NavLink
                                                to="/seller"
                                                className="block px-4 py-2 text-sm hover:bg-red-500 text-gray-300"
                                                onClick={() => setServicesDropdownOpen(false)}
                                            >
                                                Sell the Car
                                            </NavLink>
                                        </div>
                                    )}
                                </div>
                            </li>
                            <li>
                                <NavLink
                                    to="/Contact"
                                    className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-red-400 lg:p-0 ${isActive ? "text-red-300" : "text-gray-300"}`}
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <NavLink
                            to="/seller"
                            className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-red-400 lg:p-0 ${isActive ? "text-white" : "text-gray-300"}`}
                        >
                            <FontAwesomeIcon icon={faCirclePlus} className="mr-6 text-xl" />
                        </NavLink>
                        <NavLink
                            to="/Login"
                            className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-red-400 lg:p-0 ${isActive ? "text-red-300" : "text-gray-300"}`}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/Signup"
                            className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-red-400 lg:p-0 ${isActive ? "text-red-300" : "text-gray-300"}`}
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
