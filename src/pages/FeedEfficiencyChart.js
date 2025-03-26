import React from "react";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Info } from "lucide-react";

const FeedEfficiencyChart = ({ productionChartData, darkMode, formatXAxis }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        Feed Efficiency
        <span className="ml-2" title="FCR: Feed Conversion Ratio - milk yield per kg of feed">
          <Info size={16} className="text-gray-500 dark:text-gray-400" />
        </span>
      </h2>
      <ScatterChart width={300} height={200}>
        <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#000"} tickFormatter={formatXAxis} />
        <YAxis stroke={darkMode ? "#fff" : "#000"} />
        <Tooltip contentStyle={{ backgroundColor: darkMode ? "#1F2937" : "#fff", color: darkMode ? "#fff" : "#000" }} />
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
        <Scatter data={productionChartData} fill="#FF8042" name="Milk per kg Feed" dataKey="FCR" shape="circle" />
      </ScatterChart>
    </div>
  );
};

export default FeedEfficiencyChart;