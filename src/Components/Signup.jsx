import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false); // State for showing toast
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone_no: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = async (e) => {
        e.preventDefault();

        const { password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setInfo("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    name: formData.username,
                    password: formData.password,
                    phone_no: formData.phone_no
                }),
            });

            const data = await response.json();

            if (data.error) {
                setInfo(data.message);
            } else {
                setInfo("Signup Successful!");
                setShowToast(true); // Show the toast notification
                setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
            }
        } catch (error) {
            console.error(error);
            setInfo("An error occurred during signup");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-20 sm:mt-8 md:mt-8 lg:mt-2 xl:mt-2 min-h-screen flex items-center justify-center bg-gray-900 px-4 py-6">
            <div className="w-full max-w-lg bg-black shadow-lg rounded-lg p-8 mt-12 border border-red-600">
                <h2 className="text-2xl font-bold mb-6 text-center text-red-500">New to CarBazaar?</h2>
                <p className="text-lg text-center text-gray-400 mb-4">Please sign up to continue</p>
                <form onSubmit={validate} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 font-semibold mb-2">Username:</label>
                        <input
                            type="text"
                            name="username"
                            placeholder='Username'
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 font-semibold mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder='Email'
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 font-semibold mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder='Enter Your Password'
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 font-semibold mb-2">Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder='Re-enter Password'
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 font-semibold mb-2">Phone Number:</label>
                        <input
                            type="text"
                            name="phone_no"
                            placeholder='Phone Number'
                            required
                            value={formData.phone_no}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type='submit'
                            disabled={loading}
                            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <Link
                        to="/Login"
                        className="text-red-500 hover:text-red-400 font-semibold transition duration-300 ease-in-out"
                    >
                        Already have an account? Log in
                    </Link>
                </div>
                {info && <h3 className="mt-4 text-center text-red-500">{info}</h3>}

                {/* Toast Notification */}
                {showToast && (
                    <div className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
                        Signup Successful!
                    </div>
                )}
            </div>
        </div>
    );
}

export default Signup;
