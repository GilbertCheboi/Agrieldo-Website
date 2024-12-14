import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';


const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto text-center"
      >
        <h1 className="text-4xl font-bold text-amber-500">Contact Us</h1>
        <p className="mt-4 text-gray-600 text-lg">
          We’d love to hear from you! Reach out to us using the details below.
        </p>
        <div className="mt-8">
          <p className="text-xl font-medium text-gray-800">Email us at:</p>
          <a
            href="mailto:info@agrieldo.com"
            className="text-amber-500 text-lg font-semibold underline hover:text-amber-700"
          >
            info@agrieldo.com
          </a>
        </div>
        {/* Phone Section */}
        <div className="mt-8">
          <p className="text-xl font-medium text-gray-800">Call us at:</p>
          <a
            href="tel:+254722927266"
            className="text-amber-500 text-lg font-semibold underline hover:text-amber-700"
          >
            +254722967266
          </a>
        </div>

        <div className="mt-10">
          <p className="text-lg text-gray-800">
            Or find us on social media:
          </p>
          <div className="flex justify-center mt-4 space-x-6">
            {/* Replace # with your social media links */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-amber-500 text-2xl"
            >
<FontAwesomeIcon icon={faFacebook} className="text-gray-500 hover:text-amber-500 text-2xl" />
</a>
<a
              href="https://twitter.com/AgriEldo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-amber-500 text-2xl"
            >
<FontAwesomeIcon icon={faTwitter} className="text-gray-500 hover:text-amber-500 text-2xl" />
</a>
            <a
              href="#https://twitter.com/AgriEldo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-amber-500 text-2xl"
            >
<FontAwesomeIcon icon={faInstagram} className="text-gray-500 hover:text-amber-500 text-2xl" />
</a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
