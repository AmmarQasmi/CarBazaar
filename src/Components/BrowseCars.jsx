import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BrowseCar = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handlePurchase = (carId) => {
    // Handle the purchase logic here (e.g., redirect to a purchase page or show a modal)
    console.log(`Purchasing car with ID: ${carId}`);
  };

  if (loading) {
    return <p className="text-red-500 text-center text-xl">Loading cars...</p>;
  }

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-red-500">Browse Cars</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.length > 0 ? (
          cars.map(car => (
            <div key={car.id} className="car-card bg-black rounded-lg shadow-lg p-4 text-center transition-transform transform hover:scale-105 border border-red-500">
              <img src={car.img} alt={`${car.make} ${car.model}`} className="rounded-md mb-2 w-full h-48 object-cover" />
              <h3 className="text-lg font-bold text-white">{car.make} {car.model}</h3>
              <p className="text-sm text-gray-400">Variant: {car.variant}</p>
              <p className="text-sm text-gray-400">Year: {car.year}</p>
              <p className="text-lg font-semibold text-red-500">Price: ${car.price}</p>

              {car.available ? (
                <button
                  onClick={() => handlePurchase(car.id)}
                  className="mt-4 bg-red-600 text-white py-2 px-4 rounded transition-colors duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Purchase
                </button>
              ) : (
                <button
                  disabled
                  className="mt-4 bg-gray-700 text-gray-400 py-2 px-4 rounded cursor-not-allowed"
                >
                  Unavailable
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">No cars available.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseCar;