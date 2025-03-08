import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Added useLocation
import { Sun, Moon } from "lucide-react";
import Slider from "../components/ Sidebar";
import { fetchAnimals } from "../services/api";

const calculateAgeInMonths = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date("2025-03-04"); // Match LivestockOverview
  const diffMs = today - birthDate;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
};

export default function AnimalList() {
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("All");
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation(); // Added to read URL params

  useEffect(() => {
    const loadAnimals = async () => {
      try {
        const data = await fetchAnimals();
        console.log("Fetched Animals:", data);
        setAnimals(data);
        setLoading(false);

        // Sync filter with URL query parameters on initial load
        const params = new URLSearchParams(location.search);
        const category = params.get("category");
        const isPregnant = params.get("is_pregnant");
        const isSick = params.get("is_sick");
        const age = params.get("age");

        if (category) setFilter(category);
        else if (isPregnant === "true") setFilter("Pregnant");
        else if (isSick === "true") setFilter("Sick");
        else if (age === "Newborn") setFilter("Newborn");
      } catch (error) {
        console.error("Failed to load animals:", error);
        setError("Failed to load animals");
        setLoading(false);
      }
    };
    loadAnimals();
  }, [location.search]); // Re-run when URL changes

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredAnimals = animals.filter((animal) => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const isPregnant = params.get("is_pregnant");
    const isSick = params.get("is_sick");
    const age = params.get("age");

    // Apply URL filters first (override Slider filter if present)
    if (category) return animal.category === category;
    if (isPregnant === "true") return animal.is_pregnant;
    if (isSick === "true") return animal.health_records && animal.health_records.some(record => record.is_sick);
    if (age === "Newborn") return calculateAgeInMonths(animal.dob) < 1;

    // Fallback to Slider filter if no URL params
    if (filter === "All") return true;
    if (filter === "Pregnant") return animal.is_pregnant;
    if (filter === "Sick") return animal.health_records && animal.health_records.some(record => record.is_sick);
    if (filter === "Newborn") return calculateAgeInMonths(animal.dob) < 1;
    return animal.category === filter;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
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
        {filteredAnimals.map((animal) => (
          <Link
            key={animal.id}
            to={`/animal/${animal.id}`}
            className="bg-white shadow-md rounded-2xl p-4 h-80 flex transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <div className="flex-shrink-0">
              <img
                src={animal.images[0]?.image || "https://via.placeholder.com/128"}
                alt={animal.tag}
                className="w-32 h-32 object-cover rounded-lg mr-4"
                onError={(e) => console.log(`Failed to load image for ${animal.tag}:`, e)}
              />
            </div>
            <div className="flex flex-col flex-grow justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {animal.tag} - {animal.name || "Unnamed"}
                </h2>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Breed:</strong> {animal.breed}</p>
                  <p><strong>Farm ID:</strong> {animal.farm?.farm_id || "N/A"}</p>
                  <p><strong>Lactation:</strong> {animal.lactation_status?.lactation_number || 0}</p>
                  <p><strong>DIM:</strong> {animal.lactation_status?.days_in_milk || 0}</p>
                  <p><strong>Milking:</strong> {animal.lactation_status?.is_milking ? "Yes" : "No"}</p>
                  <p><strong>Pregnant:</strong> {animal.is_pregnant ? "Yes" : "No"}</p>
                  <p><strong>Latest Milk:</strong> {animal.latest_milk_yield} L</p>
                  <p><strong>EDC:</strong> {animal.lactation_status?.expected_calving_date || "N/A"}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}