import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Info } from "lucide-react";

const MilkQualityChart = ({ productionChartData, darkMode, formatXAxis }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        Milk Quality
        <span className="ml-2" title="SCC: Somatic Cell Count - measure of milk quality, higher indicates infection">
          <Info size={16} className="text-gray-500 dark:text-gray-400" />
        </span>
      </h2>
      <AreaChart width={300} height={200} data={productionChartData}>
        <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#000"} tickFormatter={formatXAxis} />
        <YAxis stroke={darkMode ? "#fff" : "#000"} />
        <Tooltip contentStyle={{ backgroundColor: darkMode ? "#1F2937" : "#fff", color: darkMode ? "#fff" : "#000" }} />
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
        <Area type="monotone" dataKey="SCC" stackId="1" stroke="#0088FE" fill="#0088FE" name="SCC (x1000)" opacity={0.9} />
        <Area type="monotone" dataKey="Fat" stackId="1" stroke="#FFBB28" fill="#FFBB28" name="Fat %" opacity={0.7} />
        <Area type="monotone" dataKey="Protein" stackId="1" stroke="#FF8042" fill="#FF8042" name="Protein %" opacity={0.5} />
      </AreaChart>
    </div>
  );
};

export default MilkQualityChart;