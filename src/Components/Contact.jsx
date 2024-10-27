import React from 'react';
import contactImage from '../assets/contactbg.jpg'; // Adjust this path if needed

function Contact() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-300">
            <div className="w-full max-w-4xl p-5 bg-white bg-opacity-90 rounded-lg shadow-2xl grid lg:grid-cols-2 overflow-hidden">
                <div className="hidden lg:block bg-cover bg-center" style={{ backgroundImage: `url(${contactImage})` }}></div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
                    <input type="text" placeholder="Your Name" className="w-full mb-4 p-3 bg-gray-200 border border-transparent rounded-md focus:border-red-500 focus:bg-white outline-none" />
                    <input type="email" placeholder="Your Email" className="w-full mb-4 p-3 bg-gray-200 border border-transparent rounded-md focus:border-red-500 focus:bg-white outline-none" />
                    <input type="tel" placeholder="Phone" className="w-full mb-4 p-3 bg-gray-200 border border-transparent rounded-md focus:border-red-500 focus:bg-white outline-none" />
                    <textarea placeholder="Message" className="w-full mb-6 p-3 bg-gray-200 border border-transparent rounded-md focus:border-red-500 focus:bg-white outline-none min-h-[120px] resize-none"></textarea>
                    <button className="w-full py-3 text-lg font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300">Send</button>
                </div>
            </div>
        </div>
    );
}

export default Contact;
