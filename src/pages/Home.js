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
import AIpowered from "../assets/pic16.webp";
import { AlertTriangle, CheckCircle, Cpu} from "lucide-react";

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
      {/* Hero Section */}
      <div className="relative w-full h-[75vh] overflow-hidden">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center px-4 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
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
{/* Problem and Solution Section */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="py-20 px-6 bg-gradient-to-br from-orange-50 via-white to-orange-100"
>
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
      The Problem We're Solving
    </h2>
    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
      Many farmers face daily struggles due to outdated management practices, poor record-keeping, limited access to markets and inputs, and lack of real-time insights for better decision-making.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Problem Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-white p-8 rounded-2xl shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300"
      >
        <h3 className="text-2xl font-semibold text-red-600 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          The Challenges
        </h3>
        <ul className="text-gray-700 text-left space-y-3 list-disc pl-5">
          <li>Manual and inconsistent farm records</li>
          <li>Limited access to quality veterinary services and feeds</li>
          <li>Poor tracking of produce and weak market insights</li>
          <li>Low visibility and poor access to markets</li>
        </ul>
      </motion.div>

      {/* Technology as the Game-Changer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300"
      >
        <h3 className="text-2xl font-semibold text-orange-500 mb-4 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-orange-500" />
          Technology at the Heart
        </h3>
        <ul className="text-gray-700 text-left space-y-3 list-disc pl-5">
          <li>Real-time farm dashboards powered by smart data</li>
          <li>AI-based tools for health monitoring & production insights</li>
          <li>Integrated digital marketplaces for inputs and produce</li>
          <li>Seamless mobile access for remote farm control</li>
        </ul>
      </motion.div>

      {/* Solution Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300"
      >
        <h3 className="text-2xl font-semibold text-green-600 mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-500" />
          How Agrieldo Solves This
        </h3>
        <ul className="text-gray-700 text-left space-y-3 list-disc pl-5">
          <li>Digital record-keeping & smart reporting</li>
          <li>Integrated access to feeds, vet services & equipment</li>
          <li>Market linkages for produce & livestock sales</li>
          <li>AI-powered advisory and data-driven decisions</li>
        </ul>
      </motion.div>
    </div>
  </div>
</motion.div>


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
          <p className="mt-4 text-lg text-gray-600">Here is how Agrieldo enhances farm management;</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[{ image: surveillanceImage, title: "AI-Powered Security & Monitoring", desc: "Monitor your farm remotely, ensuring your animals and crops are safe." },
              { image: recordKeepingImage, title: "Smart Farm Management", desc: "Keep track of medical records and production logs in one place." },
              { image: vetRequestsImage, title: "Vet Requests", desc: "Easily request a veterinarian through the app for on-demand support." },
              { image: dairyfeeds, title: "Agrieldo dairy feeds", desc: "Get instant delivery of dairy feeds to improve milk production." },
              { image: auctions, title: "Livestock Marketplace & Auctions", desc: "Buy and sell livestock safely through a trusted platform." },
              { image: AIpowered, title: "AI-Powered Insights", desc: "Harness the power of artificial intelligence to analyze farm data and get smart recommendations for improving productivity." }
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
   {/* Testimonial Section */}
   <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="py-16 text-center bg-gray-200"
      >
        <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="max-w-lg mx-auto">
            <blockquote className="italic text-gray-600">
              "Agrieldo has completely transformed how we manage our farm. The real-time surveillance and
              record-keeping features are invaluable."
            </blockquote>
            <p className="mt-4 text-lg font-semibold text-gray-800">- Jerry Kemboi, Farmer</p>
          </div>
          <div className="max-w-lg mx-auto">
            <blockquote className="italic text-gray-600">
              "The platform has made our farm operations more organized and efficient."
            </blockquote>
            <p className="mt-4 text-lg font-semibold text-gray-800">- Agrine Changwony, Agricultural Manager</p>
          </div>
          <div className="max-w-lg mx-auto">
            <blockquote className="italic text-gray-600">
              "The app’s intuitive interface and real-time updates make farm operations a lot more manageable."
            </blockquote>
            <p className="mt-4 text-lg font-semibold text-gray-800">- Sarah Mitei, Livestock Farmer</p>
          </div>
          <div className="max-w-lg mx-auto">
            <blockquote className="italic text-gray-600">
              "Thanks to Agrieldo, my farm is now more productive than ever!"
            </blockquote>
            <p className="mt-4 text-lg font-semibold text-gray-800">- Murgor, Farmer</p>
          </div>
        </div>
      </motion.div>


{/* Subscription Section */}
<div className="bg-gradient-to-r from-[#FFA500] to-[#333333] py-16 px-6 rounded-lg shadow-lg text-white">
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-5xl font-extrabold tracking-tight">Stay Connected with Agrieldo</h2>
    <p className="mt-4 text-lg font-light text-white">
      Subscribe to receive the latest updates, industry insights, and exclusive offers tailored just for you.
    </p>
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center">
      <input
        type="email"
        placeholder="Enter your email address"
        className="w-full sm:w-80 p-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-orange-300"
      />
      <button className="mt-4 sm:mt-0 sm:ml-4 bg-white text-amber-600 px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-gray-200 transition">
        Subscribe
      </button>
    </div>
  </div>
</div>

        {/* Call to Action Section */}
        <div
        className="text-center py-16 text-white"
        style={{
          backgroundImage: `url(${require('../assets/pic21.avif')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
        <h2 className="text-5xl font-extrabold text-white">Download Agrieldo App Today!</h2>
        <p className="mt-4 text-lg text-white">
           Transform your farm management experience with Agrieldo. Download now and take full control of your farm's future!
        </p>

          <div className="mt-6 flex justify-center space-x-6">
            <a
              href="https://play.google.com/store/apps/details?id=com.agrieldo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-amber-500 py-2 px-6 rounded-lg hover:bg-amber-200 transition flex items-center"
            >
              <img
                src={require('../assets/Google_Play-Icon-Logo.wine.png')}
                alt="Download on Google Play"
                className="w-12 mr-2"
              />
              Google Play
            </a>
            <a
              href="https://apps.apple.com/us/app/agrieldo/id1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-amber-500 py-2 px-6 rounded-lg hover:bg-amber-200 transition flex items-center"
            >
              <img
                src={require('../assets/App_Store_(iOS).svg.png')}
                alt="Download on the App Store"
                className="w-12 mr-2"
              />
              App Store
            </a>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Home;

