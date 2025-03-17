// src/components/SheepDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sun, Moon, Download, ChevronLeft, ChevronRight, Plus, Pen } from "lucide-react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Fab,
} from "@mui/material";
import Slider from "../components/ Sidebar";
import { fetchSheepData, addHealthRecord, addReproductionRecord, addProductionRecord, updateHealthRecord } from "../services/api";

const SheepDetails = () => {
  const { farmId, sheepId } = useParams();
  const navigate = useNavigate();
  const [sheep, setSheep] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const userType = parseInt(localStorage.getItem("user_type"), 10); // 1 = Farmer, 2 = Vet, 3 = Staff

  // Modal states
  const [isProductionModalOpen, setIsProductionModalOpen] = useState(false);
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
  const [isReproductionModalOpen, setIsReproductionModalOpen] = useState(false);
  const [isEditingHealth, setIsEditingHealth] = useState(false);
  const [editingHealthRecordId, setEditingHealthRecordId] = useState(null);

  // Form states
  const [productionForm, setProductionForm] = useState({ date: "", wool_yield: "", weight: "", shearing_date: "" });
  const [healthForm, setHealthForm] = useState({ date: "", is_sick: false, diagnosis: "", treatment: "" });
  const [reproductionForm, setReproductionForm] = useState({ mating_date: "", partner_tag: "", birth_date: "", offspring_count: "" });

  useEffect(() => {
    const loadSheepDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchSheepData({ farmId });
        const selectedSheep = data.find((s) => s.id === parseInt(sheepId));
        setSheep(selectedSheep);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load sheep details:", error);
        setLoading(false);
      }
    };
    loadSheepDetails();
  }, [farmId, sheepId, reloadTrigger]);

  const handleAddProduction = async () => {
    try {
      const newRecord = {
        sheep: parseInt(sheepId),
        date: productionForm.date || new Date().toISOString().split("T")[0],
        wool_yield: parseFloat(productionForm.wool_yield) || 0,
        weight: parseFloat(productionForm.weight) || 0,
        shearing_date: productionForm.shearing_date || null,
      };
      await addProductionRecord(newRecord);
      setReloadTrigger((prev) => prev + 1);
      setIsProductionModalOpen(false);
      setProductionForm({ date: "", wool_yield: "", weight: "", shearing_date: "" });
    } catch (error) {
      console.error("Failed to add production record:", error);
    }
  };

  const handleAddHealth = async () => {
    try {
      const newRecord = {
        sheep: parseInt(sheepId),
        date: healthForm.date || new Date().toISOString().split("T")[0],
        is_sick: healthForm.is_sick,
        diagnosis: healthForm.diagnosis || "",
        treatment: healthForm.treatment || "",
      };
      await addHealthRecord(newRecord);
      setReloadTrigger((prev) => prev + 1);
      setIsHealthModalOpen(false);
      setHealthForm({ date: "", is_sick: false, diagnosis: "", treatment: "" });
    } catch (error) {
      console.error("Failed to add health record:", error);
    }
  };

  const handleUpdateHealth = async () => {
    try {
      const updatedRecord = {
        date: healthForm.date || new Date().toISOString().split("T")[0],
        is_sick: healthForm.is_sick,
        diagnosis: healthForm.diagnosis || "",
        treatment: healthForm.treatment || "",
      };
      await updateHealthRecord(editingHealthRecordId, updatedRecord);
      setReloadTrigger((prev) => prev + 1);
      setIsHealthModalOpen(false);
      setIsEditingHealth(false);
      setEditingHealthRecordId(null);
      setHealthForm({ date: "", is_sick: false, diagnosis: "", treatment: "" });
    } catch (error) {
      console.error("Failed to update health record:", error);
    }
  };

  const handleEditHealth = (record) => {
    setHealthForm({
      date: record.date,
      is_sick: record.is_sick,
      diagnosis: record.diagnosis || "",
      treatment: record.treatment || "",
    });
    setEditingHealthRecordId(record.id);
    setIsEditingHealth(true);
    setIsHealthModalOpen(true);
  };

  const handleAddReproduction = async () => {
    try {
      const newRecord = {
        sheep: parseInt(sheepId),
        mating_date: reproductionForm.mating_date || new Date().toISOString().split("T")[0],
        partner_tag: reproductionForm.partner_tag || "",
        birth_date: reproductionForm.birth_date || null,
        offspring_count: parseInt(reproductionForm.offspring_count) || 0,
      };
      await addReproductionRecord(newRecord);
      setReloadTrigger((prev) => prev + 1);
      setIsReproductionModalOpen(false);
      setReproductionForm({ mating_date: "", partner_tag: "", birth_date: "", offspring_count: "" });
    } catch (error) {
      console.error("Failed to add reproduction record:", error);
    }
  };

  const handleExport = () => {
    alert("Exporting sheep data... (Implement PDF/CSV generation here)");
  };

  const handleNextImage = () => setCurrentImageIndex((prev) => (prev + 1) % (sheep?.images.length || 1));
  const handlePrevImage = () => setCurrentImageIndex((prev) => (prev - 1 + (sheep?.images.length || 1)) % (sheep?.images.length || 1));

  if (loading) return <Typography className="text-center p-6">Loading...</Typography>;
  if (!sheep) return <Typography className="text-center p-6">Sheep not found.</Typography>;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: darkMode ? "gray.900" : "gray.50" }}>
      {/* Sidebar/Navbar */}
      <Slider />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 4, md: 6 },
          color: darkMode ? "white" : "black",
          position: "relative",
        }}
      >
        {/* Top Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 4,
            justifyContent: "flex-end",
            zIndex: 10,
          }}
        >
          <Button
            variant="contained"
            sx={{ bgcolor: darkMode ? "gray.800" : "gray.700", "&:hover": { bgcolor: darkMode ? "gray.700" : "gray.600" } }}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: darkMode ? "gray.800" : "gray.700", "&:hover": { bgcolor: darkMode ? "gray.700" : "gray.600" } }}
            onClick={handleExport}
          >
            <Download size={20} />
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate(`/sheep-list/${farmId}`)}>
            Back to Sheep List
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Image Gallery Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                bgcolor: darkMode ? "gray.800" : "white",
                borderRadius: 2,
                overflow: "hidden",
                height: 300,
              }}
            >
              <Box sx={{ position: "relative", height: "100%" }}>
                <img
                  src={
                    sheep.images && sheep.images.length > 0
                      ? `https://api.agrieldo.com${sheep.images[currentImageIndex].image}`
                      : "https://via.placeholder.com/128"
                  }
                  alt={`Sheep Image ${currentImageIndex + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <Button
                  onClick={handlePrevImage}
                  sx={{
                    position: "absolute",
                    left: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "gray.800",
                    color: "white",
                    "&:hover": { bgcolor: "gray.700" },
                    minWidth: 0,
                    p: 1,
                  }}
                >
                  <ChevronLeft size={20} />
                </Button>
                <Button
                  onClick={handleNextImage}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "gray.800",
                    color: "white",
                    "&:hover": { bgcolor: "gray.700" },
                    minWidth: 0,
                    p: 1,
                  }}
                >
                  <ChevronRight size={20} />
                </Button>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 1,
                  }}
                >
                  {sheep.images.map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: index === currentImageIndex ? "gray.800" : "gray.400",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Sheep Profile Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                bgcolor: darkMode ? "gray.800" : "white",
                borderRadius: 2,
                p: 3,
                height: 300,
                overflowY: "auto",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  Sheep Profile
                </Typography>
                <Box sx={{ "& > p": { mb: 1 } }}>
                  <Typography variant="h6">{sheep.tag_number}</Typography>
                  <Typography>Date of Birth: {sheep.dob}</Typography>
                  <Typography>Type: {sheep.sheep_type ? sheep.sheep_type.name : "None"}</Typography>
                  <Typography>Farm ID: {farmId}</Typography>
                  <Typography>
                    Total Wool Yield: {sheep.production_records.reduce((sum, p) => sum + p.wool_yield, 0)} kg
                  </Typography>
                  <Typography>
                    Total Weight: {sheep.production_records.reduce((sum, p) => sum + p.weight, 0)} kg
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Production Records */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                bgcolor: darkMode ? "gray.800" : "white",
                borderRadius: 2,
                p: 3,
                height: 300,
                overflowY: "auto",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  Production Records
                </Typography>
                <List dense>
                  {sheep.production_records.map((record) => (
                    <ListItem key={record.id}>
                      <ListItemText
                        primary={`Date: ${record.date}`}
                        secondary={`Wool: ${record.wool_yield} kg, Weight: ${record.weight} kg`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Health Records */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                boxShadow: 3,
                bgcolor: darkMode ? "gray.800" : "white",
                borderRadius: 2,
                p: 3,
                height: 300,
                overflowY: "auto",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  Health Records
                </Typography>
                <List dense>
                  {sheep.health_records.map((record) => (
                    <ListItem
                      key={record.id}
                      secondaryAction={
                        (userType === 1 || userType === 2) && (
                          <Button
                            onClick={() => handleEditHealth(record)}
                            sx={{
                              bgcolor: "blue.500",
                              color: "white",
                              borderRadius: "50%",
                              minWidth: 0,
                              p: 1,
                              "&:hover": { bgcolor: "blue.600" },
                            }}
                          >
                            <Pen size={16} />
                          </Button>
                        )
                      }
                    >
                      <ListItemText
                        primary={`Date: ${record.date}`}
                        secondary={`Sick: ${record.is_sick ? "Yes" : "No"}, Diagnosis: ${record.diagnosis || "None"}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Reproduction Records */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                boxShadow: 3,
                bgcolor: darkMode ? "gray.800" : "white",
                borderRadius: 2,
                p: 3,
                height: 300,
                overflowY: "auto",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  Reproduction Records
                </Typography>
                <List dense>
                  {sheep.reproduction_records.map((record) => (
                    <ListItem key={record.id}>
                      <ListItemText
                        primary={`Mating Date: ${record.mating_date}`}
                        secondary={`Birth: ${record.birth_date || "N/A"}, Offspring: ${record.offspring_count}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* FAB Buttons */}
        {(userType === 1 || userType === 3) && (
          <Fab
            color="primary"
            onClick={() => setIsProductionModalOpen(true)}
            sx={{ position: "fixed", bottom: 80, right: 16 }}
          >
            <Plus size={24} />
          </Fab>
        )}
        {(userType === 1 || userType === 2) && (
          <Fab
            color="primary"
            onClick={() => {
              setIsEditingHealth(false);
              setHealthForm({ date: "", is_sick: false, diagnosis: "", treatment: "" });
              setIsHealthModalOpen(true);
            }}
            sx={{ position: "fixed", bottom: 140, right: 16 }}
          >
            <Plus size={24} />
          </Fab>
        )}
        {(userType === 1 || userType === 2) && (
          <Fab
            color="primary"
            onClick={() => setIsReproductionModalOpen(true)}
            sx={{ position: "fixed", bottom: 200, right: 16 }}
          >
            <Plus size={24} />
          </Fab>
        )}

        {/* Production Modal */}
        {isProductionModalOpen && (
          <Box
            sx={{
              position: "fixed",
              inset: 0,
              bgcolor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
            }}
          >
            <Card sx={{ p: 4, maxWidth: 400, width: "100%", borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                Add Production Record
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <input
                  type="date"
                  value={productionForm.date}
                  onChange={(e) => setProductionForm({ ...productionForm, date: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg text-black"
                />
                <input
                  type="number"
                  value={productionForm.wool_yield}
                  onChange={(e) => setProductionForm({ ...productionForm, wool_yield: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg text-black"
                  placeholder="Wool Yield (kg)"
                  step="0.1"
                />
                <input
                  type="number"
                  value={productionForm.weight}
                  onChange={(e) => setProductionForm({ ...productionForm, weight: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg text-black"
                  placeholder="Weight (kg)"
                  step="0.1"
                />
                <input
                  type="date"
                  value={productionForm.shearing_date}
                  onChange={(e) => setProductionForm({ ...productionForm, shearing_date: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg text-black"
                  placeholder="Shearing Date"
                />
              </Box>
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button onClick={() => setIsProductionModalOpen(false)}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleAddProduction}>
                  Save
                </Button>
              </Box>
            </Card>
          </Box>
        )}

        {/* Health Modal */}
        {isHealthModalOpen && (
          <Box
            sx={{
              position: "fixed",
              inset: 0,
              bgcolor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
            }}
          >
            <Card sx={{ p: 4, maxWidth: 400, width: "100%", borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                {isEditingHealth ? "Edit Health Record" : "Add Health Record"}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <input
                  type="date"
                  value={healthForm.date}
                  onChange={(e) => setHealthForm({ ...healthForm, date: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg text-black"
                />
                <input
                  type="text"
                  value={healthForm.diagnosis}
                  onChange={(e) => setHealthForm({ ...healthForm, diagnosis: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg text-black"
                  placeholder="Diagnosis"
                />
                <input
                  type="text"
                  value={healthForm.treatment}
                  onChange={(e) => setHealthForm({ ...healthForm, treatment: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg text-black"
                  placeholder="Treatment"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={healthForm.is_sick}
                    onChange={(e) => setHealthForm({ ...healthForm, is_sick: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Typography>Is Sick</Typography>
                </label>
              </Box>
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                  onClick={() => {
                    setIsHealthModalOpen(false);
                    setIsEditingHealth(false);
                    setEditingHealthRecordId(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={isEditingHealth ? handleUpdateHealth : handleAddHealth}
                >
                  {isEditingHealth ? "Update" : "Save"}
                </Button>
              </Box>
            </Card>
          </Box>
        )}

        {/* Reproduction Modal */}
        {isReproductionModalOpen && (
          <Box
            sx={{
              position: "fixed",
              inset: 0,
              bgcolor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
            }}
          >
            <Card sx={{ p: 4, maxWidth: 400, width: "100%", borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                Add Reproduction Record
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <input
                  type="date"
                  value={reproductionForm.mating_date}
                  onChange={(e) => setReproductionForm({ ...reproductionForm, mating_date: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg text-black"
                  placeholder="Mating Date"
                />
                <input
                  type="text"
                  value={reproductionForm.partner_tag}
                  onChange={(e) => setReproductionForm({ ...reproductionForm, partner_tag: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg text-black"
                  placeholder="Partner Tag"
                />
                <input
                  type="date"
                  value={reproductionForm.birth_date}
                  onChange={(e) => setReproductionForm({ ...reproductionForm, birth_date: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg text-black"
                  placeholder="Birth Date"
                />
                <input
                  type="number"
                  value={reproductionForm.offspring_count}
                  onChange={(e) => setReproductionForm({ ...reproductionForm, offspring_count: e.target.value })}
                  className="p-2 border border-gray-300 rounded-lg text-black"
                  placeholder="Offspring Count"
                />
              </Box>
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button onClick={() => setIsReproductionModalOpen(false)}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleAddReproduction}>
                  Save
                </Button>
              </Box>
            </Card>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SheepDetails;