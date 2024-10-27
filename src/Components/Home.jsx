import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const images = [
        "https://wallpapers.com/images/hd/black-car-4k-a6ay51d8d0pyex23.jpg",
        "https://images.unsplash.com/photo-1696524147929-56f1e4a05caf?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRhcmslMjBjYXJ8ZW58MHx8MHx8fDA%3D",
        "https://wallpapers.com/images/hd/black-jeep-pictures-3ff6nh7fjs9tsd46.jpg",
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
                <div className="absolute inset-0 w-full h-full">
                    {/* Images for the carousel */}
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Car ${index + 1}`}
                            className={`w-full h-full object-cover ${index === currentImage ? "block" : "hidden"}`}
                        />
                    ))}
                    {/* Arrows for navigation */}
                    <button
                        onClick={goToPrevious}
                        className="absolute bg-transparent left-6 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full hover:bg-red-500 hover:scale-105 active:scale-95 transition-all z-10 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute bg-transparent right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full hover:bg-red-500 hover:scale-105 active:scale-95 transition-all z-10 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>

                    {/* Content and Search bar on top of the images */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                        <div className="bg-black bg-opacity-50 p-5 rounded-lg mb-20">
                            <h1 className="text-4xl font-bold text-red-400 mb-5">
                                Find a Perfect Car for You or Sell Yours
                            </h1>
                            <div className="relative w-full max-w-lg">
                                <input
                                    type="text"
                                    placeholder="Search for cars..."
                                    className="w-full px-4 py-3 pr-20 border border-red-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                                <button className="absolute right-0 top-0 h-full bg-red-500 text-white px-6 py-3 rounded-r-lg hover:bg-red-400">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marketplace Section */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-4 scrollEffect">
                        Explore Our Car Marketplace
                    </h2>
                    <p className="text-lg text-gray-600 mb-10 scrollEffect">
                        Find the perfect car, explore financing options, or list your own car for sale. Your next vehicle is just a click away!
                    </p>

                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
                        {/* Repeated card component structure */}
                        {[{
                            title: "Browse Cars",
                            description: "Check out a variety of cars available for sale, from sedans to SUVs.",
                            link: '/Browse',
                            imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_4up10-uN0hkNUe5oc8zabEAaNHjtk_pTcw&s",
                        },
                        {
                            title: "Search for Cars",
                            description: "Use our advanced search to find cars that match your exact criteria.",
                            link: '/AdvanceSearch',
                            imgSrc: "https://img.freepik.com/premium-vector/car-search-logo_8168-62.jpg",
                        },
                        {
                            title: "Finance Options",
                            description: "Explore flexible finance options to fit your budget and get the car you need.",
                            link: '/FinanceOption',
                            imgSrc: "https://media.istockphoto.com/id/1423550966/vector/profit-rounded-lines-icon.jpg?s=612x612&w=0&k=20&c=_KFEK2PUIlquKGVUYQ18I2rO6xQ3ieFDEx-xHpXRLTI=",
                        }].map((item, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer scrollEffect">
                                <img
                                    src={item.imgSrc}
                                    alt={item.title}
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">{item.title}</h3>
                                <p className="text-gray-600 mb-4">{item.description}</p>
                                <NavLink to={item.link} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                                    View Cars
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Community Section */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-4xl mx-auto text-center p-8">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-4 scrollEffect">
                        Join CarBazaar Community
                    </h2>
                    <p className="text-lg text-gray-600 mb-10 scrollEffect">
                        Be a part of our Family by Joining our Community
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-8">
                        {[{
                            title: "As a Seller",
                            description: "Sell Cars and connect with buyers effortlessly.",
                            link: '/seller',
                            imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAfWDNKGyGLeMBOSLGsw7ngqSYwe5pTuBHQg&s",
                        },
                        {
                            title: "As a Partner",
                            description: "Partner with CarBazaar to reach more car enthusiasts.",
                            link: '/partner',
                            imgSrc: "https://cdn.vectorstock.com/i/500p/86/64/hand-shake-business-partner-agreement-icon-vector-26458664.jpg",
                        },
                        {
                            title: "As a Team",
                            description: "Join us in revolutionizing the car industry.",
                            link: '/join',
                            imgSrc: "https://www.businessmanager.in/wp-content/uploads/2022/04/Effective-Team-Work.jpg",
                        }].map((item, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col sm:flex-row items-center scrollEffect">
                                <div className="sm:w-2/3 text-left">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{item.title}</h3>
                                    <p className="text-gray-600 mb-6">{item.description}</p>
                                    <NavLink
                                        to={item.link}
                                        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                        Join Us
                                    </NavLink>
                                </div>
                                <img
                                    src={item.imgSrc}
                                    alt={item.title}
                                    className="sm:w-1/3 h-32 object-cover rounded-md sm:ml-4 mt-4 sm:mt-0"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
