import React from 'react'
import { NavLink } from 'react-router-dom';

function SellWithUs() {
    return (
        <>
            <section className='mt-20 flex items-center bg-gray-300'>
                <div className="bg-white text-black p-8 rounded-lg shadow-md w-full h-full">
                    <h2 className="text-2xl font-bold mb-6 text-center">Sell the car? You are at the right place</h2>
                    <form className="space-y-4">
                        <div>
                            <h5 className="text-md font-bold mb-6 text-left underline">Car Details</h5>

                            <div>
                                <label className="block text-sm font-medium mb-3" htmlFor="make">
                                    Make
                                </label>
                                <input
                                    id="make"
                                    placeholder='Enter Company Name'
                                    className="w-full mb-5 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                </input>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-3" htmlFor="model">
                                    Model
                                </label>
                                <input
                                    id="model"
                                    placeholder='Enter Specific Model'
                                    className="w-full mb-5 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                </input>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-3" htmlFor="variant">
                                    Variant
                                </label>
                                <select
                                    id="variant"
                                    placeholder='Select Variant'
                                    className="w-full mb-5 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="" disabled selected>Select Variant</option>
                                    <option value="base">Base</option>
                                    <option value="sport">Sport</option>
                                    <option value="luxury">Luxury</option>
                                    <option value="hybrid">Hybrid</option>
                                    <option value="electric">Electric</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="image">
                                    Upload Car Photos
                                </label>
                                <input
                                    type='file'
                                    id='image'
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    accept="image/*"
                                    multiple
                                />
                            </div>
                            <br /> <hr />
                        </div>

                        <h5 className="text-md font-bold mb-6 text-left underline">Contact Information</h5>
                        <label className="block text-sm font-medium mb-1" htmlFor="name">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your name"
                        />
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
                                Phone Number
                            </label>
                            <input
                                type='tel'
                                id='tel'
                                className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your Number  "
                            />
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
                        >
                            Publish Ad
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
            <br /> <br /> <br /><br />
            <section className='relative p-8 '>
                <div className="absolute right-4 bottom-4 flex flex-col space-y-4">
                    <NavLink
                        to='/join'
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-500 transition-colors">
                        Join us Instead?
                    </NavLink>
                    <NavLink
                        to='/partner'
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-500 transition-colors">
                        Partner with us Instead?
                    </NavLink>
                </div>
            </section>
        </>
    )
}

export default SellWithUs