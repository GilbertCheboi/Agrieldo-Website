import React from "react";

const LifetimePerformance = ({ lifetimeStats, darkMode }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Lifetime Performance</h2>
      <div className="space-y-2 text-sm">
        <p><strong>Total Milk:</strong> {lifetimeStats?.total_milk || 0} L</p>
        <p><strong>Avg Yield:</strong> {lifetimeStats?.avg_yield || 0} L/day</p>
        <p><strong>Calves:</strong> {lifetimeStats?.calves || 0}</p>
      </div>
    </div>
  );
};

export default LifetimePerformance;