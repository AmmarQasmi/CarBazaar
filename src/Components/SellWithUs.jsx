import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function SellWithUs() {
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [variant, setVariant] = useState('');
    const [sellerId, setSellerId] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        // Create FormData to send as multipart/form-data
        const formData = new FormData();
        formData.append('price', price);
        formData.append('description', description);
        images.forEach((image) => formData.append('images', image));
        formData.append('make', make);
        formData.append('model', model);
        formData.append('variant', variant);
        formData.append('seller_id', sellerId);

        try {
            const response = await fetch('http://localhost:5000/api/post', {
                method: 'POST',
                body: formData,
            });            

            const result = await response.json();

            if (response.ok) {
                setSuccessMessage('Car listed successfully!');
            } else {
                setErrorMessage(result.message || 'Failed to list the car.');
            }
        } catch (error) {
            setErrorMessage('An error occurred while submitting the form.');
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <section className='pt-20 pb-10 px-4 sm:px-6 lg:px-8'>
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-2xl overflow-hidden">
                    <div className="p-8">
                        <h2 className="text-3xl font-bold mb-6 text-center text-red-500">Sell Your Car with Us</h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <h5 className="text-xl font-bold mb-4 text-left border-b border-red-500 pb-2">Car Details</h5>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" htmlFor="make">Make</label>
                                        <input
                                            id="make"
                                            value={make}
                                            onChange={(e) => setMake(e.target.value)}
                                            placeholder='Enter Company Name'
                                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2" htmlFor="model">Model</label>
                                        <input
                                            id="model"
                                            value={model}
                                            onChange={(e) => setModel(e.target.value)}
                                            placeholder='Enter Specific Model'
                                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium mb-2" htmlFor="variant">Variant</label>
                                    <select
                                        id="variant"
                                        value={variant}
                                        onChange={(e) => setVariant(e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                                    >
                                        <option value="" disabled>Select Variant</option>
                                        <option value="base">Base</option>
                                        <option value="sport">Sport</option>
                                        <option value="luxury">Luxury</option>
                                        <option value="hybrid">Hybrid</option>
                                        <option value="electric">Electric</option>
                                    </select>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium mb-2" htmlFor="images">Upload Car Photos</label>
                                    <input
                                        type='file'
                                        id='images'
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        multiple
                                    />
                                </div>
                            </div>

                            <h5 className="text-xl font-bold mb-4 text-left border-b border-red-500 pb-2">Post Details</h5>
                            <div>
                                <label className="block text-sm font-medium mb-2" htmlFor="description">Description:</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400"
                                    placeholder="Enter car description"
                                    rows="4"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" htmlFor="price">Price:</label>
                                <input
                                    type="number"
                                    id="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400"
                                    placeholder="Enter price"
                                />
                            </div>

                            {errorMessage && (
                                <p className="text-red-500 text-sm">{errorMessage}</p>
                            )}

                            {successMessage && (
                                <p className="text-green-500 text-sm">{successMessage}</p>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Publishing...' : 'Publish Ad'}
                            </button>
                        </form>
                    </div>

                    <div className="bg-gray-800 p-6 flex justify-between items-center text-sm">
                        <p className="text-gray-400">© 2024 CarBazaar. All rights reserved.</p>
                        <NavLink to="/Contact" className="text-red-400 hover:text-red-300 transition-colors">
                            Contact us
                        </NavLink>
                    </div>
                </div>
            </section>

            <section className='relative p-8'>
                <div className="md:fixed right-4 bottom-4 flex-col space-y-4 md:flex md:flex-col md:space-y-4 hidden">
                    <NavLink
                        to='/join'
                        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                        Join us Instead?
                    </NavLink>
                    <NavLink
                        to='/partner'
                        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                        Partner with us Instead?
                    </NavLink>
                </div>
            </section>

            {/* Buttons for smaller screens (non-fixed) */}
            <section className="block md:hidden text-center mt-6 space-y-4">
                <NavLink
                    to='/join'
                    className="w-full block bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    Join us Instead?
                </NavLink>
                <NavLink
                    to='/partner'
                    className="w-full block bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    Partner with us Instead?
                </NavLink>
            </section>
        </div>
    );
}

export default SellWithUs;
