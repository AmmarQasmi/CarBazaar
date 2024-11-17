import React, { useState, useEffect } from 'react';

const HeroSection = () => {
    const sloganText = "Find Your Perfect Car, Drive Your Dream";
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const typingSpeed = 120; // Adjust typing speed here
        const resetDelay = 1500; // Delay before restarting typing effect

        if (index < sloganText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + sloganText[index]);
                setIndex((prevIndex) => prevIndex + 1);
            }, typingSpeed);

            return () => clearTimeout(timeout);
        } else {
            const resetTimeout = setTimeout(() => {
                setDisplayedText("");
                setIndex(0);
            }, resetDelay);

            return () => clearTimeout(resetTimeout);
        }
    }, [index, sloganText]);

    return (
        <div className="absolute inset-0 flex flex-col justify-center items-center pt-20">
            <div className="bg-black bg-opacity-50 p-5 rounded-lg mb-20 w-full max-w-2xl">
                <h1 className="text-4xl font-bold text-red-400 mb-5 text-center">
                    {displayedText}
                    <span className="animate-blink">|</span> {/* Blinking cursor */}
                </h1>
            </div>
        </div>
    );
};

export default HeroSection;
