import React from "react";

const LactationModal = ({ isOpen, setIsOpen, lactationForm, setLactationForm, handleAddLactation }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add a New Calving Record</h3>
        <div className="space-y-4">
          {/* Lactation Number */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Calving Number</label>
            <input
              type="number"
              value={lactationForm.lactation_number}
              onChange={(e) => setLactationForm({ ...lactationForm, lactation_number: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              placeholder="e.g., 2 for 2nd calving"
              min="1"
            />
            <p className="text-xs text-gray-500 mt-1">How many times has this cow calved? (e.g., 1st, 2nd, 3rd)</p>
          </div>

          {/* Last Calving Date */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Calving Date</label>
            <input
              type="date"
              value={lactationForm.last_calving_date}
              onChange={(e) => setLactationForm({ ...lactationForm, last_calving_date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            />
            <p className="text-xs text-gray-500 mt-1">When did this cow have her calf?</p>
          </div>

          {/* Is Milking */}
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={lactationForm.is_milking}
                onChange={(e) => setLactationForm({ ...lactationForm, is_milking: e.target.checked })}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-600">Giving Milk Now?</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">Check if she’s still milking after this calving.</p>
          </div>

          {/* Expected Calving Date */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Next Calving Date (if known)</label>
            <input
              type="date"
              value={lactationForm.expected_calving_date}
              onChange={(e) => setLactationForm({ ...lactationForm, expected_calving_date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            />
            <p className="text-xs text-gray-500 mt-1">When do you expect her next calf? Leave blank if unsure.</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            onClick={handleAddLactation}
          >
            Save Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default LactationModal;