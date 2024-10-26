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
    return <p>Loading cars...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Browse Cars</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.length > 0 ? (
          cars.map(car => (
            <div key={car.id} className="car-card bg-white rounded-lg shadow-lg p-4 text-center transition-transform transform hover:scale-105">
              <img src={car.img} alt={`${car.make} ${car.model}`} className="rounded-md mb-2" />
              <h3 className="text-lg font-bold">{car.make} {car.model}</h3>
              <p className="text-sm text-gray-500">Variant: {car.variant}</p>
              <p className="text-sm text-gray-500">Year: {car.year}</p>
              <p className="text-lg font-semibold text-blue-600">Price: ${car.price}</p>

              {car.available ? (
                <button
                  onClick={() => handlePurchase(car.id)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded transition-colors duration-300 hover:bg-blue-600"
                >
                  Purchase
                </button>
              ) : (
                <button
                  disabled
                  className="mt-4 bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed"
                >
                  Unavailable
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">No cars available.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseCar;
