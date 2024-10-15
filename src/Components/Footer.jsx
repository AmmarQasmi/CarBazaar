import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 w-full relative">
            <div className="px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="mb-6 w-full md:w-auto">
                        <Link to="/Home" className="flex items-center mt-6">
                            <span className="mt-6 text-xl font-semibold p-4 text-blue-300">CarBazaar</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 w-full md:w-auto">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">Resources</h2>
                            <ul className="text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="/Home" className="hover:underline hover:text-white">
                                        Home
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/Contact" className="hover:underline hover:text-white">
                                        Contacts
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">Follow us</h2>
                            <ul className="text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a
                                        href="https://github.com/ammarqasmi"
                                        className="hover:underline hover:text-white"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Github
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.facebook.com/ammar.qasmi.54/"
                                        className="hover:underline hover:text-white"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Facebook
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">Contact</h2>
                            <ul className="text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a
                                        href="tel:+1234567890"
                                        className="hover:underline hover:text-white"
                                    >
                                        0333-1234567
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="mailto:ammarsqasmi@gmail.com"
                                        className="hover:underline hover:text-white"
                                    >
                                        carbazaar@gmail.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-400">
                    © 2024 CarBazaar. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
