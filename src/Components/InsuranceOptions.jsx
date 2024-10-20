import React, { useState } from 'react';

function InsuranceOptions() {
    const [showForm, setShowForm] = useState(false);

    // Function to toggle the form visibility
    const handleApplyNow = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-600 to-gray-400 p-4 sm:p-6 md:p-8 mt-28 mb-4 sm:mt-6 sm:mb-6 md:mt-16 md:mb-8 lg:mt-4 lg:mb-4">
            {/* Container for Insurance Options */}
            <div className="max-w-screen-lg mx-auto bg-white rounded-lg shadow-lg p-8">
                <div className="bg-gray-100 p-8">
                    <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Insurance Options</h1>

                    <p className="mb-8 text-lg text-gray-700 text-center max-w-2xl mx-auto leading-relaxed">
                        We provide a range of insurance options to protect you and your vehicle.
                        Explore our tailored solutions designed to meet your needs.
                    </p>

                    {/* Types of Insurance Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-8 hover:bg-gray-50 hover:cursor-pointer">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Types of Insurance</h2>
                        <ul className="list-disc list-inside mb-6 text-gray-700 space-y-3">
                            <li>Comprehensive Coverage</li>
                            <li>Collision Coverage</li>
                            <li>Liability Insurance</li>
                        </ul>
                    </div>

                    {/* Quote Request Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-gray-50 hover:cursor-pointer">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Get a Quote</h2>
                        <p className="mb-6 text-lg text-gray-700 leading-relaxed">
                            Ready to protect your investment? Fill out our secure application form to receive a personalized insurance quote.
                        </p>
                        <div className="text-center">
                            <button
                                onClick={handleApplyNow}
                                className="bg-blue-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                            >
                                {showForm ? 'Close Form' : 'Request a Quote'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form Rendering Based on State */}
                {showForm && (
                    <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold mb-4">Insurance Application Form</h3>
                        <form className="grid gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                                {/* Contact Information */}
                                <div>
                                    <label className="block text-gray-700">Contact Number</label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                                        placeholder="Enter your contact number"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Email Address */}
                                <div>
                                    <label className="block text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                                        placeholder="Enter your email address"
                                        required
                                    />
                                </div>
                                {/* Vehicle Information */}
                                <div>
                                    <label className="block text-gray-700">Vehicle Model</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                                        placeholder="Enter your vehicle model"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Insurance Coverage Type */}
                            <div>
                                <label className="block text-gray-700">Coverage Type</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                                    required
                                >
                                    <option value="">Select Coverage Type</option>
                                    <option value="comprehensive">Comprehensive</option>
                                    <option value="collision">Collision</option>
                                    <option value="liability">Liability</option>
                                </select>
                            </div>

                            {/* Additional Comments */}
                            <div>
                                <label className="block text-gray-700">Additional Comments</label>
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                                    placeholder="Any additional information"
                                    rows="4"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* FAQ Section */}
                <div className="bg-gray-100 p-8">
                    <h2 className="text-3xl font-semibold mt-8 mb-6 text-gray-800 text-center">Frequently Asked Questions</h2>

                    <div className="space-y-6 max-w-3xl mx-auto">
                        {/* Question 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
                            <h3 className="font-bold text-xl text-gray-800 mb-2">1. What factors affect my insurance premium?</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Your premium can be influenced by various factors including your driving history, vehicle type, and coverage level.
                            </p>
                        </div>

                        {/* Question 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
                            <h3 className="font-bold text-xl text-gray-800 mb-2">2. Can I customize my insurance policy?</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Yes! We offer customizable policies to fit your unique needs and preferences.
                            </p>
                        </div>

                        {/* Question 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
                            <h3 className="font-bold text-xl text-gray-800 mb-2">3. How do I file a claim?</h3>
                            <p className="text-gray-700 leading-relaxed">
                                You can file a claim online or by contacting our customer service team for assistance.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default InsuranceOptions;