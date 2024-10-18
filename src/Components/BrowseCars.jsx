import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const fetchCars = async () => {
    return [
        { id: 1, make: 'Toyota', model: 'Corolla', year: 2020, price: '$20,000', img: 'https://imgcdn.zigwheels.pk/large/gallery/exterior/14/118/toyota-corolla-front-angle-low-view.jpg' },
        { id: 2, make: 'Honda', model: 'Civic', year: 2019, price: '$18,500', img: 'https://cache4.pakwheels.com/system/car_generation_pictures/7370/original/Cover.jpg?1677570254' },
        { id: 3, make: 'Ford', model: 'Mustang', year: 2021, price: '$30,000', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXo8lJkh5R8kaQi3lIl2yipLmX6B-hkQ1bYw&s' },
    ];
};

function BrowseCars() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCars = async () => {
            try {
                const carData = await fetchCars();
                setCars(carData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadCars();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="mt-28 mb-10 sm:mt-16 sm:mb-16 md:mt-20 md:mb-20 lg:mt-4 xl:mt-4 lg:mb-24 container mx-auto px-4 py-10 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Browse Cars</h1>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {cars.map((car) => (
                    <div key={car.id} className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
                        <img
                            src={car.img}
                            alt={`${car.make} ${car.model}`}
                            className="w-full h-52 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{car.make} {car.model}</h3>
                        <p className="text-lg text-gray-600 mb-2">Year: <span className="font-medium">{car.year}</span></p>
                        <p className="text-lg text-gray-600 mb-4">Price: <span className="font-medium">{car.price}</span></p>
                        <button className="mt-4 px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
BrowseCars.propTypes = {
    cars: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        make: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        price: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
    })),
};

export default BrowseCars;
