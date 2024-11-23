import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faBars, faTimes, faShop, faUser, faDashboard } from '@fortawesome/free-solid-svg-icons';

const usersApiUrl = 'http://localhost:5000/api/users';

function Header() {
    const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        const checkLoginStatus = async () => {
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                try {
                    const response = await fetch(usersApiUrl);
                    const userData = await response.json();
                    const loggedInUser = userData.data.find(user => user.email === userEmail);
                    if (loggedInUser) {
                        setIsLoggedIn(true);
                        setUser(loggedInUser);
                    } else {
                        setIsLoggedIn(false);
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        };

        checkLoginStatus();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        if (user) {
            try {
                await fetch(`${usersApiUrl}/login/${user.u_id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ is_login: 'N' }),
                });
                localStorage.removeItem('userEmail');
                setIsLoggedIn(false);
                setUser(null);
                navigate('/login');
            } catch (error) {
                console.error('Error during logout:', error);
            }
        }
    };

    return (
        <header
            className={`fixed w-full top-0 z-50 transition-colors duration-300 group ${isScrolled ? 'bg-gradient-to-r from-gray-950 to-gray-600 text-white hover:bg-black' : 'bg-red-900 text-black shadow-lg hover:bg-gray-950'}`}
        >
            <nav className='py-2.5 relative'>
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-red-300 transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left"></span>
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 lg:px-6">
                    <Link to="/">
                        <img src="./CAR_latest.png" alt="logo" className='h-8 w-auto cursor-pointer logo' />
                    </Link>

                    <div className="flex items-center lg:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)}>
                            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-gray-300 text-2xl" />
                        </button>
                    </div>

                    <div className={`flex-col lg:flex lg:flex-row lg:space-x-8 mt-4 font-medium lg:mt-0 ${menuOpen ? 'flex' : 'hidden'} lg:flex`}>
                        <ul className="flex flex-row space-x-8">
                            <li className="relative group">
                                <div className="relative inline-block">
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-red-400 lg:p-0 ${isActive ? "text-red-400" : "text-gray-300"}`}
                                    >
                                        Home
                                    </NavLink>
                                    <span className="absolute left-0 bottom-0 h-0.5 w-full bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                </div>
                            </li>
                            <li>
                                <div className="relative group">
                                    <div className="relative inline-block">
                                        <button
                                            onClick={() => setSearchDropdownOpen(!searchDropdownOpen)}
                                            className="block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-red-400 lg:p-0 text-gray-300"
                                        >
                                            Search
                                        </button>
                                        <span className="absolute left-0 bottom-0 h-0.5 w-full bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                    </div>
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
                                    <div className="relative inline-block">
                                        <button
                                            onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                                            className="block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-red-400 lg:p-0 text-gray-300"
                                        >
                                            Services
                                        </button>
                                        <span className="absolute left-0 bottom-0 h-0.5 w-full bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                    </div>
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
                                        </div>
                                    )}
                                </div>
                            </li>
                            <li>
                                <div className="relative group">
                                    <NavLink
                                        to="/Contact"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-red-400 lg:p-0 ${isActive ? "text-red-300" : "text-gray-300"}`
                                        }
                                    >
                                        Contact
                                    </NavLink>
                                    <span className="absolute left-0 bottom-0 h-0.5 w-full bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <NavLink
                            to="/feed"
                            className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-red-400 lg:p-0 ${isActive ? "text-white" : "text-gray-300"}`}
                        >
                            <FontAwesomeIcon icon={faShop} />
                        </NavLink>
                        <NavLink
                            to="/seller"
                            className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 border-b border-gray-700 hover:bg-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-red-400 lg:p-0 ${isActive ? "text-white" : "text-gray-300"}`}
                        >
                            <FontAwesomeIcon icon={faCirclePlus} className="mr-6 text-xl" />
                        </NavLink>
                        {isLoggedIn && user ? (
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-800 font-semibold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <NavLink to="/profilepage">
                                    <span className="ml-2 text-gray-300">{user.name}</span>
                                </NavLink>
                                {user.role_id === 1 && (
                                    <NavLink
                                        to="/adminpage"
                                        className="ml-4 text-gray-300 hover:text-red-400"
                                    >
                                        <FontAwesomeIcon icon={faDashboard} className="mr-2" />
                                        Dashboard
                                    </NavLink>
                                )}
                                <button onClick={handleLogout} className="ml-4 text-gray-300 hover:text-red-400">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;