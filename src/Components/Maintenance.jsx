import React, { useState, useEffect } from 'react';

function Maintenance() {
    const images = [
        "https://wallpapers.com/images/hd/gray-gradient-background-l63d92e4zrvl6f6d.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx1IzBAx05Y8zlghbApMHxy54uT3XU9o8RuA&s",
        "https://www.shutterstock.com/image-photo/dark-concrete-wall-floor-background-600nw-1937061217.jpg",
    ];

    const [currentImage, setCurrentImage] = useState(0);

    // Automatically change images every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    // Handlers for manual navigation
    const goToPrevious = () => {
        setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-r from-gray-600 via-gray-500 to-gray-300 overflow-hidden">
            {/* Background Images */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${images[currentImage]})`,
                    transition: 'background-image 1s ease-in-out',
                }}
            ></div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrevious}
                className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 z-10"
            >
                &#9664;
            </button>
            <button
                onClick={goToNext}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 z-10"
            >
                &#9654;
            </button>

            {/* Form Container */}
            <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-lg mx-auto relative z-20 mt-20 sm:mt-10 md:mt-10 lg:mt-5 xl:mt-5">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Car Maintenance Request</h1>

                <form className="grid grid-cols-1 gap-6 sm:gap-8">
                    {/* Full Name */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Contact Information */}
                    <div className="col-span-1 sm:col-span-1">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Contact Number</label>
                        <input
                            type="tel"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your contact number"
                        />
                    </div>

                    <div className="col-span-1 sm:col-span-1">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your email address"
                        />
                    </div>

                    {/* Vehicle Information */}
                    <div className="col-span-1 sm:col-span-1">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Car Model</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your car model"
                        />
                    </div>

                    <div className="col-span-1 sm:col-span-1">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Vehicle Registration Number</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your vehicle registration number"
                        />
                    </div>

                    {/* Service Type */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Service Type</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            <option value="">Select Service Type</option>
                            <option value="oil_change">Oil Change</option>
                            <option value="tire_change">Tire Change</option>
                            <option value="battery_replacement">Battery Replacement</option>
                            <option value="full_service">Full Service</option>
                        </select>
                    </div>

                    {/* Appointment Date and Time */}
                    <div className="col-span-1 sm:col-span-1">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Preferred Appointment Date</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div className="col-span-1 sm:col-span-1">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Preferred Appointment Time</label>
                        <input
                            type="time"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    {/* Service Location */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Service Location</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your preferred service location"
                        />
                    </div>

                    {/* Additional Details */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Additional Details</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter additional details about the maintenance"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-1 sm:col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
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
