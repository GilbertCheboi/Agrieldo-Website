import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const FinancialOverview = ({ financialChartData, totalCost, darkMode }) => {
  const COLORS = ["#FF8042", "#FFBB28", "#00C49F", "#0088FE"];

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto">
      <h2 className="text-xl font-bold mb-2">Financial Overview</h2>
      <div className="flex flex-col h-full">
        <div className="mb-2">
          <p className="text-sm">
            <strong>Total Cost:</strong> Ksh.{totalCost.toFixed(2)}
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center min-h-0">
          <PieChart width={260} height={200}>
            <Pie
              data={financialChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label={({ name, value }) => `${name}: Ksh.${value.toFixed(2)}`}
              labelLine={{ stroke: '#666', strokeWidth: 1 }}
            >
              {financialChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
              wrapperStyle={{ fontSize: '12px', paddingTop: '5px' }}
            />
            <Tooltip formatter={(value) => `Ksh.${value.toFixed(2)}`} />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;