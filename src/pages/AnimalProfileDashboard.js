import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, AreaChart, Area, ScatterChart, Scatter, LineChart, Line } from "recharts";
import { Sun, Moon, Download, ChevronLeft, ChevronRight, Info } from "lucide-react";
import animal1 from "../assets/Ayrshires-Cattle-kenya-cow.jpg";
import animal2 from "../assets/ayrshr01.jpeg";
import animal3 from "../assets/dairy1.jpeg";

export default function AnimalProfileDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animalData] = useState({
    name: "AG001-F1-G0-001/2024",
    breed: "Holstein",
    dob: "2024-01-15",
    gender: "Female",
    farmId: "AG001",
    owner: "John Doe",
    images: [
      { imageUrl: animal1 },
      { imageUrl: animal2 },
      { imageUrl: animal3 },
    ],
    healthRecords: [
      { date: "2024-12-15", type: "Vaccination", details: "Brucellosis" },
      { date: "2025-01-05", type: "Vet Visit", details: "Pre-calving check, all normal" },
      { date: "2025-01-15", type: "Calving", details: "Delivered healthy calf, no complications" },
      { date: "2025-02-01", type: "Vet Visit", details: "Postpartum check, SCC: 100k" },
      { date: "2025-02-10", type: "Vaccination", details: "Foot and Mouth" },
      { date: "2025-02-15", type: "Vet Visit", details: "Routine check-up, SCC: 150k" },
      { date: "2025-02-23", type: "Treatment", details: "Mild mastitis, antibiotics administered" },
    ],
    productionData: [
      { date: "2025-02-20", milkYield: 20, feedConsumption: 10, scc: 120, fatPercentage: 3.8, proteinPercentage: 3.2 },
      { date: "2025-02-21", milkYield: 22, feedConsumption: 12, scc: 130, fatPercentage: 3.7, proteinPercentage: 3.1 },
      { date: "2025-02-22", milkYield: 21, feedConsumption: 11, scc: 125, fatPercentage: 3.8, proteinPercentage: 3.2 },
      { date: "2025-02-23", milkYield: 19, feedConsumption: 10, scc: 140, fatPercentage: 3.6, proteinPercentage: 3.0 },
      { date: "2025-02-24", milkYield: 23, feedConsumption: 12, scc: 135, fatPercentage: 3.9, proteinPercentage: 3.3 },
      { date: "2025-02-25", milkYield: 20, feedConsumption: 11, scc: 130, fatPercentage: 3.7, proteinPercentage: 3.1 },
      { date: "2025-02-26", milkYield: 21, feedConsumption: 11, scc: 145, fatPercentage: 3.8, proteinPercentage: 3.2 },
    ],
    reproductiveHistory: [
      { date: "2024-12-10", event: "Heat Detected" },
      { date: "2024-12-15", event: "AI", details: "Semen ID: ABC789, successful" },
      { date: "2025-01-05", event: "Pregnancy Confirmed", details: "Ultrasound, 21 days post-AI" },
      { date: "2025-01-15", event: "Calving", details: "First calf born, lactation began" },
      { date: "2025-01-10", event: "Heat Detected" },
      { date: "2025-01-15", event: "AI", details: "Semen ID: XYZ123", expectedCalvingDate: "2025-10-21" },
      { date: "2025-02-05", event: "Pregnancy Check", details: "Confirmed pregnant, 21 days post-AI" },
    ],
    feedManagement: [
      { date: "2025-02-18", type: "Hay", quantity: "10kg" },
      { date: "2025-02-19", type: "Silage", quantity: "15kg" },
    ],
    behaviorNotes: "Slow to enter milking parlor, prefers left side",
    financialDetails: { feedCostPerMonth: 200, vetExpenses: 100, breedingCosts: 150, revenueFromMilk: 500 },
    lactationStatus: { lactationNumber: 1, daysInMilk: 40, isMilking: true },
    lifetimeStats: { totalMilk: 42, avgYield: 21, calves: 0 },
  });

  const productionChartData = animalData.productionData.map(record => ({
    name: record.date,
    Milk: record.milkYield,
    Feed: record.feedConsumption,
    SCC: record.scc,
    Fat: record.fatPercentage,
    Protein: record.proteinPercentage,
    FCR: (record.milkYield / record.feedConsumption).toFixed(2),
  }));

  const financialChartData = [
    { name: "Feed Costs", value: animalData.financialDetails.feedCostPerMonth },
    { name: "Vet Expenses", value: animalData.financialDetails.vetExpenses },
    { name: "Breeding Costs", value: animalData.financialDetails.breedingCosts },
    { name: "Milk Revenue", value: animalData.financialDetails.revenueFromMilk },
  ];

  const alerts = [];
  if (animalData.productionData.some(record => record.scc > 200)) alerts.push("High SCC Detected");
  if (new Date() - new Date(animalData.reproductiveHistory.slice(-1)[0].date) > 21 * 24 * 60 * 60 * 1000) {
    alerts.push("Due for Heat Check");
  }

  const COLORS = ["#FF8042", "#FFBB28", "#00C49F", "#0088FE"];
  const CHART_COLORS = { Milk: "#ffa500", Feed: "#00C49F", SCC: "#0088FE", Fat: "#FFBB28", Protein: "#FF8042", FCR: "#FF8042" };

  const handleExport = () => {
    alert("Exporting profile data... (Implement PDF/CSV generation here)");
  };

  const latestBreeding = animalData.reproductiveHistory.find(r => r.event === "AI" || r.event === "Natural Breeding");
  const isPregnant = latestBreeding && !animalData.reproductiveHistory.some(r => r.event === "Calving" && new Date(r.date) > new Date(latestBreeding.date));
  const expectedCalvingDate = latestBreeding?.expectedCalvingDate;
  const dryPeriodStart = expectedCalvingDate ? new Date(expectedCalvingDate) - (60 * 24 * 60 * 60 * 1000) : null;
  const today = new Date("2025-02-24");
  const isInDryPeriod = dryPeriodStart && today >= dryPeriodStart && today <= new Date(expectedCalvingDate);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % animalData.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + animalData.images.length) % animalData.images.length);
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <div className="fixed top-4 right-4 flex space-x-2">
        <button className="p-2 bg-gray-800 text-white rounded mb-4 hover:bg-gray-700 transition" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="p-2 bg-gray-800 text-white rounded mb-4 hover:bg-gray-700 transition" onClick={handleExport}>
          <Download size={20} />
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Image Gallery Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-80 relative col-span-1 md:col-span-2 lg:col-span-1 overflow-hidden">
          <div className="w-full h-full relative">
            <img
              src={animalData.images[currentImageIndex].imageUrl}
              alt={`Animal Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover rounded-lg transition-opacity duration-300"
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
            <p><strong>Name:</strong> {animalData.name}</p>
            <p><strong>Breed:</strong> {animalData.breed}</p>
            <p><strong>Date of Birth:</strong> {animalData.dob}</p>
            <p><strong>Gender:</strong> {animalData.gender}</p>
            <p><strong>Farm ID:</strong> {animalData.farmId}</p>
            <p><strong>Owner:</strong> {animalData.owner}</p>
            <p><strong>Lactation:</strong> {animalData.lactationStatus.lactationNumber} (DIM: {animalData.lactationStatus.daysInMilk})</p>
            <p><strong>Behavior Notes:</strong> {animalData.behaviorNotes}</p>
          </div>
        </div>

        {/* Daily Milk Production (Swapped from 6th to 3rd) */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-x-auto overflow-y-hidden">
          <h2 className="text-xl font-bold mb-4">Daily Milk Production</h2>
          <LineChart width={600} height={200} data={productionChartData}>
            <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#000"} />
            <YAxis stroke={darkMode ? "#fff" : "#000"} />
            <Tooltip contentStyle={{ backgroundColor: darkMode ? "#1F2937" : "#fff", color: darkMode ? "#fff" : "#000" }} />
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#4B5563" : "#E5E7EB"} />
            <Line type="monotone" dataKey="Milk" stroke={CHART_COLORS.Milk} strokeWidth={2} name="Milk Yield (L)" />
          </LineChart>
        </div>

        {/* Reproductive History */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            Reproductive History
            <span className="ml-2" title="AI: Artificial Insemination - method to breed the cow">
              <Info size={16} className="text-gray-500 dark:text-gray-400" />
            </span>
          </h2>
          <ul className="space-y-2 text-sm">
            {animalData.reproductiveHistory.map((record, index) => (
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

        {/* Health Records (Swapped from 3rd to 6th) */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            Health Records
            <span className="ml-2" title="SCC: Somatic Cell Count - measure of milk quality, higher indicates infection">
              <Info size={16} className="text-gray-500 dark:text-gray-400" />
            </span>
          </h2>
          <ul className="space-y-2 text-sm">
            {animalData.healthRecords.map((record, index) => (
              <li key={index} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                <strong>{record.date}:</strong> {record.type} - {record.details}
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
            <p><strong>Total Milk:</strong> {animalData.lifetimeStats.totalMilk} L</p>
            <p><strong>Avg Yield:</strong> {animalData.lifetimeStats.avgYield} L/day</p>
            <p><strong>Calves:</strong> {animalData.lifetimeStats.calves}</p>
          </div>
        </div>

        {/* Gestation Tracking */}
        <div className="bg-white shadow-lg rounded-xl p-6 h-80 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Gestation Tracking</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Pregnancy Status:</strong> {isPregnant ? "Pregnant" : "Not Pregnant"}</p>
            {isPregnant && (
              <>
                <p><strong>Breeding Date:</strong> {latestBreeding.date}</p>
                <p><strong>Expected Calving:</strong> {expectedCalvingDate}</p>
                <p><strong>Dry Period Start:</strong> {dryPeriodStart ? new Date(dryPeriodStart).toISOString().split('T')[0] : "N/A"}</p>
              </>
            )}
            <p><strong>Currently Milking:</strong> {animalData.lactationStatus.isMilking && !isInDryPeriod ? "Yes" : "No"}</p>
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
    </div>
  );
}