import React from "react";

const Alerts = ({ alerts, darkMode }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Alerts</h2>
      {alerts.length ? (
        <ul className="space-y-2 text-sm text-red-600 dark:text-red-400">
          {alerts.map((alert, idx) => <li key={idx}>{alert}</li>)}
        </ul>
      ) : <p className="text-green-600 dark:text-green-400 text-sm">No active alerts</p>}
    </div>
  );
};

export default Alerts;