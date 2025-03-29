import React from "react";

const ProductionModal = ({ isOpen, setIsOpen, productionForm, setProductionForm, handleAddProduction }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Production Record</h3>
        <div className="space-y-4">
          <input
            type="date"
            value={productionForm.date}
            onChange={(e) => setProductionForm({ ...productionForm, date: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="Date"
          />
          <select
            value={productionForm.session}
            onChange={(e) => setProductionForm({ ...productionForm, session: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
          >
            <option value="MORNING">Morning</option>
            <option value="AFTERNOON">Afternoon</option>
            <option value="EVENING">Evening</option>
          </select>
          <input
            type="number"
            value={productionForm.milk_yield}
            onChange={(e) => setProductionForm({ ...productionForm, milk_yield: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="Milk Yield (L)"
            step="0.1"
          />
          <input
            type="number"
            value={productionForm.scc}
            onChange={(e) => setProductionForm({ ...productionForm, scc: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="SCC (x1000)"
          />
          <input
            type="number"
            value={productionForm.feed_consumption}
            onChange={(e) => setProductionForm({ ...productionForm, feed_consumption: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="Feed Consumption (kg)"
            step="0.1"
          />
          <input
            type="number"
            value={productionForm.fat_percentage}
            onChange={(e) => setProductionForm({ ...productionForm, fat_percentage: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="Fat Percentage (%)"
            step="0.1"
          />
          <input
            type="number"
            value={productionForm.protein_percentage}
            onChange={(e) => setProductionForm({ ...productionForm, protein_percentage: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            placeholder="Protein Percentage (%)"
            step="0.1"
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
            onClick={handleAddProduction}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductionModal;