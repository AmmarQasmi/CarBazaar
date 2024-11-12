import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdvancedSearch = () => {
  const [maxPrice, setMaxPrice] = useState(30000);
  const [filteredCars, setFilteredCars] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [company, setCompany] = useState('');
  const [carName, setCarName] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [mileage, setMileage] = useState({ min: 0, max: 100000 });
  const [year, setYear] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/cars');
        if (response.data && response.data.vehicles) {
          const availableCars = response.data.vehicles.filter(car => car.v_status === "Available");
          setCars(availableCars);
          setFilteredCars(availableCars);
        } else {
          setError('No cars found.');
        }
      } catch (err) {
        setError('Failed to fetch cars. Please try again later.');
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handlePriceChange = (event) => {
    const newPrice = parseInt(event.target.value, 10);
    setMaxPrice(newPrice);
    setFilteredCars(cars.filter(car => car.price <= newPrice));
  };

  const handleFilter = () => {
    const filtered = cars.filter(car => {
      return (
        car.price >= priceRange.min &&
        car.price <= priceRange.max &&
        (!company || car.make.toLowerCase().includes(company.toLowerCase())) &&
        (!carName || car.model.toLowerCase().includes(carName.toLowerCase())) &&
        (!fuelType || car.fuel_type.toLowerCase() === fuelType.toLowerCase()) &&
        car.mileage >= mileage.min &&
        car.mileage <= mileage.max &&
        (!year || car.year.toString() === year.toString())
      );
    });
    setFilteredCars(filtered);
  };

  if (loading) {
    return <p className="text-red-500 text-center text-xl">Loading cars...</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Filter Menu */}
      <div className={`p-2 mt-12 bg-gray-800 shadow-md 'block' : 'hidden' sm:block`}>
        <div className="m-4 flex justify-center lg:justify-centre lg:m-4">
          <Link
            to="/purchase"
            className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 hover:bg-red-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-opacity-75"
          >
            Purchase
          </Link>
        </div>

        <label className="text-gray-300">Select Price Range</label>
        <input
          type="range"
          min="5000"
          max="30000"
          step="5000"
          value={maxPrice}
          onChange={handlePriceChange}
          className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-2 text-gray-300">
          <span>$5000</span>
          <span>${maxPrice}</span>
        </div>

        {/* Additional filter inputs */}
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full p-2 mt-4 bg-gray-700 text-white rounded"
        />
        <input
          type="text"
          placeholder="Car Model"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
          className="w-full p-2 mt-4 bg-gray-700 text-white rounded"
        />
        <select
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          className="w-full p-2 mt-4 bg-gray-700 text-white rounded"
        >
          <option value="">Fuel Type</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
        </select>

        <button
          onClick={handleFilter}
          className="w-full mt-4 bg-red-500 p-2 rounded text-white font-semibold"
        >
          Apply Filters
        </button>
      </div>

      {/* Car List */}
      <div className="p-20 bg-gray-800 rounded-lg shadow-md w-full">
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredCars.map(car => (
              <div key={car.id} className="car-card bg-gray-900 rounded-lg shadow-lg p-4 border border-red-500">
                <img src={car.vehicle_image} alt={`${car.make} ${car.model}`} className="rounded-md mb-2 w-full h-48 object-fill" />
                <h3 className="text-lg font-bold text-white">{car.make} {car.model}</h3>
                <p className="text-sm text-gray-400">Variant: {car.variant}</p>
                <p className="text-sm text-gray-400">Year: {car.year}</p>
                <p className="text-lg font-semibold text-red-500">Price: ${car.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No cars available matching the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;
