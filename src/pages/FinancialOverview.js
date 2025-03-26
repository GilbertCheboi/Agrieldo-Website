import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const FinancialOverview = ({ financialChartData, darkMode }) => {
  const COLORS = ["#FF8042", "#FFBB28", "#00C49F", "#0088FE"];

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Financial Overview</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={financialChartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({ name, value }) => `${name}: $${value}`}
          labelLine={true}
        >
          {financialChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
};

export default FinancialOverview;