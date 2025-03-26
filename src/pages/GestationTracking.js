import React from "react";

const GestationTracking = ({ animalData, darkMode }) => {
  const latestBreeding = animalData.reproductive_history.find(r => r.event === "AI" || r.event === "Natural Breeding");
  const isPregnant = latestBreeding && !animalData.reproductive_history.some(r => r.event === "Calving" && new Date(r.date) > new Date(latestBreeding.date));
  const expectedCalvingDate = animalData.lactation_status?.expected_calving_date;
  const dryPeriodStart = expectedCalvingDate ? new Date(expectedCalvingDate) - (60 * 24 * 60 * 60 * 1000) : null;
  const today = new Date();
  const isInDryPeriod = dryPeriodStart && today >= dryPeriodStart && today <= new Date(expectedCalvingDate);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Gestation Tracking</h2>
      <div className="space-y-2 text-sm">
        <p><strong>Pregnancy Status:</strong> {isPregnant ? "Pregnant" : "Not Pregnant"}</p>
        {isPregnant && (
          <>
            <p><strong>Last Breeding:</strong> {latestBreeding.date}</p>
            <p><strong>Expected Calving:</strong> {expectedCalvingDate || "N/A"}</p>
          </>
        )}
        <p><strong>Currently Milking:</strong> {animalData.lactation_status?.is_milking ? "Yes" : "No"}</p>
        <p><strong>Days in Milk:</strong> {animalData.lactation_status?.current_days_in_milk || animalData.lactation_status?.days_in_milk || 0}</p>
        <p><strong>Dry Period:</strong> {isInDryPeriod ? "Yes" : "No"}</p>
        {isInDryPeriod && (
          <p><strong>Dry Period Start:</strong> {dryPeriodStart.toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
};

export default GestationTracking;