import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faClock } from '@fortawesome/free-solid-svg-icons';
import HeroSection from './HeroSection';

function Home() {
    const images = [
        "https://wallpapers.com/images/hd/black-car-4k-a6ay51d8d0pyex23.jpg",
        "https://images5.alphacoders.com/546/546892.jpg",
        "https://images.unsplash.com/photo-1696524147929-56f1e4a05caf?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRhcmslMjBjYXJ8ZW58MHx8MHx8fDA%3D",
        "https://wallpapers.com/images/hd/black-jeep-pictures-3ff6nh7fjs9tsd46.jpg",
        "https://images4.alphacoders.com/113/thumb-1920-1137407.jpg",
        "https://wallpapers.com/images/hd/black-car-4k-htizl5scx31wkqpz.jpg",
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    const goToPrevious = () => {
        setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    };

    return (
        <div>
            <div className="relative text-center m-0 p-0 w-full h-screen overflow-x-hidden">
                <div className="absolute inset-0 w-full h-full">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Car ${index + 1}`}
                            className={`w-full h-full object-cover ${index === currentImage ? "block" : "hidden"}`}
                        />
                    ))}
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

                    <HeroSection />
                </div>
            </div>

            <section className="bg-gray-50 py-16 w-full">
                <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-4 scrollEffect">
                        Explore Our Car Marketplace
                    </h2>
                    <p className="text-lg text-gray-600 mb-10 scrollEffect">
                        Find the perfect car, explore financing options, or list your own car for sale. Your next vehicle is just a click away!
                    </p>

                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
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
                            title: "Insurance Booking",
                            description: "Explore flexible insurance options to fit your budget and protect your car.",
                            link: '/InsuranceOptions',
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

            <section className="bg-gray-100 py-12 w-full">
                <div className="max-w-7xl mx-auto text-center p-8">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-4 scrollEffect">
                        CarBazaar Community & News
                    </h2>
                    <p className="text-lg text-gray-600 mb-10 scrollEffect">
                        Stay updated with the latest automotive news and join our community
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col sm:flex-row items-center scrollEffect">
                            <div className="sm:w-2/3 text-left">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Join as a Seller</h3>
                                <p className="text-gray-600 mb-6">Sell Cars and connect with buyers effortlessly.</p>
                                <NavLink
                                    to="/seller"
                                    className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Join Us
                                </NavLink>
                            </div>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAfWDNKGyGLeMBOSLGsw7ngqSYwe5pTuBHQg&s"
                                alt="Join as a Seller"
                                className="sm:w-1/3 h-32 object-cover rounded-md sm:ml-4 mt-4 sm:mt-0"
                            />
                        </div>
                        
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 scrollEffect">
                            <img
                                src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3RyaWMlMjB2ZWhpY2xlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                                alt="Electric Vehicle"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Electric Vehicle Revolution</h3>
                                <p className="text-gray-600 mb-4">The automotive industry is witnessing a surge in electric vehicle adoption, with major manufacturers investing heavily in EV technology.</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500 flex items-center">
                                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                                        5 min read
                                    </span>
                                    <a href="https://www.pakwheels.com/blog/evolution-of-the-ev-industry-in-pakistan-challenges-future-prospects/" className="text-red-500 hover:text-red-600 font-medium">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 scrollEffect">
                            <img
                                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VsZiUyMGRyaXZpbmclMjBjYXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                                alt="Autonomous Driving"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Autonomous Driving Breakthroughs</h3>
                                <p className="text-gray-600 mb-4">Recent advancements in autonomous driving technology are bringing self-driving cars closer to widespread adoption.</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500 flex items-center">
                                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                                        4 min read
                                    </span>
                                    <a href="https://www.digitimes.com/news/a20241011PD208/foxconn-autonomous-driving-ai-efficiency-power-semiconductors.html" className="text-red-500 hover:text-red-600 font-medium">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 scrollEffect">
                            <img
                                src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyJTIwbWFudWZhY3R1cmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt="Car Manufacturing"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sustainable Manufacturing</h3>
                                <p className="text-gray-600 mb-4">Car manufacturers are adopting eco-friendly practices to reduce carbon footprint and promote sustainability in production.</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500 flex items-center">
                                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                                        6 min read
                                    </span>
                                    <a href="https://www.weforum.org/stories/2024/05/how-to-navigate-sustainability-in-the-automotive-industry/" className="text-red-500 hover:text-red-600 font-medium">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 scrollEffect">
                            <img
                                src="https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwdGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt="Car Technology"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">In-Car Tech Innovations</h3>
                                <p className="text-gray-600 mb-4">From advanced infotainment systems to AI-powered assistants, in-car technology is revolutionizing the driving experience.</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500 flex items-center">
                                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                                        3 min read
                                    </span>
                                    <a href="https://www.motortrend.com/features/biggest-car-technology-advancements-since-1949/" className="text-red-500 hover:text-red-600 font-medium">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;

