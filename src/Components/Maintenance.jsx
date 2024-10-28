import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Maintenance() {
    const images = [
        "https://wallpapers.com/images/hd/gray-gradient-background-l63d92e4zrvl6f6d.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx1IzBAx05Y8zlghbApMHxy54uT3XU9o8RuA&s",
        "https://www.shutterstock.com/image-photo/dark-concrete-wall-floor-background-600nw-1937061217.jpg",
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    const goToPrevious = () => {
        setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 overflow-hidden ">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${images[currentImage]})`,
                    transition: 'background-image 1s ease-in-out',
                }}
            ></div>

            <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-3 rounded-full hover:bg-red-700 hover:scale-105 active:scale-95 transition-all z-10 focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Previous image"
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-3 rounded-full hover:bg-red-700 hover:scale-105 active:scale-95 transition-all z-10 focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Next image"
            >
                <FontAwesomeIcon icon={faArrowRight} />
            </button>

            <div className="bg-gray-900 p-6 sm:p-8 md:p-10 rounded-lg shadow-xl w-full max-w-2xl mx-auto relative z-20 mt-10 sm:mt-10 md:mt-20 lg:mt-24 lg:mb-20 xl:mt-20 xl:mb-10 ">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-red-500">Car Maintenance Request</h1>

                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-red-400 text-lg font-semibold mb-2" htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-red-400 text-lg font-semibold mb-2" htmlFor="contactNumber">Contact Number</label>
                        <input
                            type="tel"
                            id="contactNumber"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                            placeholder="Enter your contact number"
                        />
                    </div>

                    <div>
                        <label className="block text-red-400 text-lg font-semibold mb-2" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                            placeholder="Enter your email address"
                        />
                    </div>

                    <div>
                        <label className="block text-red-400 text-lg font-semibold mb-2" htmlFor="carModel">Car Model</label>
                        <input
                            type="text"
                            id="carModel"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                            placeholder="Enter your car model"
                        />
                    </div>

                    <div>
                        <label className="block text-red-400 text-lg font-semibold mb-2" htmlFor="regNumber">Vehicle Registration Number</label>
                        <input
                            type="text"
                            id="regNumber"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                            placeholder="Enter your vehicle registration number"
                        />
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-red-400 text-lg font-semibold mb-2" htmlFor="serviceType">Service Type</label>
                        <select
                            id="serviceType"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                        >
                            <option value="">Select Service Type</option>
                            <option value="oil_change">Oil Change</option>
                            <option value="tire_change">Tire Change</option>
                            <option value="battery_replacement">Battery Replacement</option>
                            <option value="full_service">Full Service</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-red-400 text-lg font-semibold mb-2" htmlFor="appointmentDate">Preferred Appointment Date</label>
                        <input
                            type="date"
                            id="appointmentDate"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-red-400 text-lg font-semibold mb-2" htmlFor="appointmentTime">Preferred Appointment Time</label>
                        <input
                            type="time"
                            id="appointmentTime"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                        />
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-red-400 text-lg font-semibold mb-2" htmlFor="serviceLocation">Service Location</label>
                        <input
                            type="text"
                            id="serviceLocation"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                            placeholder="Enter your preferred service location"
                        />
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-red-400 text-lg font-semibold mb-2" htmlFor="additionalDetails">Additional Details</label>
                        <textarea
                            id="additionalDetails"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                            placeholder="Enter additional details about the maintenance"
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="col-span-1 sm:col-span-2 flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
                        >
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Maintenance;