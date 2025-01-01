import React from "react";
import Navbar from "./Navbar";

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-[90.8vh] bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center p-6">
                <div className="max-w-6xl flex flex-col md:flex-row items-center bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-lg overflow-hidden">
                    {/* Left Section - Text Content */}
                    <div className="w-full md:w-1/2 p-8 text-center md:text-left bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            QuickPurse
                        </h1>
                        <p className="text-lg md:text-xl mb-6 leading-relaxed">
                            Your ultimate digital payment solution. Experience
                            seamless, secure, and instant transactions. Manage
                            your finances effortlessly, anytime, anywhere.
                        </p>
                        <blockquote className="italic text-gray-200 text-lg md:text-xl border-l-4 border-white pl-4 mb-6">
                            "Empower your payments, empower your life."
                        </blockquote>
                        <button className="mt-4 px-6 py-3 bg-yellow-400 text-blue-900 font-bold rounded-md hover:bg-yellow-300 transition duration-300">
                            Get Started
                        </button>
                    </div>

                    {/* Right Section - Image */}
                    <div className="w-full md:w-1/2 h-[51vh]">
                        <img
                            src="/homePic.avif"
                            alt="Digital Wallet"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
