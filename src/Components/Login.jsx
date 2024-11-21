import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
            } else {
                // Save the email to local storage on successful login
                localStorage.setItem('userEmail', email);       //email stored in local stprage means user hai logged in tou 
                navigate("/profilepage");                       // issi ko use kro to change header
                window.location.reload();       //forcibly reloading to update all the information as well as header (Though not recommended but still works xD)
            }

        } catch (err) {
            console.error("Error:", err);
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-6 mt-2">
            <div className="w-full max-w-md bg-gray-950 shadow-lg rounded-lg p-8 border border-red-400">
                <h2 className="text-2xl font-bold mb-6 text-center text-red-400">CarBazaar</h2>
                <p className="text-lg text-center text-gray-300 mb-4">Please log in to continue</p>
                {error && <p className="text-red-400 text-center mb-4">{error}</p>}
                <form onSubmit={validate} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 font-semibold mb-2" htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Email'
                            required
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-white placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 font-semibold mb-2" htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Enter Your Password'
                            required
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-white placeholder-gray-500"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type='submit'
                            disabled={loading}
                            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <Link
                        to="/AdminLogin"
                        className="text-red-400 hover:text-red-400 font-semibold transition duration-300 ease-in-out"
                    >
                        Login as Admin
                    </Link>
                </div>
                <div className="mt-4 text-center">
                    <Link
                        to="/Signup"
                        className="text-red-400 hover:text-red-400 font-semibold transition duration-300 ease-in-out"
                    >
                        Don't have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;