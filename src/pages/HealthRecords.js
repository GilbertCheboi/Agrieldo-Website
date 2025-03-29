import React from "react";
import { Info, Plus, Pen } from "lucide-react";

const HealthRecords = ({ healthRecords, darkMode, userType, setIsHealthModalOpen, setIsEditingHealth, setHealthForm, setEditingHealthRecordId, handleEditHealth }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto relative">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        Health Records
        <span className="ml-2" title="SCC: Somatic Cell Count - measure of milk quality, higher indicates infection">
          <Info size={16} className="text-gray-500 dark:text-gray-400" />
        </span>
      </h2>
      {(userType === 1 || userType === 2) && (
        <button
          onClick={() => {
            setIsEditingHealth(false);
            setHealthForm({ date: "", type: "", details: "", is_sick: false, clinical_signs: "", diagnosis: "", treatment: "", cost: "" });
            setIsHealthModalOpen(true);
          }}
          className="absolute bottom-6 right-6 bg-orange-500 text-white rounded-full p-3 shadow-lg hover:bg-orange-600 transition z-10"
          title="Add Health Record"
        >
          <Plus size={24} />
        </button>
      )}
      <ul className="space-y-2 text-sm">
        {healthRecords.map((record, index) => (
          <li key={index} className="border-b border-gray-200 dark:border-gray-700 pb-2 flex justify-between items-start">
            <div>
              <strong>{record.date}:</strong> {record.type} - {record.details} (Cost: Ksh. {record.cost || 0})
              {record.clinical_signs && <p><strong>Signs:</strong> {record.clinical_signs}</p>}
              {record.diagnosis && <p><strong>Diagnosis:</strong> {record.diagnosis}</p>}
              {record.treatment && <p><strong>Treatment:</strong> {record.treatment}</p>}
            </div>
            {(userType === 1 || userType === 2) && (
              <button
                onClick={() => handleEditHealth(record)}
                className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                title="Edit Health Record"
              >
                <Pen size={16} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthRecords;