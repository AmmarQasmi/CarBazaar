import React from 'react'
import { NavLink } from 'react-router-dom';

function PartnerWithUs() {
    return (
        <>
            <section className=''>
                <div className="bg-white text-black p-8 rounded-lg shadow-md max-w-md mx-auto mt-28 sm:mt-20 md:mt-28 lg:mt-20 xl:mt-20">
                    <h2 className="text-2xl font-bold mb-6 text-center">Partner with Us</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="name">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="email">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="email">
                                Why should we choose you?
                            </label>
                            <input
                                type='text'
                                id='text'
                                className="w-full px-4 py-7 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your reason  "
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
                        >
                            Submit
                        </button>
                        <div className="mt-8 flex justify-between text-gray-600">
                            <p className="text-left">
                                © 2024 CarBazaar. All rights reserved.
                            </p>
                            <NavLink to="/Contact" className="text-right cursor-pointer hover:underline">
                                Contact us
                            </NavLink>
                        </div>
                    </form>
                </div>
            </section>
            <section className='relative p-8 mt-20'>
                <div className="absolute right-4 bottom-4 flex flex-col space-y-4">
                    <NavLink
                        to='/join'
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-500 transition-colors">
                        Join us Instead?
                    </NavLink>
                    <NavLink
                        to='/seller'
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-500 transition-colors">
                        Sell Instead?
                    </NavLink>
                </div>
            </section>
        </>
    );
}

export default PartnerWithUs