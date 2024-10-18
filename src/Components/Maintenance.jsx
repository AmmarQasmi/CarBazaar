import React from 'react';

function Maintenance() {
    return (
        <div className="mt-20 min-h-screen bg-gradient-to-r from-gray-600 via-gray-500 to-gray-300 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 sm:mt-6 md:mt-8 lg:mt-0 xl:mt-0 ">
            <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-4xl mx-auto grid grid-cols-1 gap-6 mt-10 mb-10">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Car Maintenance Request</h1>

                <form className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Full Name */}
                    <div className="col-span-2">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Contact Information */}
                    <div>
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Contact Number</label>
                        <input
                            type="tel"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your contact number"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your email address"
                        />
                    </div>

                    {/* Vehicle Information */}
                    <div>
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Car Model</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your car model"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Vehicle Registration Number</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your vehicle registration number"
                        />
                    </div>

                    {/* Service Type */}
                    <div className="col-span-2">
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
                    <div>
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Preferred Appointment Date</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Preferred Appointment Time</label>
                        <input
                            type="time"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    {/* Service Location */}
                    <div className="col-span-2">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Service Location</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your preferred service location"
                        />
                    </div>

                    {/* Additional Details */}
                    <div className="col-span-2">
                        <label className="block text-gray-700 text-lg font-semibold mb-2">Additional Details</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter additional details about the maintenance"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2 flex justify-center">
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
