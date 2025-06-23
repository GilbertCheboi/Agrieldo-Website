import React, { useState } from "react";
import { motion } from "framer-motion";
import kenyaAgricultureImage from "../assets/about.webp";

const AboutUs = () => {
  const [reviews, setReviews] = useState(["Great platform for farmers!", "Very useful for tracking farm records."]);
  const [newReview, setNewReview] = useState("");

  const handleReviewSubmit = () => {
    if (newReview.trim()) {
      setReviews([...reviews, newReview]);
      setNewReview("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-6">
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-gray-800"
      >
        About Us
      </motion.h1>
      <motion.img
        src={kenyaAgricultureImage}
        alt="Modern agricultural scene in Kenya"
        className="mt-6 w-full max-w-4xl rounded-lg shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-4 text-gray-700 max-w-xl text-center"
      >
        Agrieldo is revolutionizing farm management by providing cutting-edge solutions to farmers in Kenya and Africa.
      </motion.p>

      <div className="mt-8 max-w-4xl text-gray-700 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Social & Community Features</h2>
        
        {/* Social Media Feeds */}
        <div className="mt-6 p-4 border rounded-lg bg-white shadow-md flex flex-col items-center">
          <h3 className="text-xl font-bold">Stay Connected</h3>
          <p className="text-gray-600 mt-2">Follow our latest updates and discussions on social media.</p>
          <div className="mt-4 flex space-x-4">
            <a href="https://twitter.com/Agrieldo" target="_blank" rel="noopener noreferrer" className="bg-[#14171A] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">Twitter</a>
            <a href="https://www.instagram.com/agrieldo/" target="_blank" rel="noopener noreferrer" className="bg-[#E4405F] text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-600">Instagram</a>
            <a href="https://www.linkedin.com/company/Agrieldo" target="_blank" rel="noopener noreferrer" className="bg-[#0077B5] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-800">LinkedIn</a>
            <a href="https://www.facebook.com/profile.php?id=61572431056102" target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">Facebook</a>
          </div>
        </div>

        {/* Community Forum */}
        <div className="mt-6 p-4 border rounded-lg bg-white shadow-md">
          <h3 className="text-xl font-bold">Community Reviews</h3>
          <ul className="mt-2 space-y-2">
            {reviews.map((review, index) => (
              <li key={index} className="p-2 border rounded-md bg-gray-100">{review}</li>
            ))}
          </ul>
          <input
            type="text"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
            placeholder="Leave a review..."
          />
          <button
            onClick={handleReviewSubmit}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </div>

   {/* Additional Information Section */}
<div className="mt-6 p-4 border rounded-lg bg-white shadow-md">
  <h3 className="text-2xl font-bold text-black">Our Mission</h3>
  <p className="mt-2 text-gray-900 text-lg">
    At Agrieldo, we are committed to empowering farmers by providing digital tools that enhance productivity, sustainability, and profitability.
  </p>
</div>

<div className="mt-6 p-4 border rounded-lg bg-white shadow-md">
  <h3 className="text-2xl font-bold text-black">Our Vision</h3>
  <p className="mt-2 text-gray-900 text-lg">
    To be the leading agricultural technology platform that bridges the gap between traditional farming and modern innovation, fostering food security across Africa.
  </p>
</div>

<div className="mt-6 p-4 border rounded-lg bg-white shadow-md">
  <h3 className="text-2xl font-bold text-black">Contact Us</h3>
  <p className="mt-2 text-gray-900 text-lg">Have questions or feedback? Reach out to us at:</p>
  <p className="text-blue-600 mt-1 text-lg font-semibold">support@agrieldo.com</p>
</div>

      </div>
    </div>
  );
};

export default AboutUs;
