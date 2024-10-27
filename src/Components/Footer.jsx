import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-red-800 text-white py-4 w-full relative group">
            <div className="px-4 mx-auto">
                <div className="flex flex-wrap justify-between items-center">
                    {/* Logo */}
                    <div className="mb-2 w-full md:w-auto flex items-center">
                        <Link to="/" className="flex items-center group-hover:text-red-500">
                            <img
                                src="CAR_latest.png"
                                alt="CarBazaar Logo"
                                className="w-32 h-auto mr-2"
                            />
                        </Link>
                    </div>
                    {/* Footer Links */}
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 w-full md:w-auto">
                        {/* Resources Section */}
                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-red-500 uppercase group-hover:text-red-500">Resources</h2>
                            <ul className="text-gray-300 font-medium">
                                <li className="mb-2">
                                    <Link 
                                        to="/Home" 
                                        className="relative group hover:text-red-500"
                                    >
                                        Home
                                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/Contact" 
                                        className="relative group hover:text-red-500"
                                    >
                                        Contacts
                                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* Follow Us Section */}
                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-red-500 uppercase group-hover:text-red-500">Follow us</h2>
                            <ul className="text-gray-300 font-medium">
                                <li className="mb-2">
                                    <a
                                        href="https://github.com/ammarqasmi"
                                        className="relative group hover:text-red-500"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Github
                                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.facebook.com/ammar.qasmi.54/"
                                        className="relative group hover:text-red-500"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Facebook
                                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* Contact Section */}
                        <div>
                            <h2 className="mb-4 text-sm font-semibold text-red-500 uppercase group-hover:text-red-500">Contact</h2>
                            <ul className="text-gray-300 font-medium">
                                <li className="mb-2">
                                    <a
                                        href="tel:+1234567890"
                                        className="relative group hover:text-red-500"
                                    >
                                        0333-1234567
                                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="mailto:ammarsqasmi@gmail.com"
                                        className="relative group hover:text-red-500"
                                    >
                                        carbazaar@gmail.com
                                        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Copyright */}
                <div className="mt-4 text-center text-gray-300">
                    © 2024 CarBazaar. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
