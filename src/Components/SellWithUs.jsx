import React, { useState } from 'react';
import axios from 'axios';

function SellWithUs() {
    const [formData, setFormData] = useState({
        price: '',
        description: '',
        images: '',
        email: '',
        make: '',
        model: '',
        year: '',
        fuel_type: '',
        mileage: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
    
        // Prepare form data for submission
        const formDataToSend = new FormData();
    
        // Append non-image fields
        Object.keys(formData).forEach(key => {
            if (key !== 'images') {  // Don't append 'images' here
                formDataToSend.append(key, formData[key]);
            }
        });
    
        // Append image files directly from file input
        const imageFiles = document.getElementById('images').files;
        for (let i = 0; i < imageFiles.length; i++) {
            formDataToSend.append('images', imageFiles[i]);  // Make sure the field matches the backend (images)
        }
    
        try {
            // Send the form data (including images) to the backend
            const response = await axios.post('http://localhost:5000/api/post', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Ensure it's recognized as multipart
                },
            });
            setSuccess('Your car has been listed successfully!');
            setFormData({
                price: '',
                description: '',
                images: '',  // Reset 'images' after successful form submission
                email: '',
                make: '',
                model: '',
                year: '',
                fuel_type: '',
                mileage: ''
            });
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while submitting the form.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden m-10">
                <div className="px-6 py-8">
                    <h2 className="text-3xl font-bold text-center text-red-500 mb-6">Sell Your Car</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="make" className="block text-sm font-medium text-gray-300">Make</label>
                                <input
                                    type="text"
                                    id="make"
                                    name="make"
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    value={formData.make}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="model" className="block text-sm font-medium text-gray-300">Model</label>
                                <input
                                    type="text"
                                    id="model"
                                    name="model"
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    value={formData.model}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="year" className="block text-sm font-medium text-gray-300">Year</label>
                                <input
                                    type="number"
                                    id="year"
                                    name="year"
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    value={formData.year}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="fuel_type" className="block text-sm font-medium text-gray-300">Fuel Type</label>
                                <select
                                    id="fuel_type"
                                    name="fuel_type"
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    value={formData.fuel_type}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Fuel Type</option>
                                    <option value="Petrol">Petrol</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Electric">Electric</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="mileage" className="block text-sm font-medium text-gray-300">Mileage</label>
                                <input
                                    type="number"
                                    id="mileage"
                                    name="mileage"
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    value={formData.mileage}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-300">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="3"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="images" className="block text-sm font-medium text-gray-300">Images</label>
                            <input
                                type="file"
                                id="images"
                                name="images"
                                multiple
                                required
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                value={formData.images}
                                onChange={handleChange}
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {success && <p className="text-green-500 text-sm">{success}</p>}
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                            >
                                {loading ? 'Submitting...' : 'List Your Car'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SellWithUs;

