import React, { useState, useEffect } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';

const Purchase = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [purchaseComplete, setPurchaseComplete] = useState(false);
    const [purchaseId, setPurchaseId] = useState(null);

    // Filter state
    const [makeFilter, setMakeFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        const fetchCars = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://localhost:5000/cars');
                if (response.data && response.data.vehicles) {
                    setCars(response.data.vehicles);
                    setFilteredCars(response.data.vehicles); // initialize with all cars
                } else {
                    setError('No cars found.');
                }
            } catch (err) {
                setError('Failed to fetch cars. Please try again later.');
                console.error('Error fetching cars:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCars();
    }, []);

    const handleFilterChange = () => {
        let filtered = cars.filter((car) => {
            const isMakeMatch = makeFilter ? car.make.toLowerCase().includes(makeFilter.toLowerCase()) : true;
            const isYearMatch = yearFilter ? car.year.toString() === yearFilter : true;
            const isPriceMatch =
                (minPrice ? car.price >= parseFloat(minPrice) : true) &&
                (maxPrice ? car.price <= parseFloat(maxPrice) : true);
            return isMakeMatch && isYearMatch && isPriceMatch && car.v_status === 'Available';
        });
        setFilteredCars(filtered);
    };

    const handleCarSelect = (car) => {
        setSelectedCar(car);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePurchase = async () => {
        if (!selectedCar || !email) {
            setError('Please select a car and enter your email.');
            return;
        }

        try {
            setIsLoading(true);
            setError('');

            const paymentStatus = 'Pending';
            const paymentType = 'Credit Card';
            const userId = 123; // Should be from the logged-in user

            const response = await axios.post('http://localhost:5000/purchase', {
                userId,
                postId: selectedCar.v_id,
                purchasePrice: selectedCar.price,
                paymentStatus,
                paymentType,
            });

            if (response.data.error) {
                throw new Error(response.data.message);
            }

            const { purchaseId } = response.data;

            const purchaseResponse = await axios.post('http://localhost:5000/purchase-details', {
                purchaseId,
            });

            setPurchaseId(purchaseResponse.data.p_id);

            const templateParams = {
                user_email: email,
                car_id: selectedCar.v_id,
                car_make: selectedCar.make,
                car_model: selectedCar.model,
                price: selectedCar.price,
                payment_status: paymentStatus,
                payment_type: paymentType,
            };

            await emailjs.send(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                templateParams,
                process.env.REACT_APP_EMAILJS_USER_ID
            );

            setPurchaseComplete(true);
        } catch (err) {
            console.error('Purchase error:', err);
            setError('Failed to process purchase. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="p-40 text-white text-center">Loading...</div>;
    }

    if (purchaseComplete) {
        return (
            <div className="text-green-500 text-center p-16">
                Purchase complete! An email has been sent with further details.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-red-500 pt-7">Purchase a Car</h1>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                {/* Filter Options */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Filter Cars</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Make"
                            value={makeFilter}
                            onChange={(e) => setMakeFilter(e.target.value)}
                            className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        />
                        <input
                            type="text"
                            placeholder="Year"
                            value={yearFilter}
                            onChange={(e) => setYearFilter(e.target.value)}
                            className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        />
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                        />
                    </div>
                    <button
                        onClick={handleFilterChange}
                        className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Apply Filters
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Available Cars</h2>
                        <div className="space-y-4 max-h-96 overflow-y-auto scrollEffect2">
                            {filteredCars.map((car) => (
                                car.v_status === 'Available' && (
                                    <div
                                        key={car.v_id}
                                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedCar?.v_id === car.v_id ? 'bg-red-800 border-red-500' : 'bg-gray-800 border-gray-700 hover:border-red-500'}`}
                                        onClick={() => handleCarSelect(car)}
                                    >
                                        <h3 className="font-semibold">{car.make} {car.model}</h3>
                                        <p>Year: {car.year}</p>
                                        <p>Price: ${car.price.toLocaleString()}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Purchase Details</h2>
                        {selectedCar ? (
                            <div className="mb-4">
                                <h3 className="font-semibold">{selectedCar.make} {selectedCar.model}</h3>
                                <p>Year: {selectedCar.year}</p>
                                <p>Price: ${selectedCar.price.toLocaleString()}</p>
                            </div>
                        ) : (
                            <p className="mb-4">Please select a car from the list.</p>
                        )}
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2">Email Address:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                                required
                            />
                        </div>
                        <button
                            onClick={handlePurchase}
                            disabled={!selectedCar || !email}
                            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Complete Purchase
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Purchase;
