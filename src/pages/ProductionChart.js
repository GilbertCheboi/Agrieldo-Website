import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Plus } from "lucide-react";

const ProductionChart = ({ productionChartData, darkMode, userType, setIsProductionModalOpen, formatXAxis, CustomTooltip }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-x-auto overflow-y-hidden relative">
      <h2 className="text-xl font-bold mb-4">Daily Milk Production</h2>
      {(userType === 1 || userType === 3) && (
        <button
          onClick={() => setIsProductionModalOpen(true)}
          className="absolute bottom-6 right-6 bg-orange-500 text-white rounded-full p-3 shadow-lg hover:bg-orange-600 transition z-10"
          title="Add Production Record"
        >
          <Plus size={24} />
        </button>
      )}
      <LineChart width={600} height={200} data={productionChartData}>
        <XAxis 
          dataKey="name" 
          stroke={darkMode ? "#fff" : "#000"} 
          tickFormatter={formatXAxis}
          interval={0}
          tick={{ fontSize: 12 }}
        />
        <YAxis stroke={darkMode ? "#fff" : "#000"} />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
        <Line 
          type="monotone" 
          dataKey="Milk" 
          stroke="#ffa500" 
          strokeWidth={2} 
          name="Milk Yield (L)" 
        />
      </LineChart>
    </div>
  );
};

export default ProductionChart;