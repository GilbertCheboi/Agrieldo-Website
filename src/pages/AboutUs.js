import React from "react";
import { motion } from "framer-motion";
import kenyaAgricultureImage from "../assets/about.webp"; // import the image

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20">
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
        Agrieldo is revolutionizing farm management by providing cutting-edge
        solutions to farmers in Kenya and Africa. With a focus on innovation, we
        are committed to improving the agricultural sector by addressing key
        challenges such as lack of proper record keeping, inadequate vet services
        and poverty. Our platform provides solutions for real-time surveillance,
        easy record-keeping and access to essential services like veterinary
        care, making it a game-changer for farmers in Kenya and across Africa.
      </motion.p>
    </div>
  );
};

export default AboutUs;
