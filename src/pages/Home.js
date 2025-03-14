import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SubscriptionForm from "./SubscriptionForm";
import heroImage1 from "../assets/pic7.jpg";
import heroImage2 from "../assets/pic41.webp";
import heroImage3 from "../assets/pic33.jpg";
import heroImage4 from "../assets/pic40.jpg";
import heroImage5 from "../assets/pic36.jpg";
import missionImage from "../assets/pic14.jpg";
import surveillanceImage from "../assets/pic50.jpg";
import recordKeepingImage from "../assets/pic53.jpeg";
import vetRequestsImage from "../assets/pic56.avif";
import dairyfeeds from "../assets/pic55.jpg";
import auctions from "../assets/pic7.jpg";

const images = [heroImage1, heroImage2, heroImage3, heroImage4, heroImage5];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Image Slider */}
      <div className="relative w-full h-[75vh] overflow-hidden">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center blur-md"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        ></motion.div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl sm:text-7xl font-bold text-white">Welcome to Agrieldo</h1>
            <p className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto text-white">
              Transforming Farm Management with Cutting-Edge Technology
            </p>
          </motion.div>
        </div>
        <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-600 transition">
          <FaArrowLeft size={20} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-600 transition">
          <FaArrowRight size={20} />
        </button>
      </div>

      {/* Mission Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="py-16 flex flex-col md:flex-row items-center justify-center text-center md:text-left">
        <div className="md:w-1/2 px-6">
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            At Agrieldo, we are dedicated to revolutionizing the way farmers manage their farms. Our platform provides
            real-time surveillance, efficient record-keeping, and tools to make farm management easier and more effective.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img src={missionImage} alt="Our Mission" className="w-60 h-60 rounded-full object-cover" />
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="bg-gray-100 py-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">Features</h2>
          <p className="mt-4 text-lg text-gray-600">Here is how Agrieldo enhances farm management:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[{ image: surveillanceImage, title: "AI-Powered Security & Monitoring", desc: "Monitor your farm remotely, ensuring your animals and crops are safe." },
              { image: recordKeepingImage, title: "Smart Farm Management", desc: "Keep track of medical records and production logs in one place." },
              { image: vetRequestsImage, title: "Vet Requests", desc: "Easily request a veterinarian through the app for on-demand support." },
              { image: dairyfeeds, title: "Agrieldo dairy feeds", desc: "Get instant delivery of dairy feeds to improve milk production." },
              { image: auctions, title: "Livestock Marketplace & Auctions", desc: "Buy and sell livestock safely through a trusted platform." }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <img src={feature.image} alt={feature.title} className="w-32 h-32 rounded-lg object-cover mb-4" />
                <h3 className="text-xl font-semibold text-amber-500">{feature.title}</h3>
                <p className="mt-4 text-gray-600 text-center">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Subscription Section */}
      {/* Subscription Section */}
<div className="py-16 bg-white text-center">
  <h2 className="text-3xl font-bold text-gray-800">Stay Updated</h2>

  <SubscriptionForm />

  {/* Learn More Button - Separate Line */}
  <div className="mt-6">
    <button className="bg-white text-[#ffa500] py-2 px-6 rounded-lg hover:bg-amber-200 transition">
      Learn More
    </button>
  </div>

  {/* Download Buttons - Separate Line */}
  <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
    <a href="https://play.google.com/store/apps/details?id=com.agrieldo.app"
       target="_blank"
       rel="noopener noreferrer"
       className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
    >
      Download on Play Store
    </a>
    <a href="https://apps.apple.com/us/app/agrieldo/id123456789"
       target="_blank"
       rel="noopener noreferrer"
       className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
    >
      Download on App Store
    </a>
  </div>
</div>

    </div>
  );
};

export default Home;
