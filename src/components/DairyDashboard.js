// src/components/DairyDashboard.js
import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MilkProductionChart from "./MilkProductionChart";
import FeedManagement from "./FeedManagement";
import { fetchAnimals, createAnimal } from "../services/api";
import { GiCow, GiBabyBottle, GiMedicalPack, GiFemale, GiHeartBeats, GiMilkCarton, GiGrass, GiBull } from "react-icons/gi";
import { AiOutlinePlus } from "react-icons/ai";

const calculateAgeInMonths = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date("2025-03-14");
  const diffMs = today - birthDate;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
};

const DashboardCard = ({ title, children, onClick }) => {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 1.5,
        borderRadius: "12px",
        bgcolor: "#fff",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-2px)",
          cursor: "pointer",
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          color: "#1a3c34",
          mb: 1,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Paper>
  );
};

const DairyDashboard = ({ farmId }) => {
  const [livestockData, setLivestockData] = useState({
    totalCows: 0,
    bulls: 0,
    heifers: 0,
    calves: 0,
    newborns: 0,
    pregnant: 0,
    dry: 0,
    milking: 0,
    sickCows: 0,
  });
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "Female",
    dob: "",
    category: "Calf",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadLivestockData = async () => {
      try {
        const animals = await fetchAnimals({ farmId });
        const counts = {
          totalCows: animals.length,
          bulls: 0,
          heifers: 0,
          calves: 0,
          newborns: 0,
          pregnant: 0,
          dry: 0,
          milking: 0,
          sickCows: 0,
        };

        animals.forEach((animal) => {
          const ageInMonths = calculateAgeInMonths(animal.dob);
          if (animal.gender === "Male") {
            counts.bulls += 1;
          } else {
            if (ageInMonths < 1) counts.newborns += 1;
            else if (animal.category === "Calf") counts.calves += 1;
            else if (animal.category === "Heifer") counts.heifers += 1;
            else if (animal.category === "Milking") counts.milking += 1;
            else if (animal.category === "Dry") counts.dry += 1;
          }
          if (animal.is_pregnant) counts.pregnant += 1;
          if (animal.health_records && animal.health_records.some(record => record.is_sick)) {
            counts.sickCows += 1;
          }
        });

        setLivestockData(counts);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load livestock data:", error);
        setLoading(false);
      }
    };

    loadLivestockData();
  }, [farmId]);

  const handleCategoryClick = (filter) => {
    navigate(`/animal_list?${filter}&farmId=${farmId}`);
  };

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => {
    setOpenModal(false);
    setFormData({ name: "", gender: "Female", dob: "", category: "Calf" });
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddAnimal = async () => {
    try {
      const animalData = { ...formData, farmId };
      await createAnimal(animalData);
      handleModalClose();
      const animals = await fetchAnimals({ farmId });
      const counts = {
        totalCows: animals.length,
        bulls: animals.filter(a => a.gender === "Male").length,
        heifers: animals.filter(a => a.category === "Heifer").length,
        calves: animals.filter(a => a.category === "Calf").length,
        newborns: animals.filter(a => calculateAgeInMonths(a.dob) < 1).length,
        pregnant: animals.filter(a => a.is_pregnant).length,
        dry: animals.filter(a => a.category === "Dry").length,
        milking: animals.filter(a => a.category === "Milking").length,
        sickCows: animals.filter(a => a.health_records?.some(r => r.is_sick)).length,
      };
      setLivestockData(counts);
    } catch (error) {
      console.error("Failed to add animal:", error);
    }
  };

  // Debugging: Log imported components
  console.log({
    MilkProductionChart,
    FeedManagement,
    DashboardCard: typeof DashboardCard,
  });

  return (
    <Box>
      {/* Livestock Summary */}
      <Typography variant="h6" sx={{ fontWeight: 600, color:  "#1a3c34", mb: 2 }}>
        Livestock Summary
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard 
            title={<><GiCow color="#ffa500" size={18} /> Total Cows</>}
            onClick={() => handleCategoryClick("")}
          >
            <Typography variant="h6">{livestockData.totalCows}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard 
            title={<><GiBull color="#ffa500" size={18} /> Bulls</>}
            onClick={() => handleCategoryClick("category=Bull")}
          >
            <Typography variant="h6">{livestockData.bulls}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard 
            title={<><GiFemale color="#ffa500" size={18} /> Heifers</>}
            onClick={() => handleCategoryClick("category=Heifer")}
          >
            <Typography variant="h6">{livestockData.heifers}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard 
            title={<><GiBabyBottle color="#ffa500" size={18} /> Calves</>}
            onClick={() => handleCategoryClick("category=Calf")}
          >
            <Typography variant="h6">{livestockData.calves}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard 
            title={<><GiBabyBottle color="#ffa500" size={18} /> Newborns</>}
            onClick={() => handleCategoryClick("age=Newborn")}
          >
            <Typography variant="h6">{livestockData.newborns}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard 
            title={<><GiHeartBeats color="#ffa500" size={18} /> Pregnant</>}
            onClick={() => handleCategoryClick("is_pregnant=true")}
          >
            <Typography variant="h6">{livestockData.pregnant}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard 
            title={<><GiGrass color="#ffa500" size={18} /> Dry</>}
            onClick={() => handleCategoryClick("category=Dry")}
          >
            <Typography variant="h6">{livestockData.dry}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard 
            title={<><GiMilkCarton color="#ffa500" size={18} /> Milking</>}
            onClick={() => handleCategoryClick("category=Milking")}
          >
            <Typography variant="h6">{livestockData.milking}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard 
            title={<><GiMedicalPack color="red" size={18} /> Sick Cows</>}
            onClick={() => handleCategoryClick("is_sick=true")}
          >
            <Typography variant="h6" sx={{ color: "red" }}>{livestockData.sickCows}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard 
            title={<><AiOutlinePlus color="#ffa500" size={18} /> Add Animal</>}
            onClick={handleModalOpen}
          >
            <Typography variant="h6" sx={{ color: "#ffa500" }}>+</Typography>
          </DashboardCard>
        </Grid>
      </Grid>

      {/* Add Animal Modal */}
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>Add New Animal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Animal Name"
            fullWidth
            value={formData.name}
            onChange={handleFormChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              name="gender"
              value={formData.gender}
              onChange={handleFormChange}
              label="Gender"
            >
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="dob"
            label="Date of Birth"
            type="date"
            fullWidth
            value={formData.dob}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={formData.category}
              onChange={handleFormChange}
              label="Category"
            >
              <MenuItem value="Calf">Calf</MenuItem>
              <MenuItem value="Heifer">Heifer</MenuItem>
              <MenuItem value="Milking">Milking</MenuItem>
              <MenuItem value="Dry">Dry</MenuItem>
              <MenuItem value="Bull">Bull</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleAddAnimal} variant="contained" color="primary">
            Add Animal
          </Button>
        </DialogActions>
      </Dialog>

      {/* Retained Components: MilkProductionChart and FeedManagement */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <DashboardCard title="📈 Milk Production">
            {MilkProductionChart ? <MilkProductionChart farmId={farmId} /> : <Typography>MilkProductionChart not found</Typography>}
          </DashboardCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <DashboardCard title="🌾 Feed Management">
            {FeedManagement ? <FeedManagement farmId={farmId} /> : <Typography>FeedManagement not found</Typography>}
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DairyDashboard;