import React, { useState } from 'react';
// import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';

function Signup() {
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = (e) => {
        e.preventDefault();

        const { password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setInfo("Passwords do not match");
            return;
        }

        setLoading(true);

        // const emailParams = {
        //     username: formData.username,
        //     email: formData.email,
        // };

    //     emailjs.send('service_und4kzv', 'template_tnx8b7p', emailParams, 'e63xOndbGeAyh7oKO')
    //         .then((result) => {
    //             console.log('Email sent successfully:', result.text);
    //             setInfo("Form Submitted Successfully");
    //             setLoading(false);
    //         }, (error) => {
    //             console.error('Email sending error:', error.text);
    //             setInfo("Failed to send email");
    //             setLoading(false);
    //         });
    // 
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 mt-12">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">New to CarBazaar?</h2>
                <p className="text-lg text-center text-gray-600 mb-4">Please sign up to continue</p>
                <form onSubmit={validate} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Username:</label>
                        <input
                            type="text"
                            name="username"
                            placeholder='Username'
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder='Email'
                            required
                            value={formData.email}
                            onChange={handleChange}
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
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder='Re-enter Password'
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type='submit'
                            disabled={loading}
                            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <Link
                        to="/Login"
                        className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                        Already have an account? Log in
                    </Link>
                </div>
                {info && <h3 className="mt-4 text-center text-red-600">{info}</h3>}
            </div>
        </div>
    );
}

export default Signup;
