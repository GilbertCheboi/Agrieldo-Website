import React from "react";
import { Info, Plus } from "lucide-react";

const ReproductiveHistory = ({ reproductiveHistory, darkMode, userType, setIsReproductionModalOpen }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto relative">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        Reproductive History
        <span className="ml-2" title="AI: Artificial Insemination - method to breed the cow">
          <Info size={16} className="text-gray-500 dark:text-gray-400" />
        </span>
      </h2>
      {(userType === 1 || userType === 2) && (
        <button
          onClick={() => setIsReproductionModalOpen(true)}
          className="absolute bottom-6 right-6 bg-orange-500 text-white rounded-full p-3 shadow-lg hover:bg-orange-600 transition z-10"
          title="Add Reproductive Event"
        >
          <Plus size={24} />
        </button>
      )}
      <ul className="space-y-2 text-sm">
        {reproductiveHistory.map((record, index) => (
          <li key={index} className="border-b border-gray-200 dark:border-gray-700 pb-2">
            <strong>{record.date}:</strong> {record.event} {record.details ? `- ${record.details}` : ""} (Cost: Ksh. {record.cost || 0})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReproductiveHistory;