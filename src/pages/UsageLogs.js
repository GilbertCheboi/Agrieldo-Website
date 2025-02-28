import React, { useState, useEffect } from "react";
import axios from "axios";

const UsageLogs = () => {
  const [logs, setLogs] = useState([]);
  const [formData, setFormData] = useState({
    machinery_id: "",
    operator: "",
    hours_used: "",
    purpose: "",
    date: "",
  });

  useEffect(() => {
    fetchUsageLogs();
  }, []);

  const fetchUsageLogs = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found, please log in.");
        return;
      }
      const response = await axios.get("http://207.154.253.97:8001/api/machinery/usage-logs/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching usage logs:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found, please log in.");
        return;
      }
      await axios.post("http://207.154.253.97:8001/api/machinery/usage-logs/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      fetchUsageLogs();
    } catch (error) {
      console.error("Error adding usage log:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Machinery Usage Logs</h1>
      
      {/* Logs List */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Usage History</h2>
        <ul>
          {logs.map((log) => (
            <li key={log.id} className="border-b py-2">
              <strong>{log.operator}</strong> used machinery ID {log.machinery_id} for {log.hours_used} hours on {log.date} for {log.purpose}.
            </li>
          ))}
        </ul>
      </div>
      
      {/* Add Usage Log Form */}
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-lg font-semibold mb-2">Add Usage Log</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="machinery_id"
            placeholder="Machinery ID"
            className="w-full border p-2 mb-2"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="operator"
            placeholder="Operator Name"
            className="w-full border p-2 mb-2"
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="hours_used"
            placeholder="Hours Used"
            className="w-full border p-2 mb-2"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="purpose"
            placeholder="Purpose"
            className="w-full border p-2 mb-2"
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="date"
            className="w-full border p-2 mb-2"
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save Log</button>
        </form>
      </div>
    </div>
  );
};

export default UsageLogs;
