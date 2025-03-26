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
  const today = new Date(); // Dynamic date instead of "2025-03-14"
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
    weanerStage1: 0,
    weanerStage2: 0,
    yearlings: 0,
    bulling: 0,
    inCalf: 0,
    steaming: 0,
    earlyLactating: 0,
    midLactating: 0,
    lateLactating: 0,
    dry: 0,
    sickCows: 0,
  });
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "Female",
    dob: "",
    category: "Calf (0-3 months)", // Updated default
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
          weanerStage1: 0,
          weanerStage2: 0,
          yearlings: 0,
          bulling: 0,
          inCalf: 0,
          steaming: 0,
          earlyLactating: 0,
          midLactating: 0,
          lateLactating: 0,
          dry: 0,
          sickCows: 0,
        };

        animals.forEach((animal) => {
          switch (animal.category) {
            case "Bull":
              counts.bulls += 1;
              break;
            case "Heifer":
              counts.heifers += 1;
              break;
            case "Calf (0-3 months)":
              counts.calves += 1;
              break;
            case "Weaner Stage 1 (3-6 months)":
              counts.weanerStage1 += 1;
              break;
            case "Weaner Stage 2 (6-9 months)":
              counts.weanerStage2 += 1;
              break;
            case "Yearling (9-12 months)":
              counts.yearlings += 1;
              break;
            case "Bulling (12-15 months)":
              counts.bulling += 1;
              break;
            case "In-Calf":
              counts.inCalf += 1;
              break;
            case "Steaming":
              counts.steaming += 1;
              break;
            case "Early Lactating":
              counts.earlyLactating += 1;
              break;
            case "Mid Lactating":
              counts.midLactating += 1;
              break;
            case "Late Lactating":
              counts.lateLactating += 1;
              break;
            case "Dry":
              counts.dry += 1;
              break;
            default:
              break;
          }
          if (animal.is_sick) counts.sickCows += 1;
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
    setFormData({ name: "", gender: "Female", dob: "", category: "Calf (0-3 months)" });
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddAnimal = async () => {
    try {
      const animalData = { ...formData, farm: farmId }; // Changed farmId to farm for API consistency
      await createAnimal(animalData);
      handleModalClose();
      const animals = await fetchAnimals({ farmId });
      const counts = {
        totalCows: animals.length,
        bulls: animals.filter(a => a.category === "Bull").length,
        heifers: animals.filter(a => a.category === "Heifer").length,
        calves: animals.filter(a => a.category === "Calf (0-3 months)").length,
        weanerStage1: animals.filter(a => a.category === "Weaner Stage 1 (3-6 months)").length,
        weanerStage2: animals.filter(a => a.category === "Weaner Stage 2 (6-9 months)").length,
        yearlings: animals.filter(a => a.category === "Yearling (9-12 months)").length,
        bulling: animals.filter(a => a.category === "Bulling (12-15 months)").length,
        inCalf: animals.filter(a => a.category === "In-Calf").length,
        steaming: animals.filter(a => a.category === "Steaming").length,
        earlyLactating: animals.filter(a => a.category === "Early Lactating").length,
        midLactating: animals.filter(a => a.category === "Mid Lactating").length,
        lateLactating: animals.filter(a => a.category === "Late Lactating").length,
        dry: animals.filter(a => a.category === "Dry").length,
        sickCows: animals.filter(a => a.is_sick).length,
      };
      setLivestockData(counts);
    } catch (error) {
      console.error("Failed to add animal:", error);
    }
  };

  return (
    <Box>
      {/* Livestock Summary */}
      <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a3c34", mb: 2 }}>
        Livestock Summary
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={<><GiCow color="#ffa500" size={18} /> Total Animals</>}
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
            title={<><GiBabyBottle color="#ffa500" size={18} /> Calves (0-3)</>}
            onClick={() => handleCategoryClick("category=Calf (0-3 months)")}
          >
            <Typography variant="h6">{livestockData.calves}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={<><GiBabyBottle color="#ffa500" size={18} /> Weaner 1 (3-6)</>}
            onClick={() => handleCategoryClick("category=Weaner Stage 1 (3-6 months)")}
          >
            <Typography variant="h6">{livestockData.weanerStage1}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={<><GiBabyBottle color="#ffa500" size={18} /> Weaner 2 (6-9)</>}
            onClick={() => handleCategoryClick("category=Weaner Stage 2 (6-9 months)")}
          >
            <Typography variant="h6">{livestockData.weanerStage2}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={<><GiFemale color="#ffa500" size={18} /> Yearlings (9-12)</>}
            onClick={() => handleCategoryClick("category=Yearling (9-12 months)")}
          >
            <Typography variant="h6">{livestockData.yearlings}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={<><GiFemale color="#ffa500" size={18} /> Bulling (12-15)</>}
            onClick={() => handleCategoryClick("category=Bulling (12-15 months)")}
          >
            <Typography variant="h6">{livestockData.bulling}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={<><GiHeartBeats color="#ffa500" size={18} /> In-Calf</>}
            onClick={() => handleCategoryClick("category=In-Calf")}
          >
            <Typography variant="h6">{livestockData.inCalf}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={<><GiHeartBeats color="#ffa500" size={18} /> Steaming</>}
            onClick={() => handleCategoryClick("category=Steaming")}
          >
            <Typography variant="h6">{livestockData.steaming}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={<><GiMilkCarton color="#ffa500" size={18} /> Early Lactating</>}
            onClick={() => handleCategoryClick("category=Early Lactating")}
          >
            <Typography variant="h6">{livestockData.earlyLactating}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={<><GiMilkCarton color="#ffa500" size={18} /> Mid Lactating</>}
            onClick={() => handleCategoryClick("category=Mid Lactating")}
          >
            <Typography variant="h6">{livestockData.midLactating}</Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <DashboardCard
            title={<><GiMilkCarton color="#ffa500" size={18} /> Late Lactating</>}
            onClick={() => handleCategoryClick("category=Late Lactating")}
          >
            <Typography variant="h6">{livestockData.lateLactating}</Typography>
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
            title={<><GiMedicalPack color="red" size={18} /> Sick Animals</>}
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
              <MenuItem value="Calf (0-3 months)">Calf (0-3 months)</MenuItem>
              <MenuItem value="Weaner Stage 1 (3-6 months)">Weaner Stage 1 (3-6 months)</MenuItem>
              <MenuItem value="Weaner Stage 2 (6-9 months)">Weaner Stage 2 (6-9 months)</MenuItem>
              <MenuItem value="Yearling (9-12 months)">Yearling (9-12 months)</MenuItem>
              <MenuItem value="Bulling (12-15 months)">Bulling (12-15 months)</MenuItem>
              <MenuItem value="Heifer">Heifer</MenuItem>
              <MenuItem value="In-Calf">In-Calf</MenuItem>
              <MenuItem value="Steaming">Steaming</MenuItem>
              <MenuItem value="Early Lactating">Early Lactating</MenuItem>
              <MenuItem value="Mid Lactating">Mid Lactating</MenuItem>
              <MenuItem value="Late Lactating">Late Lactating</MenuItem>
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