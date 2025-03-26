import React from "react";
import { Plus } from "lucide-react";

const GestationTracking = ({ animalData, darkMode, userType, setIsLactationModalOpen }) => {
  // Get the latest lactation period (most recent calving)
  const currentLactation = animalData.lactation_periods?.sort(
    (a, b) => new Date(b.last_calving_date) - new Date(a.last_calving_date)
  )[0] || {};

  // Pregnancy logic (unchanged from previous)
  const latestBreeding = animalData.reproductive_history?.filter(
    r => r.date > (currentLactation.last_calving_date || "1900-01-01")
  ).find(r => r.event === "AI" || r.event === "Natural Breeding");
  const isPregnant = latestBreeding && !animalData.reproductive_history?.some(
    r => r.event === "Calving" && new Date(r.date) > new Date(latestBreeding.date)
  );
  const dryPeriodStart = currentLactation.expected_calving_date
    ? new Date(currentLactation.expected_calving_date) - (60 * 24 * 60 * 60 * 1000)
    : null;
  const today = new Date();
  const isInDryPeriod = dryPeriodStart && today >= dryPeriodStart && today <= new Date(currentLactation.expected_calving_date);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto relative">
      <h2 className="text-xl font-bold mb-4">Gestation Tracking</h2>
      {(userType === 1 || userType === 2) && (
        <button
          onClick={() => setIsLactationModalOpen(true)}
          className="absolute bottom-6 right-6 bg-orange-500 text-white rounded-full p-3 shadow-lg hover:bg-orange-600 transition z-10"
          title="Add Calving Record"
        >
          <Plus size={24} />
        </button>
      )}
      <div className="space-y-2 text-sm">
        <p><strong>Current Calving Number:</strong> {currentLactation.lactation_number || "None yet"}</p>
        <p><strong>Days in Milk:</strong> {currentLactation.days_in_milk || "0"}</p>
        <p><strong>Giving Milk:</strong> {currentLactation.is_milking ? "Yes" : "No"}</p>
        <p><strong>Last Calving Date:</strong> {currentLactation.last_calving_date || "N/A"}</p>
        <p><strong>Pregnancy Status:</strong> {isPregnant ? "Pregnant" : "Not Pregnant"}</p>
        {isPregnant && (
          <>
            <p><strong>Last Breeding:</strong> {latestBreeding.date}</p>
            <p><strong>Next Calving:</strong> {currentLactation.expected_calving_date || "N/A"}</p>
          </>
        )}
        <p><strong>In Dry Period:</strong> {isInDryPeriod ? "Yes" : "No"}</p>
        {isInDryPeriod && (
          <p><strong>Dry Period Started:</strong> {dryPeriodStart.toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
};

export default GestationTracking;