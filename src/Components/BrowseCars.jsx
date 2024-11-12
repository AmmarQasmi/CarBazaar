import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/default-image-url.jpg';

const BrowseCar = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cars', { headers: { 'Cache-Control': 'no-cache' } });
        console.log(response.data);
        setCars(response.data.vehicles);
      } catch (error) {
        console.error('Error fetching car data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handlePurchase = (carId) => {
    console.log(`Purchasing car with ID: ${carId}`);
    // Add more purchase logic here
  };

  if (loading) {
    return <p className="text-red-500 text-center text-xl">Loading cars...</p>;
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


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.length > 0 ? (
          cars.map(car => {
            const carImageUrl = car.vehicle_image ? `${car.vehicle_image}` : defaultImage;
            console.log('Car image URL:', carImageUrl);

            return (
              <div key={car.V_id} className="car-card bg-black rounded-lg shadow-lg p-4 text-center transition-transform transform hover:scale-105 border border-red-500 scrollEffect2">
                {/* Check if car status is not "Available" */}
                {car.v_status !== "Available" && (
                  <div className="absolute inset-0 bg-red-400 bg-opacity-75 flex items-center justify-center">
                    <p className="text-white font-bold text-3xl">N/A</p>
                  </div>
                )}

                <img
                  src={carImageUrl}
                  alt={`${car.make} ${car.model}`}
                  className="rounded-md mb-2 w-full h-48 object-contain"
                />
                <h3 className="text-lg font-bold text-white">{car.make || 'Unknown'} {car.model || 'Model'}</h3>
                <p className="text-sm text-gray-400">Year: {car.year || 'Unknown'}</p>
                <p className="text-sm text-gray-400">Fuel Type: {car.fuel_type || 'Unknown'}</p>
                <p className="text-sm text-gray-400">Mileage: {car.mileage || '0'} km</p>
                <p className="text-lg font-semibold text-red-500">Price: ${car.price || 'N/A'}</p>
                <p className="text-sm text-gray-400">{car.description || 'No description available'}</p>
                <p className={`text-sm font-semibold ${car.v_status === "Available" ? 'text-green-500' : 'text-red-700'}`}>
                  {car.v_status || 'No description available'}
                </p>
                <br />
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-400">No cars available.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseCar;
