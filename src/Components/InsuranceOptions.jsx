import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Shield, Car, FileText, ChevronDown, ChevronUp } from 'lucide-react';

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
    const [expandedFaq, setExpandedFaq] = useState(null);

    const handleApplyNow = () => {
        setShowForm(!showForm);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validServiceIds = ['11', '12', '13'];

        if (!validServiceIds.includes(formData.services_service_id)) {
            setError('Invalid Service ID. Please enter 11, 12, or 13.');
            setSuccess('');
            return;
        }

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

    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    const faqData = [
        {
            question: "What factors affect my insurance premium?",
            answer: "Your premium can be influenced by various factors including your driving history, vehicle type, coverage level, age, location, and credit score."
        },
        {
            question: "Can I customize my insurance policy?",
            answer: "Yes! We offer customizable policies to fit your unique needs and preferences. You can adjust coverage levels, add or remove specific protections, and choose from various deductible options."
        },
        {
            question: "How do I file a claim?",
            answer: "You can file a claim online through our customer portal, via our mobile app, or by contacting our 24/7 customer service team. We strive to make the claims process as smooth and efficient as possible."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 text-red-500 p-8">Insurance Options</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Protect your investment with our tailored insurance solutions.
                    </p>
                </header>

                <section className="bg-gray-800 rounded-lg shadow-xl p-4 mb-12">
                    <h2 className="text-3xl font-semibold mb-6 text-red-400 flex items-center">
                        <Shield className="mr-2" /> Types of Insurance
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "Comprehensive", id: 11, icon: Car },
                            { title: "Collision", id: 12, icon: Car },
                            { title: "Liability", id: 13, icon: FileText }
                        ].map((type) => (
                            <div key={type.id} className="bg-gray-700 p-6 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
                                <type.icon className="w-12 h-12 text-red-400 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                                <p className="text-gray-300">Service ID: {type.id}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-gray-800 rounded-lg shadow-xl p-8 mb-12">
                    <h2 className="text-3xl font-semibold mb-6 text-red-400">Vehicle Registration</h2>
                    <p className="text-gray-300 mb-6">
                        Please register your vehicle to receive the necessary IDs for insurance application.
                    </p>
                    <NavLink
                        to="/register"
                        className="inline-block bg-red-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-600 transition-colors duration-300"
                    >
                        Register Vehicle
                    </NavLink>
                </section>

                <section className="bg-gray-800 rounded-lg shadow-xl p-8 mb-12">
                    <h2 className="text-3xl font-semibold mb-6 text-red-400">Get a Quote</h2>
                    <p className="mb-6 text-gray-300">
                        Ready to protect your investment? Fill out our secure application form to receive a personalized insurance quote.
                    </p>
                    <button
                        onClick={handleApplyNow}
                        className="bg-red-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
                    >
                        {showForm ? 'Close Form' : 'Request a Quote'}
                    </button>

                    {showForm && (
                        <div className="mt-8 bg-gray-700 rounded-lg shadow-md p-6">
                            <h3 className="text-2xl font-bold mb-4 text-red-400">Insurance Application Form</h3>
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            {success && <p className="text-green-500 mb-4">{success}</p>}
                            <form onSubmit={handleSubmit} className="grid gap-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-300 mb-2">Coverage Amount</label>
                                        <input
                                            type="number"
                                            name="coverage_amount"
                                            value={formData.coverage_amount}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md focus:ring-2 focus:ring-red-500 text-white"
                                            placeholder="Enter coverage amount"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 mb-2">Start Date</label>
                                        <input
                                            type="date"
                                            name="start_date"
                                            value={formData.start_date}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md focus:ring-2 focus:ring-red-500 text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 mb-2">End Date</label>
                                        <input
                                            type="date"
                                            name="end_date"
                                            value={formData.end_date}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md focus:ring-2 focus:ring-red-500 text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 mb-2">Service ID</label>
                                        <input
                                            type="number"
                                            name="services_service_id"
                                            value={formData.services_service_id}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md focus:ring-2 focus:ring-red-500 text-white"
                                            placeholder="Enter service ID"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 mb-2">Vehicle ID</label>
                                        <input
                                            type="number"
                                            name="vehicle_v_id"
                                            value={formData.vehicle_v_id}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md focus:ring-2 focus:ring-red-500 text-white"
                                            placeholder="Enter vehicle ID"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 mb-2">User ID</label>
                                        <input
                                            type="number"
                                            name="users_u_id"
                                            value={formData.users_u_id}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md focus:ring-2 focus:ring-red-500 text-white"
                                            placeholder="Enter user ID"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-md focus:ring-2 focus:ring-red-500 text-white"
                                        placeholder="Enter your email address"
                                        required
                                    />
                                </div>
                                <div className="text-center mt-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300 disabled:opacity-50"
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
                </section>

                <section className="bg-gray-800 rounded-lg shadow-xl p-8">
                    <h2 className="text-3xl font-semibold mb-6 text-red-400 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <div key={index} className="bg-gray-700 rounded-lg overflow-hidden">
                                <button
                                    className="w-full text-left p-4 focus:outline-none hover:bg-gray-600 transition duration-300 flex justify-between items-center"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span className="font-semibold text-lg">{faq.question}</span>
                                    {expandedFaq === index ? <ChevronUp /> : <ChevronDown />}
                                </button>
                                {expandedFaq === index && (
                                    <div className="p-4 bg-gray-600">
                                        <p className="text-gray-300">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default InsuranceOptions;

