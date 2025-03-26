import React from "react";
import { Info } from "lucide-react";

const ProfileCard = ({ animalData, darkMode }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto col-span-1 md:col-span-2 lg:col-span-1">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        Animal Profile
        <span className="ml-2" title="DIM: Days In Milk - days since last calving">
          <Info size={16} className="text-gray-500 dark:text-gray-400" />
        </span>
      </h2>
      <div className="space-y-2 text-sm">
        <p className="text-xl font-bold text-gray-800">
          Tag: {animalData.tag} {animalData.name ? `- ${animalData.name}` : ""}
        </p>
        <p><strong>Breed:</strong> {animalData.breed}</p>
        <p><strong>Date of Birth:</strong> {animalData.dob}</p>
        <p><strong>Gender:</strong> {animalData.gender}</p>
        <p><strong>Farm ID:</strong> {animalData.farm?.farm_id || "N/A"}</p>
        <p><strong>Owner:</strong> {animalData.owner}</p>
        <p><strong>Lactation:</strong> {animalData.lactation_status?.lactation_number || 0} (DIM: {animalData.lactation_status?.days_in_milk || 0})</p>
        <p><strong>Behavior Notes:</strong> {animalData.behavior_notes || "N/A"}</p>
      </div>
    </div>
  );
};

export default ProfileCard;