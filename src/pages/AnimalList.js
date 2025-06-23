import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, ArrowLeft } from "lucide-react";
import Slider from "../components/ Sidebar";
import { fetchAnimals } from "../services/api";
import LivestockSummary from "../components/LivestockSummary";

const calculateAgeInMonths = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  const diffMs = today - birthDate;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
};

export default function AnimalList() {
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("All");
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract farmId from URL query parameters
  const params = new URLSearchParams(location.search);
  const farmId = params.get("farmId") || params.get("farm_id") || params.get("FarmId");

  useEffect(() => {
    console.log("AnimalList: Component mounted");
    console.log("AnimalList: Current URL:", window.location.href);
    console.log("AnimalList: Query String:", location.search);
    console.log("AnimalList: Extracted farmId:", farmId);
    console.log("AnimalList: All Query Params:", Object.fromEntries(params));

    if (!farmId) {
      console.warn("AnimalList: farmId is undefined or missing.");
      setError("No farm selected. Please select a farm from the dashboard.");
      setLoading(false);
      return;
    }

    const loadAnimals = async () => {
      try {
        console.log("AnimalList: Fetching animals for farmId:", farmId);
        const data = await fetchAnimals({ farmId });
        setAnimals(data);
        setLoading(false);

        const category = params.get("category");
        const isPregnant = params.get("is_pregnant");
        const isSick = params.get("is_sick");

        if (category) setFilter(category);
        else if (isPregnant === "true") setFilter("In-Calf");
        else if (isSick === "true") setFilter("Sick");
      } catch (error) {
        console.error("AnimalList: Failed to load animals:", error);
        setError("Failed to load animals. Please try again.");
        setLoading(false);
      }
    };
    loadAnimals();
  }, [farmId, params]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredAnimals = animals.filter((animal) => {
    const category = params.get("category");
    const isPregnant = params.get("is_pregnant");
    const isSick = params.get("is_sick");

    if (category) return animal.category === category;
    if (isPregnant === "true") return animal.is_pregnant;
    if (isSick === "true") return animal.is_sick;

    switch (filter) {
      case "All":
        return true;
      case "In-Calf":
      case "Steaming":
        return animal.is_pregnant && animal.category === filter;
      case "Sick":
        return animal.is_sick;
      case "Early Lactating":
      case "Mid Lactating":
      case "Late Lactating":
        return animal.category === filter;
      default:
        return animal.category === filter;
    }
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Only pass farmId to Slider if it exists */}
      <Slider onFilterChange={handleFilterChange} farmType="Dairy" farmId={farmId || undefined} />

      <div
        className={`mb-6 p-4 rounded-2xl shadow-md ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <LivestockSummary farmId={farmId} navigate={navigate} />
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">My Animals</h1>
        <div className="flex space-x-2">
          <button
            className={`p-2 rounded-full transition ${
              darkMode
                ? "bg-green-700 text-white hover:bg-green-600"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            onClick={handleBackClick}
            aria-label="Go back to previous page"
          >
            <span className="sr-only">Back to Previous Page</span>
            <ArrowLeft size={20} />
          </button>
          <button
            className={`p-2 rounded-full transition ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
            onClick={() => setDarkMode(!darkMode)}
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAnimals.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No animals found for the selected filter.
          </p>
        ) : (
          filteredAnimals.map((animal) => {
            const currentLactation =
              animal.lactation_periods?.sort(
                (a, b) =>
                  new Date(b.last_calving_date) - new Date(a.last_calving_date)
              )[0] || {};

            return (
              <Link
                key={animal.id}
                to={`/animal/${animal.id}`}
                className={`shadow-md rounded-2xl p-4 flex transition-transform hover:scale-105 hover:shadow-lg ${
                  darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-900"
                }`}
                aria-label={`View details for ${animal.tag}`}
              >
                <div className="flex-shrink-0">
                  <img
                    src={
                      animal.images?.[0]?.image ||
                      "https://via.placeholder.com/128"
                    }
                    alt={`${animal.tag} image`}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg mr-4"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/128";
                    }}
                  />
                </div>
                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold mb-2">
                      {animal.tag} - {animal.name || "Unnamed"}
                    </h2>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Breed:</strong> {animal.breed || "N/A"}
                      </p>
                      <p>
                        <strong>Farm ID:</strong>{" "}
                        {animal.farm?.farm_id || "N/A"}
                      </p>
                      <p>
                        <strong>Category:</strong> {animal.category || "N/A"}
                      </p>
                      <p>
                        <strong>DIM:</strong>{" "}
                        {currentLactation.days_in_milk || 0}
                      </p>
                      <p>
                        <strong>Milking:</strong>{" "}
                        {currentLactation.is_milking ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Pregnant:</strong>{" "}
                        {animal.is_pregnant ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Latest Milk:</strong>{" "}
                        {animal.latest_milk_yield || "N/A"} L
                      </p>
                      <p>
                        <strong>EDC:</strong>{" "}
                        {currentLactation.expected_calving_date || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}