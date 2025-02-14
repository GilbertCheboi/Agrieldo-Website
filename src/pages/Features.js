import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Real-Time Surveillance",
    description:
      "Monitor your farm in real-time with advanced surveillance tools, ensuring your assets and livestock are always secure.",
    icon: "📹", // Replace with an icon or image if you prefer
  },
  {
    title: "Record Keeping",
    description:
      "Easily track and manage farm data including animal health records, feed schedules and financial transactions.",
    icon: "📋",
  },
  {
    title: "Vet Requests",
    description:
      "Request veterinary services instantly and maintain detailed medical histories for your livestock.",
    icon: "🐾",
  },
  {
    title: "Market Auctions",
    description:
      "Connect with buyers and sellers through our integrated marketplace, designed to streamline trade and auctions.",
    icon: "🏷️",
  },
  {
    title: "Educational Resources",
    description:
      "Access a library of agricultural tips, tutorials and guides to improve your farm's productivity.",
    icon: "📚",
  },
  {
    title: "AI Assistance",
    description:
      "Leverage artificial intelligence to make smarter farming decisions, optimizing crop yield and livestock health.",
    icon: "🤖",
  },
  {
    title: "Feed Store",
    description:
      "Shop for quality feed and supplements for your livestock directly through our platform, ensuring they get the best nutrition.",
    icon: "🥩",
  },
  {
    title: "Drug Store",
    description:
      "Purchase veterinary drugs and treatments for your livestock, ensuring their health and well-being are always top priority.",
    icon: "💊",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <h1 className="text-center text-4xl font-bold text-amber-500">
        Features
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 container mx-auto px-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center text-center"
          >
            <div className="text-6xl mb-4 text-amber-500">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
            <p className="mt-2 text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
