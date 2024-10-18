import React, { useState } from 'react';

function AdvancedSearch() {
    const [priceRange, setPriceRange] = useState([10000, 50000]);
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [variant, setVariant] = useState('');
    const [results, setResults] = useState([]);

    const handlePriceChange = (e) => {
        setPriceRange([+e.target.value[0], +e.target.value[1]]);
    };

    const handleSearch = () => {
        const allCars = [
            { id: 1, make: 'Toyota', model: 'Corolla', variant: 'SE', year: 2020, price: 20000, img: 'https://imgcdn.zigwheels.pk/large/gallery/exterior/14/118/toyota-corolla-front-angle-low-view.jpg' },
            { id: 2, make: 'Honda', model: 'Civic', variant: 'EX', year: 2019, price: 18500, img: 'https://cache4.pakwheels.com/system/car_generation_pictures/7370/original/Cover.jpg?1677570254' },
            { id: 3, make: 'Ford', model: 'Mustang', variant: 'GT', year: 2021, price: 30000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXo8lJkh5R8kaQi3lIl2yipLmX6B-hkQ1bYw&s' },
        ];

        // Filter cars based on user input
        const filteredCars = allCars.filter(car =>
            car.price >= priceRange[0] &&
            car.price <= priceRange[1] &&
            car.make.toLowerCase().includes(make.toLowerCase()) &&
            car.model.toLowerCase().includes(model.toLowerCase()) &&
            car.variant.toLowerCase().includes(variant.toLowerCase())
        );

        setResults(filteredCars);
    };

    return (
        <div className="container mx-auto px-4 py-6 sm:py-8 md:py-10 lg:py-12 mt-28 sm:mt-10 md:mt-12 lg:mt-2">
            <h1 className="text-3xl font-bold mb-6 text-center">Advanced Search</h1>

            {/* Price Range Slider */}
            <div className="mb-6">
                <label className="block mb-2 text-lg font-semibold text-gray-800">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
                <input
                    type="range"
                    min="10000"
                    max="100000"
                    step="1000"
                    value={priceRange[1]}
                    className="w-full"
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                />
            </div>

            {/* Make Input */}
            <div className="mb-6">
                <label className="block mb-2 text-lg font-semibold text-gray-800">Make</label>
                <input
                    type="text"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    placeholder="e.g. Toyota"
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Model Input */}
            <div className="mb-6">
                <label className="block mb-2 text-lg font-semibold text-gray-800">Model</label>
                <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="e.g. Corolla"
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Variant Input */}
            <div className="mb-6">
                <label className="block mb-2 text-lg font-semibold text-gray-800">Variant</label>
                <input
                    type="text"
                    value={variant}
                    onChange={(e) => setVariant(e.target.value)}
                    placeholder="e.g. SE"
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Search Button */}
            <button
                onClick={handleSearch}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                Search
            </button>

            {/* Results Section */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
                {results.length > 0 ? (
                    results.map(car => (
                        <div key={car.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer">
                            <img
                                src={car.img}
                                alt={`${car.make} ${car.model}`}
                                className="w-full h-40 object-cover rounded-md"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">{car.make} {car.model}</h3>
                            <p className="text-gray-600 mb-2">Variant: {car.variant}</p>
                            <p className="text-gray-600 mb-2">Year: {car.year}</p>
                            <p className="text-gray-600 mb-4">Price: ${car.price}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No cars found matching your search criteria.</p>
                )}
            </div>
        </div>
    );
}

export default AdvancedSearch;
