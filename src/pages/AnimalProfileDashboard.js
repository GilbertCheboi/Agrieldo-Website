import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Sun, Moon, Download } from "lucide-react";
import { fetchAnimalDetails, updateHealthRecord, addProductionData, addHealthRecord, addReproductiveHistory } from "../services/api";

// Import components
import ImageGallery from "./ImageGallery";
import ProfileCard from "./ProfileCard";
import ProductionChart from "./ProductionChart";
import ReproductiveHistory from "./ReproductiveHistory";
import Alerts from "./Alerts";
import HealthRecords from "./HealthRecords";
import ProductionVsFeedChart from "./ProductionVsFeedChart";
import MilkQualityChart from "./MilkQualityChart";
import FeedEfficiencyChart from "./FeedEfficiencyChart";
import LifetimePerformance from "./LifetimePerformance";
import GestationTracking from "./GestationTracking";
import FinancialOverview from "./FinancialOverview";
import ProductionModal from "./ProductionModal";
import HealthModal from "./HealthModal";
import ReproductionModal from "./ReproductionModal";

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

  // Form states with cost
  const [productionForm, setProductionForm] = useState({ 
    date: "", 
    session: "MORNING", 
    milk_yield: "", 
    scc: "", 
    feed_consumption: "", 
    fat_percentage: "", 
    protein_percentage: "" 
  });
  const [healthForm, setHealthForm] = useState({ 
    date: "", 
    type: "", 
    details: "", 
    is_sick: false, 
    clinical_signs: "", 
    diagnosis: "", 
    treatment: "", 
    cost: "" 
  });
  const [reproductionForm, setReproductionForm] = useState({ 
    date: "", 
    event: "AI", 
    details: "", 
    cost: "" 
  });

  useEffect(() => {
    const loadAnimalData = async () => {
      try {
        setLoading(true);
        const data = await fetchAnimalDetails(animalIdInt);
        console.log("Fetched Animal Data:", data);
        console.log("Financial Details:", data.financial_details);

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
        session: productionForm.session,
        milk_yield: parseFloat(productionForm.milk_yield) || 0,
        scc: parseInt(productionForm.scc, 10) || 0,
        feed_consumption: parseFloat(productionForm.feed_consumption) || 0,
        fat_percentage: parseFloat(productionForm.fat_percentage) || 0,
        protein_percentage: parseFloat(productionForm.protein_percentage) || 0
      };
      await addProductionData(animalIdInt, newRecord);
      setReloadTrigger(prev => prev + 1);
      setIsProductionModalOpen(false);
      setProductionForm({ 
        date: "", 
        session: "MORNING", 
        milk_yield: "", 
        scc: "", 
        feed_consumption: "", 
        fat_percentage: "", 
        protein_percentage: "" 
      });
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
        treatment: healthForm.treatment || "",
        cost: parseFloat(healthForm.cost) || 0
      };
      await addHealthRecord(animalIdInt, newRecord);
      setReloadTrigger(prev => prev + 1);
      setIsHealthModalOpen(false);
      setHealthForm({ date: "", type: "", details: "", is_sick: false, clinical_signs: "", diagnosis: "", treatment: "", cost: "" });
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
        treatment: healthForm.treatment || "",
        cost: parseFloat(healthForm.cost) || 0
      };
      await updateHealthRecord(editingHealthRecordId, updatedRecord);
      setReloadTrigger(prev => prev + 1);
      setIsHealthModalOpen(false);
      setIsEditingHealth(false);
      setEditingHealthRecordId(null);
      setHealthForm({ date: "", type: "", details: "", is_sick: false, clinical_signs: "", diagnosis: "", treatment: "", cost: "" });
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
      treatment: record.treatment || "",
      cost: record.cost || ""
    });
    setEditingHealthRecordId(record.id);
    setIsEditingHealth(true);
    setIsHealthModalOpen(true);
  };

  const handleAddReproduction = async () => {
    try {
      const newRecord = {
        date: reproductionForm.date || new Date().toISOString().split('T')[0],
        event: reproductionForm.event,
        details: reproductionForm.details || "",
        cost: parseFloat(reproductionForm.cost) || 0
      };
      await addReproductiveHistory(animalIdInt, newRecord);
      setReloadTrigger(prev => prev + 1);
      setIsReproductionModalOpen(false);
      setReproductionForm({ date: "", event: "AI", details: "", cost: "" });
    } catch (err) {
      setError("Failed to add reproductive record: " + (err.message || "Permission denied"));
    }
  };

  const handleExport = () => {
    alert("Exporting profile data... (Implement PDF/CSV generation here)");
  };

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-300 dark:border-gray-700 rounded shadow-lg text-black dark:text-white">
          <p className="font-bold">{`Date: ${formatXAxis(label)}`}</p>
          <p>{`Total Milk: ${data.Milk.toFixed(1)} L`}</p>
          <hr className="my-1 border-gray-300 dark:border-gray-600" />
          <p className="font-semibold">Sessions:</p>
          {data.sessions.map((session, index) => (
            <div key={index} className="text-sm">
              <p>{`${session.session}: ${session.milk_yield.toFixed(1)} L`}</p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;
  if (!animalData) return <div className="text-center p-6">No data available</div>;

  const productionChartData = Object.values(
    animalData.production_data.reduce((acc, record) => {
      const date = record.date;
      if (!acc[date]) {
        acc[date] = {
          name: date,
          Milk: 0,
          Feed: 0,
          SCC: 0,
          Fat: 0,
          Protein: 0,
          sessions: [],
        };
      }
      acc[date].Milk += record.milk_yield;
      acc[date].Feed += record.feed_consumption;
      acc[date].SCC += record.scc;
      acc[date].Fat += record.fat_percentage;
      acc[date].Protein += record.protein_percentage;
      acc[date].sessions.push({
        session: record.session,
        milk_yield: record.milk_yield,
        feed_consumption: record.feed_consumption,
        scc: record.scc,
        fat_percentage: record.fat_percentage,
        protein_percentage: record.protein_percentage,
      });
      return acc;
    }, {})
  ).map(day => ({
    ...day,
    Fat: day.sessions.length ? day.Fat / day.sessions.length : 0,
    Protein: day.sessions.length ? day.Protein / day.sessions.length : 0,
    FCR: day.Feed ? (day.Milk / day.Feed).toFixed(2) : 0,
  })).sort((a, b) => new Date(a.name) - new Date(b.name));

  const financialChartData = [
    { name: "Feed Costs", value: parseFloat(animalData.financial_details?.total_feed_cost || 0) },
    { name: "Vet Expenses", value: parseFloat(animalData.financial_details?.total_vet_cost || 0) },
    { name: "Breeding Costs", value: parseFloat(animalData.financial_details?.total_breeding_cost || 0) },
    { name: "Milk Revenue", value: parseFloat(animalData.financial_details?.total_revenue_from_milk || 0) },
  ];

  const totalCost = parseFloat(animalData.financial_details?.total_cost || 0);

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
        <ImageGallery images={animalData.images} currentImageIndex={currentImageIndex} setCurrentImageIndex={setCurrentImageIndex} darkMode={darkMode} />
        <ProfileCard animalData={animalData} darkMode={darkMode} />
        <ProductionChart 
          productionChartData={productionChartData} 
          darkMode={darkMode} 
          userType={userType} 
          setIsProductionModalOpen={setIsProductionModalOpen} 
          formatXAxis={formatXAxis} 
          CustomTooltip={CustomTooltip} 
        />
        <ReproductiveHistory reproductiveHistory={animalData.reproductive_history} darkMode={darkMode} userType={userType} setIsReproductionModalOpen={setIsReproductionModalOpen} />
        <Alerts alerts={alerts} darkMode={darkMode} />
        <HealthRecords 
          healthRecords={animalData.health_records} 
          darkMode={darkMode} 
          userType={userType} 
          setIsHealthModalOpen={setIsHealthModalOpen} 
          setIsEditingHealth={setIsEditingHealth} 
          setHealthForm={setHealthForm} 
          setEditingHealthRecordId={setEditingHealthRecordId} 
          handleEditHealth={handleEditHealth} 
        />
        <ProductionVsFeedChart productionChartData={productionChartData} darkMode={darkMode} formatXAxis={formatXAxis} />
        <MilkQualityChart productionChartData={productionChartData} darkMode={darkMode} formatXAxis={formatXAxis} />
        <FeedEfficiencyChart productionChartData={productionChartData} darkMode={darkMode} formatXAxis={formatXAxis} />
        <LifetimePerformance lifetimeStats={animalData.lifetime_stats} darkMode={darkMode} />
        <GestationTracking animalData={animalData} darkMode={darkMode} />
        <FinancialOverview financialChartData={financialChartData} totalCost={totalCost} darkMode={darkMode} />
      </div>

      <ProductionModal 
        isOpen={isProductionModalOpen} 
        setIsOpen={setIsProductionModalOpen} 
        productionForm={productionForm} 
        setProductionForm={setProductionForm} 
        handleAddProduction={handleAddProduction} 
      />
      <HealthModal 
        isOpen={isHealthModalOpen} 
        setIsOpen={setIsHealthModalOpen} 
        healthForm={healthForm} 
        setHealthForm={setHealthForm} 
        handleAddHealth={handleAddHealth} 
        handleUpdateHealth={handleUpdateHealth} 
        isEditingHealth={isEditingHealth} 
        setIsEditingHealth={setIsEditingHealth} 
        setEditingHealthRecordId={setEditingHealthRecordId} 
      />
      <ReproductionModal 
        isOpen={isReproductionModalOpen} 
        setIsOpen={setIsReproductionModalOpen} 
        reproductionForm={reproductionForm} 
        setReproductionForm={setReproductionForm} 
        handleAddReproduction={handleAddReproduction} 
      />
    </div>
  );
}