import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Car, DollarSign, Filter, ShoppingCart } from 'lucide-react';

const defaultImage = '/placeholder.svg?height=200&width=300';

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

        if (response.data && Array.isArray(response.data.data)) {
          // Filter cars to only include those with 'Available' status
          const availableCars = response.data.data.filter(car => car.v_status === 'Available');
          setCars(availableCars);
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
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="loader border-t-4 border-red-500 rounded-full w-12 h-12 animate-spin"></div>
        <p className="ml-4 text-red-500 text-xl">Loading available cars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <p className="text-red-500 text-center text-xl bg-gray-800 p-6 rounded-lg shadow-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6 pt-20 pb-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-red-500 text-center">Available Cars</h2>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <p className="text-gray-300 mb-4 sm:mb-0">
          </p>
          <div className="flex gap-4">
            <Link
              to="/purchase"
              className="bg-red-600 text-white py-2 px-4 rounded transition-colors duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
            >
              <ShoppingCart className="mr-2" size={18} />
              Purchase
            </Link>
            <Link
              to="/AdvanceSearch"
              className="bg-red-600 text-white py-2 px-4 rounded transition-colors duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
            >
              <Filter className="mr-2" size={18} />
              Filter
            </Link>
          </div>
        </div>

        {cars.length === 0 ? (
          <p className="text-center text-gray-400 text-xl mt-12">No available cars found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <article
                key={car.v_id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 border border-red-500"
              >
                <img
                  src={car.vehicle_image || defaultImage}
                  alt={`${car.make || 'Unknown'} ${car.model || 'Model'}`}
                  onError={(e) => {
                    e.target.src = defaultImage;
                  }}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {car.make || 'Unknown'} {car.model || 'Model'}
                  </h3>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-400">Year: {car.year || 'Unknown'}</p>
                    <p className="text-sm text-gray-400">Fuel: {car.fuel_type || 'Unknown'}</p>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Mileage: {car.mileage || '0'} km</p>
                  <p className="text-lg font-semibold text-red-500 mb-2 flex items-center">
                    <DollarSign size={18} className="mr-1" />
                    {car.price || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-400 mb-2 line-clamp-2">{car.description || 'No description available'}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-green-500 bg-green-100 px-2 py-1 rounded">
                      Available
                    </span>
                    {car.offeredby === 'CB' && (
                      <span className="text-sm font-semibold text-red-500 bg-red-100 px-2 py-1 rounded">
                        CarBazaar
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseCar;

