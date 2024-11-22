import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegisterVehicle = () => {
    const [vehicleMake, setVehicleMake] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [vehicleYear, setVehicleYear] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState(null);
    const [vehicleId, setVehicleId] = useState(null);

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setUserEmail(storedEmail);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userEmail) {
            alert('Please enter your email.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/vehicles/register', {
                vehicleMake,
                vehicleModel,
                vehicleYear,
                userEmail,
            });

            setUserId(response.data.userId);
            setVehicleId(response.data.vehicleId);
            alert('Vehicle registered successfully!');

            if (!localStorage.getItem('userEmail')) {
                localStorage.setItem('userEmail', userEmail);
            }
        } catch (err) {
            console.error(err);
            alert('Error registering vehicle. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-black text-red-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-red-500">
                        Register Your Vehicle
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Enter details to get registered and know your User ID and Vehicle ID
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800"
                                placeholder="Email address"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="vehicle-make" className="sr-only">
                                Vehicle Make
                            </label>
                            <input
                                id="vehicle-make"
                                name="vehicleMake"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-gray-500 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800"
                                placeholder="Vehicle Make"
                                value={vehicleMake}
                                onChange={(e) => setVehicleMake(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="vehicle-model" className="sr-only">
                                Vehicle Model
                            </label>
                            <input
                                id="vehicle-model"
                                name="vehicleModel"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-gray-500 text-white focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800"
                                placeholder="Vehicle Model"
                                value={vehicleModel}
                                onChange={(e) => setVehicleModel(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="vehicle-year" className="sr-only">
                                Vehicle Year
                            </label>
                            <input
                                id="vehicle-year"
                                name="vehicleYear"
                                type="number"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800"
                                placeholder="Vehicle Year"
                                value={vehicleYear}
                                onChange={(e) => setVehicleYear(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Register Vehicle
                        </button>
                    </div>
                </form>
                {userId && vehicleId && (
                    <div className="mt-8 p-4 bg-gray-800 rounded-md">
                        <h3 className="text-lg font-medium text-red-400 mb-2">Registration Successful!</h3>
                        <p className="text-white">Your User ID: <span className="font-bold">{userId}</span></p>
                        <p className="text-white">Your Vehicle ID: <span className="font-bold">{vehicleId}</span></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterVehicle;

