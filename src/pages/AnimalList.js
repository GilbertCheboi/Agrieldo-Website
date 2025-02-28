// src/pages/AnimalList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import animal1 from "../assets/Ayrshires-Cattle-kenya-cow.jpg";
import animal2 from "../assets/ayrshr01.jpeg";
import animal3 from "../assets/dairy1.jpeg";
import Slider from "../components/ Sidebar";

export default function AnimalList() {
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("All");
  const images = [animal1, animal2, animal3]; // Cycle through these images

  const [animals] = useState([
    {
      name: "AG001-F1-G0-001/2024",
      breed: "Holstein",
      farmId: "AG001",
      lactationStatus: { lactationNumber: 1, daysInMilk: 40, isMilking: true },
      image: images[0],
      category: "Milking",
      pregnant: true, // Pregnant and milking
    },
    {
      name: "AG001-F2-G0-002/2024",
      breed: "Ayrshire",
      farmId: "AG001",
      lactationStatus: { lactationNumber: 2, daysInMilk: 120, isMilking: true },
      image: images[1],
      category: "Milking",
      pregnant: false, // Milking, not pregnant
    },
    {
      name: "AG002-F1-G0-003/2024",
      breed: "Jersey",
      farmId: "AG002",
      lactationStatus: { lactationNumber: 0, daysInMilk: 0, isMilking: false },
      image: images[2],
      category: "Heifer",
      pregnant: true, // Pregnant heifer
    },
    {
      name: "AG002-F3-G0-004/2024",
      breed: "Guernsey",
      farmId: "AG002",
      lactationStatus: { lactationNumber: 3, daysInMilk: 200, isMilking: false },
      image: images[0],
      category: "Dry",
      pregnant: false, // Dry, not pregnant
    },
  ]);

  // Filter animals based on category or pregnancy status
  const filteredAnimals = animals.filter((animal) => {
    if (filter === "All") return true;
    if (filter === "Pregnant") return animal.pregnant;
    return animal.category === filter;
  });

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <Slider onFilterChange={handleFilterChange} />
      <div className="fixed top-4 right-4 flex space-x-2">
        <button
          className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6">All Animals</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAnimals.map((animal, index) => (
          <Link
            key={animal.name}
            to={`/animal/${animal.name}`}
            className="bg-white shadow-md rounded-2xl p-4 h-80 flex transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <div className="flex-shrink-0">
              <img
                src={animal.image}
                alt={`${animal.name}`}
                className="w-60 h-60 object-cover rounded-lg mr-4"
              />
            </div>
            <div className="flex flex-col flex-grow justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{animal.name}</h2>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Breed:</strong> {animal.breed}</p>
                  <p><strong>Farm ID:</strong> {animal.farmId}</p>
                  <p><strong>Lactation:</strong> {animal.lactationStatus.lactationNumber}</p>
                  <p><strong>DIM:</strong> {animal.lactationStatus.daysInMilk}</p>
                  <p><strong>Milking:</strong> {animal.lactationStatus.isMilking ? "Yes" : "No"}</p>
                  <p><strong>Pregnant:</strong> {animal.pregnant ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}