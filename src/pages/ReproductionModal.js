import React from "react";

const ReproductionModal = ({ isOpen, setIsOpen, reproductionForm, setReproductionForm, handleAddReproduction }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Reproductive Event</h3>
        <div className="space-y-4">
          <input
            type="date"
            value={reproductionForm.date}
            onChange={(e) => setReproductionForm({ ...reproductionForm, date: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="Date"
          />
          <select
            value={reproductionForm.event}
            onChange={(e) => setReproductionForm({ ...reproductionForm, event: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
          >
            <option value="AI">Artificial Insemination (AI)</option>
            <option value="Natural Breeding">Natural Breeding</option>
            <option value="Calving">Calving</option>
          </select>
          <input
            type="text"
            value={reproductionForm.details}
            onChange={(e) => setReproductionForm({ ...reproductionForm, details: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="Details"
          />
          <input
            type="number"
            value={reproductionForm.cost}
            onChange={(e) => setReproductionForm({ ...reproductionForm, cost: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="Cost (Ksh.)"
            step="0.01"
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            onClick={handleAddReproduction}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReproductionModal;