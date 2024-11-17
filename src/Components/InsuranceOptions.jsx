import React, { useState } from 'react';
import axios from 'axios';

function InsuranceOptions() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        coverage_amount: '',
        start_date: '',
        end_date: '',
        services_service_id: '',
        vehicle_v_id: '',
        users_u_id: '',
        email: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleApplyNow = () => {
        setShowForm(!showForm);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/insurance', formData);
            setSuccess('Insurance application submitted successfully!');
            setError('');
            console.log(response.data);
        } catch (err) {
            setError('Failed to submit application. Please try again.');
            setSuccess('');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-4 sm:p-6 md:p-8 mt-28 mb-4 sm:mt-6 sm:mb-6 md:mt-16 md:mb-8 lg:mt-4 lg:mb-4">
            <div className="max-w-screen-lg mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="bg-gray-900 p-8 rounded-lg">
                    <h1 className="text-4xl font-bold mb-8 text-center text-red-500">Insurance Options</h1>

                    <p className="mb-8 text-lg text-gray-300 text-center max-w-2xl mx-auto leading-relaxed">
                        We provide a range of insurance options to protect you and your vehicle.
                        Explore our tailored solutions designed to meet your needs.
                    </p>

                    <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-8 hover:bg-gray-700 transition duration-300">
                        <h2 className="text-3xl font-semibold mb-6 text-red-400">Types of Insurance</h2>
                        <ul className="list-disc list-inside mb-6 text-gray-300 space-y-3">
                            <li>Comprehensive Coverage</li>
                            <li>Collision Coverage</li>
                            <li>Liability Insurance</li>
                        </ul>
                    </div>

                    <div className="bg-gray-800 shadow-lg rounded-lg p-6 hover:bg-gray-700 transition duration-300">
                        <h2 className="text-3xl font-semibold mb-6 text-red-400">Get a Quote</h2>
                        <p className="mb-6 text-lg text-gray-300 leading-relaxed">
                            Ready to protect your investment? Fill out our secure application form to receive a personalized insurance quote.
                        </p>
                        <div className="text-center">
                            <button
                                onClick={handleApplyNow}
                                className="bg-red-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
                            >
                                {showForm ? 'Close Form' : 'Request a Quote'}
                            </button>
                        </div>
                    </div>
                </div>

                {showForm && (
                    <div className="mt-8 p-6 bg-gray-900 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold mb-4 text-red-500">Insurance Application Form</h3>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        {success && <p className="text-green-500 mb-4">{success}</p>}
                        <form onSubmit={handleSubmit} className="grid gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300">Coverage Amount</label>
                                    <input
                                        type="number"
                                        name="coverage_amount"
                                        value={formData.coverage_amount}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-red-500 text-white"
                                        placeholder="Enter coverage amount"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300">Start Date</label>
                                    <input
                                        type="date"
                                        name="start_date"
                                        value={formData.start_date}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-red-500 text-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300">End Date</label>
                                    <input
                                        type="date"
                                        name="end_date"
                                        value={formData.end_date}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-red-500 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300">Service ID</label>
                                    <input
                                        type="number"
                                        name="services_service_id"
                                        value={formData.services_service_id}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-red-500 text-white"
                                        placeholder="Enter service ID"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300">Vehicle ID</label>
                                    <input
                                        type="number"
                                        name="vehicle_v_id"
                                        value={formData.vehicle_v_id}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-red-500 text-white"
                                        placeholder="Enter vehicle ID"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300">User ID</label>
                                    <input
                                        type="number"
                                        name="users_u_id"
                                        value={formData.users_u_id}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-red-500 text-white"
                                        placeholder="Enter user ID"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-red-500 text-white"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300 disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : null}
                                    {isLoading ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-gray-900 p-8 rounded-lg mt-8">
                    <h2 className="text-3xl font-semibold mb-6 text-red-500 text-center">Frequently Asked Questions</h2>

                    <div className="space-y-6 max-w-3xl mx-auto">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
                            <h3 className="font-bold text-xl text-red-400 mb-2">1. What factors affect my insurance premium?</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Your premium can be influenced by various factors including your driving history, vehicle type, and coverage level.
                            </p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
                            <h3 className="font-bold text-xl text-red-400 mb-2">2. Can I customize my insurance policy?</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Yes! We offer customizable policies to fit your unique needs and preferences.
                            </p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
                            <h3 className="font-bold text-xl text-red-400 mb-2">3. How do I file a claim?</h3>
                            <p className="text-gray-300 leading-relaxed">
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