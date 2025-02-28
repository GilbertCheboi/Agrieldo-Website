import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Plus } from "lucide-react";

const MachineryDetails = () => {
  const { id } = useParams();
  const [machinery, setMachinery] = useState(null);
  const [activeTab, setActiveTab] = useState("usageLogs");
  const [usageLogs, setUsageLogs] = useState([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const [fuelLogs, setFuelLogs] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchMachineryDetails();
    fetchLogs("usageLogs");
    fetchLogs("maintenanceLogs");
    fetchLogs("fuelLogs");
    fetchLogs("spareParts");
    fetchLogs("alerts");
  }, [id]);

  const fetchMachineryDetails = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`https://api.agrieldo.com/api/machinery/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMachinery(response.data);
    } catch (error) {
      console.error("Error fetching machinery details:", error);
    }
  };

  const fetchLogs = async (logType) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`https://api.agrieldo.com/api/machinery/${id}/${logType}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (logType === "usageLogs") setUsageLogs(response.data);
      if (logType === "maintenanceLogs") setMaintenanceLogs(response.data);
      if (logType === "fuelLogs") setFuelLogs(response.data);
      if (logType === "spareParts") setSpareParts(response.data);
      if (logType === "alerts") setAlerts(response.data);
    } catch (error) {
      console.error(`Error fetching ${logType}:`, error);
    }
  };

  if (!machinery) return <p className="text-gray-600 mt-6">Loading...</p>;

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{machinery.name}</h1>

      <div className="w-3/4">
        {machinery.image ? (
          <img
            src={machinery.image}
            alt={machinery.name}
            className="w-full h-auto object-cover rounded shadow-md"
            style={{ maxHeight: "350px" }}
          />
        ) : (
          <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-500 rounded shadow-md">
            No Image Available
          </div>
        )}
      </div>

      <div className="mt-6 space-y-2 text-gray-800">
        <p><strong>Model:</strong> {machinery.model || "N/A"}</p>
        <p><strong>Purchase Date:</strong> {machinery.purchase_date || "N/A"}</p>
        <p><strong>Condition:</strong> {machinery.condition || "Unknown"}</p>
      </div>

      <div className="flex space-x-4 mt-6 border-b pb-2">
        {["usageLogs", "maintenanceLogs", "fuelLogs", "spareParts", "alerts"].map((key) => (
          <button
            key={key}
            className={`px-4 py-2 font-semibold ${activeTab === key ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-600"}`}
            onClick={() => setActiveTab(key)}
          >
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </button>
        ))}
      </div>

      <div className="mt-4 text-gray-700 relative">
        {activeTab === "usageLogs" && (
          <div>
            <button className="fixed bottom-16 right-10 bg-orange-500 text-white p-4 rounded-full shadow-md" onClick={() => console.log("Add usage log")}> <Plus size={24} /> </button>
            <ul className="list-disc pl-6">
              {usageLogs.length > 0 ? (
                usageLogs.map((log) => (
                  <li key={log.id} className="border-b py-2">
                    <p><strong>Date:</strong> {log.date}</p>
                    <p><strong>Usage:</strong> {log.usage_hours} hours</p>
                    <p><strong>Description:</strong> {log.description || "No details provided"}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No usage logs available.</p>
              )}
            </ul>
          </div>
        )}

        {activeTab === "maintenanceLogs" && (
          <div>
            <button className="fixed bottom-16 right-10 bg-orange-500 text-white p-4 rounded-full shadow-md" onClick={() => console.log("Add maintenance log")}> <Plus size={24} /> </button>
            <ul className="list-disc pl-6">
              {maintenanceLogs.length > 0 ? (
                maintenanceLogs.map((log) => (
                  <li key={log.id} className="border-b py-2">
                    <p><strong>Date:</strong> {log.date}</p>
                    <p><strong>Details:</strong> {log.details}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No maintenance logs available.</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MachineryDetails;
