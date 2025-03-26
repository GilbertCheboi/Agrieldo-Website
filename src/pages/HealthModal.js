import React from "react";

const HealthModal = ({ isOpen, setIsOpen, healthForm, setHealthForm, handleAddHealth, handleUpdateHealth, isEditingHealth, setIsEditingHealth, setEditingHealthRecordId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {isEditingHealth ? "Edit Health Record" : "Add Health Record"}
        </h3>
        <div className="space-y-4">
          <input
            type="date"
            value={healthForm.date}
            onChange={(e) => setHealthForm({ ...healthForm, date: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="Date"
          />
          <input
            type="text"
            value={healthForm.type}
            onChange={(e) => setHealthForm({ ...healthForm, type: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="Type (e.g., Checkup)"
          />
          <input
            type="text"
            value={healthForm.details}
            onChange={(e) => setHealthForm({ ...healthForm, details: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="Details"
          />
          <input
            type="text"
            value={healthForm.clinical_signs}
            onChange={(e) => setHealthForm({ ...healthForm, clinical_signs: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="Clinical Signs"
          />
          <input
            type="text"
            value={healthForm.diagnosis}
            onChange={(e) => setHealthForm({ ...healthForm, diagnosis: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="Diagnosis"
          />
          <input
            type="text"
            value={healthForm.treatment}
            onChange={(e) => setHealthForm({ ...healthForm, treatment: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="Treatment"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={healthForm.is_sick}
              onChange={(e) => setHealthForm({ ...healthForm, is_sick: e.target.checked })}
              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
            />
            <span>Is Sick</span>
          </label>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            onClick={() => {
              setIsOpen(false);
              setIsEditingHealth(false);
              setEditingHealthRecordId(null);
              setHealthForm({ date: "", type: "", details: "", is_sick: false, clinical_signs: "", diagnosis: "", treatment: "" });
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            onClick={isEditingHealth ? handleUpdateHealth : handleAddHealth}
          >
            {isEditingHealth ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthModal;