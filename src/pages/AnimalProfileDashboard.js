// src/pages/AnimalProfileDashboard.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, AreaChart, Area, ScatterChart, Scatter, LineChart, Line } from "recharts";
import { Sun, Moon, Download, ChevronLeft, ChevronRight, Info, Plus, Pen } from "lucide-react";
import { fetchAnimalDetails, updateHealthRecord, addProductionData, addHealthRecord, addReproductiveHistory } from "../services/api";

export default function AnimalProfileDashboard() {
  const { id: animalId } = useParams();
  const animalIdInt = parseInt(animalId, 10);
  const [darkMode, setDarkMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animalData, setAnimalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const userType = parseInt(localStorage.getItem("user_type"), 10); // 1 = Farmer, 2 = Vet, 3 = Staff

  // Modal states
  const [isProductionModalOpen, setIsProductionModalOpen] = useState(false);
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
  const [isReproductionModalOpen, setIsReproductionModalOpen] = useState(false);
  const [isEditingHealth, setIsEditingHealth] = useState(false);
  const [editingHealthRecordId, setEditingHealthRecordId] = useState(null);

  // Form states
  const [productionForm, setProductionForm] = useState({ date: "", milk_yield: "", scc: "", feed_consumption: "", fat_percentage: "", protein_percentage: "" });
  const [healthForm, setHealthForm] = useState({ date: "", type: "", details: "", is_sick: false, clinical_signs: "", diagnosis: "", treatment: "" });
  const [reproductionForm, setReproductionForm] = useState({ date: "", event: "AI", details: "" });

  useEffect(() => {
    const loadAnimalData = async () => {
      try {
        setLoading(true);
        const data = await fetchAnimalDetails(animalIdInt);
        console.log("Fetched Animal Data:", data);

        // Sort the data by date
        const sortedData = {
          ...data,
          production_data: [...data.production_data].sort((a, b) => new Date(a.date) - new Date(b.date)),
          health_records: [...data.health_records].sort((a, b) => new Date(a.date) - new Date(b.date)),
          reproductive_history: [...data.reproductive_history].sort((a, b) => new Date(a.date) - new Date(b.date)),
        };

        setAnimalData(sortedData);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load animal data");
        setLoading(false);
      }
    };
    loadAnimalData();
  }, [animalIdInt, reloadTrigger]);

  const handleAddProduction = async () => {
    try {
      const newRecord = {
        date: productionForm.date || new Date().toISOString().split('T')[0],
        milk_yield: parseFloat(productionForm.milk_yield) || 0,
        scc: parseInt(productionForm.scc, 10) || 0,
        feed_consumption: parseFloat(productionForm.feed_consumption) || 0,
        fat_percentage: parseFloat(productionForm.fat_percentage) || 0,
        protein_percentage: parseFloat(productionForm.protein_percentage) || 0
      };
      await addProductionData(animalIdInt, newRecord);
      setReloadTrigger(prev => prev + 1); // Trigger reload
      setIsProductionModalOpen(false);
      setProductionForm({ date: "", milk_yield: "", scc: "", feed_consumption: "", fat_percentage: "", protein_percentage: "" });
    } catch (err) {
      setError("Failed to add production record: " + (err.message || "Permission denied"));
    }
  };

  const handleAddHealth = async () => {
    try {
      const newRecord = {
        animal: animalIdInt,
        date: healthForm.date || new Date().toISOString().split('T')[0],
        type: healthForm.type || "Checkup",
        details: healthForm.details || "",
        is_sick: healthForm.is_sick,
        clinical_signs: healthForm.clinical_signs || "",
        diagnosis: healthForm.diagnosis || "",
        treatment: healthForm.treatment || ""
      };
      await addHealthRecord(animalIdInt, newRecord);
      setReloadTrigger(prev => prev + 1); // Trigger reload
      setIsHealthModalOpen(false);
      setHealthForm({ date: "", type: "", details: "", is_sick: false, clinical_signs: "", diagnosis: "", treatment: "" });
    } catch (err) {
      setError("Failed to add health record: " + (err.message || "Permission denied"));
    }
  };

  const handleUpdateHealth = async () => {
    try {
      const updatedRecord = {
        date: healthForm.date || new Date().toISOString().split('T')[0],
        type: healthForm.type || "Checkup",
        details: healthForm.details || "",
        is_sick: healthForm.is_sick,
        clinical_signs: healthForm.clinical_signs || "",
        diagnosis: healthForm.diagnosis || "",
        treatment: healthForm.treatment || ""
      };
      await updateHealthRecord(editingHealthRecordId, updatedRecord);
      setReloadTrigger(prev => prev + 1); // Trigger reload
      setIsHealthModalOpen(false);
      setIsEditingHealth(false);
      setEditingHealthRecordId(null);
      setHealthForm({ date: "", type: "", details: "", is_sick: false, clinical_signs: "", diagnosis: "", treatment: "" });
    } catch (err) {
      setError("Failed to update health record: " + (err.message || "Permission denied"));
    }
  };

  const handleEditHealth = (record) => {
    setHealthForm({
      date: record.date,
      type: record.type,
      details: record.details,
      is_sick: Boolean(record.is_sick),
      clinical_signs: record.clinical_signs || "",
      diagnosis: record.diagnosis || "",
      treatment: record.treatment || ""
    });
    setEditingHealthRecordId(record.id);
    setIsEditingHealth(true);
    setIsHealthModalOpen(true);
  };

  const handleAddReproduction = async () => {
    console.log("Animal ID:", animalIdInt);
    try {
      const newRecord = {
        date: reproductionForm.date || new Date().toISOString().split('T')[0],
        event: reproductionForm.event,
        details: reproductionForm.details || ""
      };
      await addReproductiveHistory(animalIdInt, newRecord);
      setReloadTrigger(prev => prev + 1); // Trigger reload
      setIsReproductionModalOpen(false);
      setReproductionForm({ date: "", event: "AI", details: "" });
    } catch (err) {
      setError("Failed to add reproductive record: " + (err.message || "Permission denied"));
    }
  };

  const handleExport = () => {
    alert("Exporting profile data... (Implement PDF/CSV generation here)");
  };

  const handleNextImage = () => setCurrentImageIndex((prev) => (prev + 1) % animalData.images.length);
  const handlePrevImage = () => setCurrentImageIndex((prev) => (prev - 1 + animalData.images.length) % animalData.images.length);

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;
  if (!animalData) return <div className="text-center p-6">No data available</div>;

  const productionChartData = animalData.production_data.map(record => ({
    name: record.date,
    Milk: record.milk_yield,
    Feed: record.feed_consumption,
    SCC: record.scc,
    Fat: record.fat_percentage,
    Protein: record.protein_percentage,
    FCR: record.feed_consumption ? (record.milk_yield / record.feed_consumption).toFixed(2) : 0,
  }));

  const financialChartData = [
    { name: "Feed Costs", value: animalData.financial_details?.feed_cost_per_month || 0 },
    { name: "Vet Expenses", value: animalData.financial_details?.vet_expenses || 0 },
    { name: "Breeding Costs", value: animalData.financial_details?.breeding_costs || 0 },
    { name: "Milk Revenue", value: animalData.financial_details?.revenue_from_milk || 0 },
  ];

  const alerts = [];
  if (animalData.production_data.some(record => record.scc > 200)) {
    alerts.push("High SCC Detected");
  }
  if (animalData.reproductive_history.length > 0 && 
      (new Date() - new Date(animalData.reproductive_history.slice(-1)[0].date)) > 21 * 24 * 60 * 60 * 1000) {
    alerts.push("Due for Heat Check");
  }
  if (animalData.latest_milk_yield < 10) {
    alerts.push("Low Milk Production (< 10L)");
  }
  if (animalData.production_data.length >= 2) {
    const sortedProduction = [...animalData.production_data].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latest = sortedProduction[0].milk_yield;
    const previous = sortedProduction[1].milk_yield;
    if (latest < previous - 1) {
      alerts.push(`Milk Production Dropping (${(previous - latest).toFixed(1)}L)`);
    }
  }
  if (animalData.lactation_status?.expected_calving_date) {
    const edc = new Date(animalData.lactation_status.expected_calving_date);
    const daysUntilCalving = Math.ceil((edc - new Date()) / (1000 * 60 * 60 * 24));
    if (daysUntilCalving > 0 && daysUntilCalving <= 30) {
      alerts.push(`Upcoming Calving in ${daysUntilCalving} days (${edc.toLocaleDateString()})`);
    }
  }

  const COLORS = ["#FF8042", "#FFBB28", "#00C49F", "#0088FE"];
  const CHART_COLORS = { Milk: "#ffa500", Feed: "#00C49F", SCC: "#0088FE", Fat: "#FFBB28", Protein: "#FF8042", FCR: "#FF8042" };

  const latestBreeding = animalData.reproductive_history.find(r => r.event === "AI" || r.event === "Natural Breeding");
  const isPregnant = latestBreeding && !animalData.reproductive_history.some(r => r.event === "Calving" && new Date(r.date) > new Date(latestBreeding.date));
  const expectedCalvingDate = latestBreeding?.expected_calving_date;
  const dryPeriodStart = expectedCalvingDate ? new Date(expectedCalvingDate) - (60 * 24 * 60 * 60 * 1000) : null;
  const today = new Date();
  const isInDryPeriod = dryPeriodStart && today >= dryPeriodStart && today <= new Date(expectedCalvingDate);

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <div className="fixed top-4 right-4 flex space-x-2 z-50">
        <button className="p-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="p-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition" onClick={handleExport}>
          <Download size={20} />
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Image Gallery Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-80 relative col-span-1 md:col-span-2 lg:col-span-1 overflow-hidden">
          <div className="w-full h-full relative">
            <img
              src={animalData.images[currentImageIndex]?.image || "https://via.placeholder.com/128"}
              alt={`Animal Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover rounded-lg transition-opacity duration-300"
              onError={(e) => console.log(`Failed to load image ${currentImageIndex + 1}:`, e)}
            />
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {animalData.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Animal Profile Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto col-span-1 md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            Animal Profile
            <span className="ml-2" title="DIM: Days In Milk - days since last calving">
              <Info size={16} className="text-gray-500 dark:text-gray-400" />
            </span>
          </h2>
          <div className="space-y-2 text-sm">
            <p className="text-xl font-bold text-gray-800">
              Tag: {animalData.tag} {animalData.name ? `- ${animalData.name}` : ""}
            </p>
            <p><strong>Breed:</strong> {animalData.breed}</p>
            <p><strong>Date of Birth:</strong> {animalData.dob}</p>
            <p><strong>Gender:</strong> {animalData.gender}</p>
            <p><strong>Farm ID:</strong> {animalData.farm?.farm_id || "N/A"}</p>
            <p><strong>Owner:</strong> {animalData.owner}</p>
            <p><strong>Lactation:</strong> {animalData.lactation_status?.lactation_number || 0} (DIM: {animalData.lactation_status?.days_in_milk || 0})</p>
            <p><strong>Behavior Notes:</strong> {animalData.behavior_notes || "N/A"}</p>
          </div>
        </div>

        {/* Daily Milk Production */}
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
            <Tooltip contentStyle={{ backgroundColor: darkMode ? "#1F2937" : "#fff", color: darkMode ? "#fff" : "#000" }} />
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
            <Line type="monotone" dataKey="Milk" stroke={CHART_COLORS.Milk} strokeWidth={2} name="Milk Yield (L)" />
          </LineChart>
        </div>

        {/* Reproductive History */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto relative">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            Reproductive History
            <span className="ml-2" title="AI: Artificial Insemination - method to breed the cow">
              <Info size={16} className="text-gray-500 dark:text-gray-400" />
            </span>
          </h2>
          {(userType === 1 || userType === 2) && (
            <button
              onClick={() => setIsReproductionModalOpen(true)}
              className="absolute bottom-6 right-6 bg-orange-500 text-white rounded-full p-3 shadow-lg hover:bg-orange-600 transition z-10"
              title="Add Reproductive Event"
            >
              <Plus size={24} />
            </button>
          )}
          <ul className="space-y-2 text-sm">
            {animalData.reproductive_history.map((record, index) => (
              <li key={index} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                <strong>{record.date}:</strong> {record.event} {record.details ? `- ${record.details}` : ""}
              </li>
            ))}
          </ul>
        </div>

        {/* Alerts */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Alerts</h2>
          {alerts.length ? (
            <ul className="space-y-2 text-sm text-red-600 dark:text-red-400">
              {alerts.map((alert, idx) => <li key={idx}>{alert}</li>)}
            </ul>
          ) : <p className="text-green-600 dark:text-green-400 text-sm">No active alerts</p>}
        </div>

        {/* Health Records */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto relative">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            Health Records
            <span className="ml-2" title="SCC: Somatic Cell Count - measure of milk quality, higher indicates infection">
              <Info size={16} className="text-gray-500 dark:text-gray-400" />
            </span>
          </h2>
          {(userType === 1 || userType === 2) && (
            <button
              onClick={() => {
                setIsEditingHealth(false);
                setHealthForm({ date: "", type: "", details: "", is_sick: false, clinical_signs: "", diagnosis: "", treatment: "" });
                setIsHealthModalOpen(true);
              }}
              className="absolute bottom-6 right-6 bg-orange-500 text-white rounded-full p-3 shadow-lg hover:bg-orange-600 transition z-10"
              title="Add Health Record"
            >
              <Plus size={24} />
            </button>
          )}
          <ul className="space-y-2 text-sm">
            {animalData.health_records.map((record, index) => (
              <li key={index} className="border-b border-gray-200 dark:border-gray-700 pb-2 flex justify-between items-start">
                <div>
                  <strong>{record.date}:</strong> {record.type} - {record.details}
                  {record.clinical_signs && <p><strong>Signs:</strong> {record.clinical_signs}</p>}
                  {record.diagnosis && <p><strong>Diagnosis:</strong> {record.diagnosis}</p>}
                  {record.treatment && <p><strong>Treatment:</strong> {record.treatment}</p>}
                </div>
                {(userType === 1 || userType === 2) && (
                  <button
                    onClick={() => handleEditHealth(record)}
                    className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                    title="Edit Health Record"
                  >
                    <Pen size={16} />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Production vs Feed */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            Production vs Feed
            <span className="ml-2" title="FCR: Feed Conversion Ratio - milk yield per kg of feed">
              <Info size={16} className="text-gray-500 dark:text-gray-400" />
            </span>
          </h2>
          <BarChart width={300} height={200} data={productionChartData}>
            <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#000"} />
            <YAxis stroke={darkMode ? "#fff" : "#000"} />
            <Tooltip contentStyle={{ backgroundColor: darkMode ? "#1F2937" : "#fff", color: darkMode ? "#fff" : "#000" }} />
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
            <Bar dataKey="Milk" fill={CHART_COLORS.Milk} name="Milk Yield (L)" />
            <Bar dataKey="Feed" fill={CHART_COLORS.Feed} name="Feed (kg)" />
          </BarChart>
        </div>

        {/* Milk Quality */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            Milk Quality
            <span className="ml-2" title="SCC: Somatic Cell Count - measure of milk quality, higher indicates infection">
              <Info size={16} className="text-gray-500 dark:text-gray-400" />
            </span>
          </h2>
          <AreaChart width={300} height={200} data={productionChartData}>
            <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#000"} />
            <YAxis stroke={darkMode ? "#fff" : "#000"} />
            <Tooltip contentStyle={{ backgroundColor: darkMode ? "#1F2937" : "#fff", color: darkMode ? "#fff" : "#000" }} />
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
            <Area type="monotone" dataKey="SCC" stackId="1" stroke={CHART_COLORS.SCC} fill={CHART_COLORS.SCC} name="SCC (x1000)" opacity={0.9} />
            <Area type="monotone" dataKey="Fat" stackId="1" stroke={CHART_COLORS.Fat} fill={CHART_COLORS.Fat} name="Fat %" opacity={0.7} />
            <Area type="monotone" dataKey="Protein" stackId="1" stroke={CHART_COLORS.Protein} fill={CHART_COLORS.Protein} name="Protein %" opacity={0.5} />
          </AreaChart>
        </div>

        {/* Feed Efficiency */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            Feed Efficiency
            <span className="ml-2" title="FCR: Feed Conversion Ratio - milk yield per kg of feed">
              <Info size={16} className="text-gray-500 dark:text-gray-400" />
            </span>
          </h2>
          <ScatterChart width={300} height={200}>
            <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#000"} />
            <YAxis stroke={darkMode ? "#fff" : "#000"} />
            <Tooltip contentStyle={{ backgroundColor: darkMode ? "#1F2937" : "#fff", color: darkMode ? "#fff" : "#000" }} />
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
            <Scatter data={productionChartData} fill={CHART_COLORS.FCR} name="Milk per kg Feed" dataKey="FCR" shape="circle" />
          </ScatterChart>
        </div>

        {/* Lifetime Performance */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Lifetime Performance</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Total Milk:</strong> {animalData.lifetime_stats?.total_milk || 0} L</p>
            <p><strong>Avg Yield:</strong> {animalData.lifetime_stats?.avg_yield || 0} L/day</p>
            <p><strong>Calves:</strong> {animalData.lifetime_stats?.calves || 0}</p>
          </div>
        </div>

        {/* Gestation Tracking */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Gestation Tracking</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Pregnancy Status:</strong> {animalData.is_pregnant ? "Pregnant" : "Not Pregnant"}</p>
            {animalData.is_pregnant && (
              <>
                <p><strong>Last Breeding:</strong> {latestBreeding.date}</p>
                <p><strong>Expected Calving:</strong> {animalData.lactation_status?.expected_calving_date || "N/A"}</p>
              </>
            )}
            <p><strong>Currently Milking:</strong> {animalData.lactation_status?.is_milking ? "Yes" : "No"}</p>
            <p><strong>Days in Milk:</strong> {animalData.lactation_status?.current_days_in_milk || animalData.lactation_status?.days_in_milk || 0}</p>
          </div>
        </div>

        {/* Financial Overview */}
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
      </div>

      {/* Production Modal */}
      {isProductionModalOpen && (
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
                onClick={() => setIsProductionModalOpen(false)}
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
      )}

      {/* Health Modal */}
      {isHealthModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {isEditingHealth ? "Edit Health Record" : "Add Health Record"}
            </h3>
            <div className="space-y-4">
              <input
                type="date"
                value={healthForm.date}
                onChange={(e) => setHealthForm({ ...healthForm, date: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="Date"
              />
              <input
                type="text"
                value={healthForm.type}
                onChange={(e) => setHealthForm({ ...healthForm, type: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="Type (e.g., Checkup)"
              />
              <input
                type="text"
                value={healthForm.details}
                onChange={(e) => setHealthForm({ ...healthForm, details: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="Details"
              />
              <input
                type="text"
                value={healthForm.clinical_signs}
                onChange={(e) => setHealthForm({ ...healthForm, clinical_signs: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="Clinical Signs"
              />
              <input
                type="text"
                value={healthForm.diagnosis}
                onChange={(e) => setHealthForm({ ...healthForm, diagnosis: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="Diagnosis"
              />
              <input
                type="text"
                value={healthForm.treatment}
                onChange={(e) => setHealthForm({ ...healthForm, treatment: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="Treatment"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={healthForm.is_sick}
                  onChange={(e) => setHealthForm({ ...healthForm, is_sick: e.target.checked })}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                />
                <span>Is Sick</span>
              </label>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                onClick={() => {
                  setIsHealthModalOpen(false);
                  setIsEditingHealth(false);
                  setEditingHealthRecordId(null);
                  setHealthForm({ date: "", type: "", details: "", is_sick: false, clinical_signs: "", diagnosis: "", treatment: "" });
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                onClick={isEditingHealth ? handleUpdateHealth : handleAddHealth}
              >
                {isEditingHealth ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reproduction Modal */}
      {isReproductionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Reproductive Event</h3>
            <div className="space-y-4">
              <input
                type="date"
                value={reproductionForm.date}
                onChange={(e) => setReproductionForm({ ...reproductionForm, date: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="Date"
              />
              <select
                value={reproductionForm.event}
                onChange={(e) => setReproductionForm({ ...reproductionForm, event: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              >
                <option value="AI">Artificial Insemination (AI)</option>
                <option value="Natural Breeding">Natural Breeding</option>
                <option value="Calving">Calving</option>
              </select>
              <input
                type="text"
                value={reproductionForm.details}
                onChange={(e) => setReproductionForm({ ...reproductionForm, details: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="Details"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setIsReproductionModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                onClick={handleAddReproduction}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}