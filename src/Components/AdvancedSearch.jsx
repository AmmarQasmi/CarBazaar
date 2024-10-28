import React, { useState } from 'react';

const allCars = [
  { id: 1, make: 'Toyota', model: 'Corolla', variant: 'SE', year: 2020, price: 20000, img: 'https://imgcdn.zigwheels.pk/large/gallery/exterior/14/118/toyota-corolla-front-angle-low-view.jpg' },
  { id: 2, make: 'Honda', model: 'Civic', variant: 'EX', year: 2019, price: 18500, img: 'https://cache4.pakwheels.com/system/car_generation_pictures/7370/original/Cover.jpg?1677570254' },
  { id: 3, make: 'Ford', model: 'Mustang', variant: 'GT', year: 2021, price: 30000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXo8lJkh5R8kaQi3lIl2yipLmX6B-hkQ1bYw&s' },
];

const AdvancedSearch = () => {
  const [maxPrice, setMaxPrice] = useState(30000);
  const [filteredCars, setFilteredCars] = useState(allCars);

  const handlePriceChange = (event) => {
    const newPrice = parseInt(event.target.value, 10);
    setMaxPrice(newPrice);
    const filtered = allCars.filter(car => car.price <= newPrice);
    setFilteredCars(filtered);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md pb-20 pt-20">
      <h2 className="text-2xl font-semibold mb-0 text-center text-red-500">Select Price Range</h2>

      <input
        type="range"
        min="10000"
        max="30000"
        step="1000"
        value={maxPrice}
        onChange={handlePriceChange}
        className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer transition-colors duration-300"
      />
      <div className="flex justify-between mt-2 text-gray-300">
        <span>$10,000</span>
        <span>${maxPrice}</span>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <div key={car.id} className="car-card transform transition-transform duration-300 hover:scale-105 bg-gray-900 rounded-lg shadow-lg p-4 border border-red-500">
              <img src={car.img} alt={`${car.make} ${car.model}`} className="rounded-md mb-2 w-full h-48 object-cover" />
              <h3 className="text-lg font-bold text-white">{car.make} {car.model}</h3>
              <p className="text-sm text-gray-400">Variant: {car.variant}</p>
              <p className="text-sm text-gray-400">Year: {car.year}</p>
              <p className="text-lg font-semibold text-red-500">Price: ${car.price}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">No cars available in this price range.</p>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;