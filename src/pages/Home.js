import React from "react";
import { motion } from "framer-motion";

import heroImage from '../assets/dairy.png'; // Ensure the path is correct

const Home = () => {
  return (
    <div className="bg-gray-50">
  {/* Hero Section */}
  <div
      className="text-center py-12 bg-amber-500 text-white h-[75vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="px-4 sm:px-8"
      >
<h1 className="text-4xl sm:text-5xl font-bold leading-tight text-[#ffa500]">
  Welcome to Agrieldo
</h1>
<p className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto text-[#ffa500]">
  Transforming Farm Management with Cutting-Edge Technology
</p>
<button className="mt-6 bg-white text-[#ffa500] py-2 px-6 rounded-lg hover:bg-amber-200 transition">
  Learn More
</button>
      </motion.div>
    </div>
      


      {/* Introduction Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="py-16 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
        <p className="mt-4 text-lg text-gray-600">
          At Agrieldo, we are dedicated to revolutionizing the way farmers manage their farms. Our platform
          provides real-time surveillance, efficient record-keeping, and a variety of tools to make farm
          management easier and more effective. We're committed to supporting farmers, veterinarians, and the
          agricultural community to achieve greater productivity and sustainability.
        </p>
      </motion.div>

      {/* Features Section */}
      <div className="bg-gray-100 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="container mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800">Features</h2>
          <p className="mt-4 text-lg text-gray-600">Here’s how Agrieldo enhances farm management:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-amber-500">Real-Time Surveillance</h3>
              <p className="mt-4 text-gray-600">Monitor your farm remotely, ensuring your animals and crops are safe and healthy at all times.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-amber-500">Record Keeping</h3>
              <p className="mt-4 text-gray-600">Keep track of all important data, from medical records of animals to production logs, in one place.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-amber-500">Vet Requests</h3>
              <p className="mt-4 text-gray-600">Easily request a veterinarian through the app for on-demand support and services for your farm.</p>
            </div>
            {/* New AI Chatbot Feature */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-amber-500">AI Chatbot Assistance</h3>
              <p className="mt-4 text-gray-600">
                Interact with our AI-powered chatbot, built with the ChatGPT API, to get instant farm management advice, 
                answer common farming questions, or receive suggestions on improving your farm's productivity.
              </p>
            </div>
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
              record-keeping features are invaluable. The vet request feature has been a game-changer in
              keeping our animals healthy!"
            </blockquote>
            <p className="mt-4 text-lg font-semibold text-gray-800">- Jerry Kemboi, Farmer</p>
          </div>
          <div className="max-w-lg mx-auto">
            <blockquote className="italic text-gray-600">
              "The platform has made our farm operations more organized and efficient. We can easily access
              our production records, monitor livestock health, and request veterinary services when needed.
              Highly recommend Agrieldo!"
            </blockquote>
            <p className="mt-4 text-lg font-semibold text-gray-800">- Agrine Changwony, Agricultural Manager</p>
          </div>
          <div className="max-w-lg mx-auto">
            <blockquote className="italic text-gray-600">
              "Agrieldo has been a huge help in our day-to-day farm management. The app’s intuitive interface
              and real-time updates make farm operations a lot more manageable. It’s a great tool for both small
              and large farms!"
            </blockquote>
            <p className="mt-4 text-lg font-semibold text-gray-800">- Sarah Mitei, Livestock Farmer</p>
          </div>
          <div className="max-w-lg mx-auto">
            <blockquote className="italic text-gray-600">
              "I’m able to track my farm’s performance from anywhere, and the record-keeping system has saved
              me so much time. Thanks to Agrieldo, my farm is now more productive than ever!"
            </blockquote>
            <p className="mt-4 text-lg font-semibold text-gray-800">- Murgor, Crop Farmer</p>
          </div>
        </div>
      </motion.div>
{/* Call to Action (CTA) Section */}
<div
  className="text-center py-16 text-white"
  style={{
    backgroundImage: `url(${require('../assets/farm.png')})`, // Replace 'your-image.jpg' with your actual image name
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
    <h2 className="text-3xl font-bold text-[#ffa500]">Download Agrieldo App Today!</h2>
    <p className="mt-4 text-lg text-[#333333]">Transform your farm management experience with Agrieldo. Download now and take full control of your farm's future!</p>
    <div className="mt-6 flex justify-center space-x-6">
      {/* Example buttons for Google Play and Apple Store */}
      <a
        href="https://play.google.com/store/apps/details?id=com.agrieldo" // Replace with actual Play Store link
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-amber-500 py-2 px-6 rounded-lg hover:bg-amber-200 transition flex items-center"
      >
        <img
          src={require('../assets/Google_Play-Icon-Logo.wine.png')} // Ensure you have downloaded and placed the Apple Store logo in your assets folder
          alt="Download on Google Play"
          className="w-12 mr-2"
        />
        Google Play
      </a>
      <a
        href="https://apps.apple.com/us/app/agrieldo/id1234567890" // Replace with actual App Store link
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-amber-500 py-2 px-6 rounded-lg hover:bg-amber-200 transition flex items-center"
      >
        <img
          src={require('../assets/App_Store_(iOS).svg.png')} // Ensure you have downloaded and placed the Apple Store logo in your assets folder
          alt="Download on the App Store"
          className="w-12 mr-2"
        />
        App Store
      </a>
    </div>
  </motion.div>
</div>



      {/* Footer Section */}
     
    </div>
  );
};

export default Home;
