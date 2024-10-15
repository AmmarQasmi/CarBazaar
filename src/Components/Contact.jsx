import React from 'react';
import { NavLink } from 'react-router-dom';
import carImage from './cb.jpg'; // Adjust this path as needed

function Contact() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Contact Us</h1>
            <h3 className="mb-6 text-black text-center bg-gray-300">
                We'd love to hear from you! Please fill out the form below, and we'll get back to you as soon as possible.
            </h3>

            <form className="bg-white shadow-md rounded-lg p-8 max-w-md w-full space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Your Name"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your Email"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        id="message"
                        rows="4"
                        placeholder="Your Message"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
                    onClick={() => { alert("Message Received. Thanks for contacting, our team will reach you out shortly."); }}
                >
                    Send Message
                </button>
            </form>

            <div className="mt-8 text-gray-600">
                <NavLink to="/Home" className="text-indigo-600 hover:underline">Back to Home</NavLink>
            </div>

            {/* Image positioned in the right corner */}
            <div className="absolute right-0 bottom-0 p-4">
                <img src={carImage} alt="Car Bazaar" className="h-full w-full object-cover rounded-full" />
            </div>
        </div>
    );
}

export default Contact;
