import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // State for error handling
    const navigate = useNavigate();

    const validate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset error state

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch('http://localhost:5000/login', { // Ensure your backend is running
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message); // Set error message from server response
            } else {
                // Handle successful login
                navigate("/");
            }

        } catch (err) {
            console.error("Error:", err);
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6 mt-2">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">CarBazaar</h2>
                <p className="text-lg text-center text-gray-600 mb-4">Please log in to continue</p>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message */}
                <form onSubmit={validate} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder='Email'
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder='Enter Your Password'
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type='submit'
                            disabled={loading}
                            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <Link
                        to="/Signup"
                        className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                        Don't have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
