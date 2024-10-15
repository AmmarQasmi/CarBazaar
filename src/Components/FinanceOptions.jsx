import React from 'react';

function FinanceOptions() {
    return (
        <div className="mt-16 max-w-screen-xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Finance Options</h1>
            <p className="mb-4 text-lg text-gray-700">
                At our dealership, we offer a variety of financing options to help you purchase your next vehicle. Whether you're looking to buy or lease, we have solutions tailored to fit your needs.
            </p>

            <h2 className="text-3xl font-semibold mt-6 mb-4 text-gray-800">Types of Financing</h2>
            <ul className="list-disc list-inside mb-6 text-gray-700">
                <li className="mb-2">Auto Loans</li>
                <li className="mb-2">Leasing Options</li>
                <li className="mb-2">Special Financing for Qualified Buyers</li>
            </ul>

            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Get Pre-Approved</h2>
            <p className="mb-4 text-lg text-gray-700">
                To streamline your car-buying process, consider getting pre-approved for financing. Fill out our secure application form to see what you qualify for.
            </p>
            <div className="text-center">
                <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
                    Apply Now
                </button>
            </div>

            <h2 className="text-3xl font-semibold mt-6 mb-4 text-gray-500">Frequently Asked Questions</h2>
            <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-300">
                    <h3 className="font-bold text-lg text-gray-800">1. What credit score do I need?</h3>
                    <p className="text-gray-700">Your credit score can impact the financing options available to you. Generally, a score of 700 or higher will qualify you for better rates.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-300">
                    <h3 className="font-bold text-lg text-gray-800">2. Can I trade in my current vehicle?</h3>
                    <p className="text-gray-700">Yes! We accept trade-ins as part of your financing deal, which can help reduce the overall cost of your new vehicle.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-300">
                    <h3 className="font-bold text-lg text-gray-800">3. How long does the financing process take?</h3>
                    <p className="text-gray-700">The financing process can typically be completed in about an hour, depending on the complexity of your situation.</p>
                </div>
            </div>
        </div>
    );
}

export default FinanceOptions;
