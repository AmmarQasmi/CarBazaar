import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function Home() {

    const images = [
        "https://live.staticflickr.com/4348/36326314265_3e7a4652b9_b.jpg",
        "https://images.pexels.com/photos/39501/lamborghini-brno-racing-car-automobiles-39501.jpeg?cs=srgb&dl=pexels-pixabay-39501.jpg&fm=jpg",
        "https://wallpapers.com/images/hd/1920-x-1080-car-aay5ru9j8iazqofr.jpg",
    ];

    const [currentImage, setCurrentImage] = useState(0);

    // Automatically change images every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    // Handlers for manual navigation
    const goToPrevious = () => {
        setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    };

    return (
        <>
            <section className="relative text-center m-0 p-0 w-screen h-screen overflow-hidden">
                {/* Carousel container */}
                <div className="absolute inset-0 h-full w-full">
                    {/* Images for the carousel */}
                    <div className="absolute inset-0 h-full w-full bg-cover bg-center transition-opacity duration-1000">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Car ${index + 1}`}
                                className={`w-full h-full object-cover ${index === currentImage ? "block" : "hidden"}`}
                                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                            />
                        ))}
                    </div>

                    {/* Arrows for navigation */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full hover:bg-red-500 hover:scale-105 active:scale-95 transition-all z-10 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full hover:bg-red-500 hover:scale-105 active:scale-95 transition-all z-10 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>

                    {/* Content and Search bar on top of the images */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                        <div className="bg-black bg-opacity-50 p-5 rounded-lg">
                            <h1 className="text-4xl font-bold text-white mb-5">
                                Find a Perfect Car for You or Sell Yours
                            </h1>
                            <div className="relative w-full max-w-lg">
                                <input
                                    type="text"
                                    placeholder="Search for cars..."
                                    className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <button className="absolute right-0 top-0 h-full bg-blue-500 text-white px-6 py-3 rounded-r-lg hover:bg-blue-600">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="max-w-4xl mx-auto text-center p-8">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                        Explore Our Car Marketplace
                    </h2>
                    <p className="text-lg text-gray-600 mb-10">
                        Find the perfect car, explore financing options, or list your own car for sale. Your next vehicle is just a click away!
                    </p>

                    <div className="container mx-auto px-4 py-10">
                        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                            {/* Browse Cars */}
                            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_4up10-uN0hkNUe5oc8zabEAaNHjtk_pTcw&s"
                                    alt="Browse image"
                                    className="w-full h-40 object-cover rounded-md"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Browse Cars</h3>
                                <p className="text-gray-600 mb-4">Check out a variety of cars available for sale, from sedans to SUVs.</p>
                                <NavLink to='/Browse' className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                    View Cars
                                </NavLink>
                            </div>

                            {/* Search for Cars */}
                            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer">
                                <img
                                    src="https://img.freepik.com/premium-vector/car-search-logo_8168-62.jpg"
                                    alt="Search Image"
                                    className="w-full h-40 object-cover rounded-md"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Search for Cars</h3>
                                <p className="text-gray-600 mb-4">Use our advanced search to find cars that match your exact criteria.</p>
                                <NavLink to='/AdvanceSearch' className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                    Search Cars
                                </NavLink>
                            </div>

                            {/* Finance Options */}
                            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer">
                                <img
                                    src="https://media.istockphoto.com/id/1423550966/vector/profit-rounded-lines-icon.jpg?s=612x612&w=0&k=20&c=_KFEK2PUIlquKGVUYQ18I2rO6xQ3ieFDEx-xHpXRLTI="
                                    alt="Paisa"
                                    className="w-full h-40 object-cover rounded-md"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Finance Options</h3>
                                <p className="text-gray-600 mb-4">Explore flexible finance options to fit your budget and get the car you need.</p>
                                <NavLink to='/FinanceOption' className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                    Explore Finance
                                </NavLink>
                            </div>

                        </div>
                    </div>

                </div>
            </section >

            <section className="bg-gray-100 py-12">
                <div className="max-w-4xl mx-auto text-center p-8">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                        Join CarBazaar Community
                    </h2>
                    <p className="text-lg text-gray-600 mb-10">
                        Be a part of our Family by Joining our Community
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-8">

                        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col sm:flex-row items-center">
                            <div className="sm:w-2/3 text-left">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">As a Seller</h3>
                                <p className="text-gray-600 mb-6">Sell Cars and connect with buyers effortlessly.</p>
                                <NavLink
                                    to='/seller'
                                    className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-500">
                                    Sell with us
                                </NavLink>
                            </div>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAfWDNKGyGLeMBOSLGsw7ngqSYwe5pTuBHQg&s" alt="Browse image" className="sm:w-1/3 w-full object-cover rounded-lg sm:ml-6 mt-4 sm:mt-0" />
                        </div>

                        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col sm:flex-row items-center">
                            <div className="sm:w-2/3 text-left">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">As a Partner</h3>
                                <p className="text-gray-600 mb-6">Partner with CarBazaar to reach more car enthusiasts.</p>
                                <NavLink
                                    to='/partner'
                                    className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-500">
                                    Partner with us
                                </NavLink>
                            </div>
                            <img src="https://cdn.vectorstock.com/i/500p/86/64/hand-shake-business-partner-agreement-icon-vector-26458664.jpg" alt="Partner" className="sm:w-1/3 w-full object-cover rounded-lg sm:ml-6 mt-4 sm:mt-0" />
                        </div>

                        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col sm:flex-row items-center">
                            <div className="sm:w-2/3 text-left">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">As a Team</h3>
                                <p className="text-gray-600 mb-6">Join us in revolutionizing the car industry.</p>
                                <NavLink
                                    to='/join'
                                    className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-500">
                                    Join our team
                                </NavLink>
                            </div>
                            <img src="https://www.businessmanager.in/wp-content/uploads/2022/04/Effective-Team-Work.jpg " alt="Team" className="sm:w-1/3 w-full object-cover rounded-lg sm:ml-6 mt-4 sm:mt-0" />
                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}

export default Home