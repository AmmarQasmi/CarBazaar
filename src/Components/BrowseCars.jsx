import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/default-image-url.jpg';

const BrowseCar = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vehicles', {
          headers: { 'Cache-Control': 'no-cache' },
        });

        // Validate and set the response data correctly
        if (response.data && Array.isArray(response.data.data)) {
          setCars(response.data.data); // Use `data` field from response
        } else {
          throw new Error('Unexpected API response structure.');
        }
      } catch (error) {
        console.error(error);
        setError('Failed to fetch car data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader border-t-4 border-red-500 rounded-full w-12 h-12 animate-spin"></div>
        <p className="ml-4 text-red-500 text-xl">Loading cars...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center text-xl">{error}</p>;
  }

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-md pt-20 pb-20">
      <h2 className="text-2xl font-semibold mb-4 text-red-500">Browse Cars</h2>

      <div className="flex flex-row items-center sm:flex-row md:flex-col md:items-end gap-4 p-2">
        <Link
          to="/purchase"
          className="bg-red-600 text-white py-2 px-4 rounded transition-colors duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Purchase
        </Link>

        <Link
          to="/AdvanceSearch"
          className="bg-red-600 text-white py-2 px-4 rounded transition-colors duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Filter Out
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 scrollEffect2">
        {cars.map((car) => {
          const carImageUrl = car.vehicle_image ? car.vehicle_image : defaultImage;

          return (
            <article
              key={car.v_id} // Use v_id as the unique key
              className="car-card bg-black rounded-lg shadow-lg p-4 text-center transition-transform transform hover:scale-105 border border-red-500"
            >
              {car.v_status !== 'Available' && (
                <div
                  className="absolute top-2 right-2 bg-red-400 rounded-full px-4 py-2"
                  aria-label="Car not available"
                >
                  <p className="text-white font-bold text-xl">N/A</p>
                </div>
              )}

              <img
                src={carImageUrl}
                alt={`${car.make || 'Unknown'} ${car.model || 'Model'}`}
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
                className="rounded-md mb-2 w-full h-48 object-contain"
              />
              <h3 className="text-lg font-bold text-white">
                {car.make || 'Unknown'} {car.model || 'Model'}
              </h3>
              <p className="text-sm text-gray-400">Year: {car.year || 'Unknown'}</p>
              <p className="text-sm text-gray-400">Fuel Type: {car.fuel_type || 'Unknown'}</p>
              <p className="text-sm text-gray-400">Mileage: {car.mileage || '0'} km</p>
              <p className="text-lg font-semibold text-red-500">Price: ${car.price || 'N/A'}</p>
              <p className="text-sm text-gray-400">{car.description || 'No description available'}</p>
              <p
                className={`text-sm font-semibold ${car.v_status === 'Available' ? 'text-green-500' : 'text-red-700'
                  }`}
              >
                {car.v_status || 'Unavailable'}
              </p>
              {car.offeredby == 'CB' && (
                <p
                  className="absolute top-2 left-2 bg-red-400 rounded-full px-4 py-2"
                  aria-label="New Models"
                >
                  <p className="text-white font-bold text-xl">CB</p>
                </p>
              )}

            </article>
          );
        })}
      </div>
    </div>
  );
};

export default BrowseCar;
