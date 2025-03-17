// src/components/FarmDashboard.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  Container,
  Button,
} from "@mui/material";
import Slider from "./ Sidebar";
import SheepDashboard from "../pages/SheepDashboard";
import DairyDashboard from "./DairyDashboard"; // Import the new DairyDashboard
import { getFarms, fetchCropData } from "../services/api";

const CropDashboard = ({ farmId }) => {
  const [cropData, setCropData] = useState([]);
  useEffect(() => {
    const loadCropData = async () => {
      try {
        const data = await fetchCropData({ farmId });
        setCropData(data);
      } catch (error) {
        console.error("Failed to load crop data:", error);
      }
    };
    loadCropData();
  }, [farmId]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={4}>
        <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6">🌾 Crop Count</Typography>
          <Typography variant="h6">{cropData.length}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6">📈 Harvest Yield</Typography>
          <Typography variant="h6">
            {cropData.reduce((sum, c) => sum + c.production_records.reduce((pSum, p) => pSum + p.harvest_yield, 0), 0)} tons
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6">📅 Planting Dates</Typography>
          <Typography variant="body1">
            {cropData.map(c => `${c.crop_type}: ${c.planting_date}`).join(", ")}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const FarmDashboard = () => {
  const { farmId } = useParams();
  const navigate = useNavigate();
  const [farm, setFarm] = useState(null);

  useEffect(() => {
    const fetchFarmDetails = async () => {
      try {
        const farms = await getFarms();
        const selectedFarm = farms.find(f => f.id === parseInt(farmId));
        setFarm(selectedFarm);
      } catch (error) {
        console.error("Failed to fetch farm details:", error);
      }
    };
    fetchFarmDetails();
  }, [farmId]);

  const renderDashboard = () => {
    if (!farm) return <Typography>Loading...</Typography>;
    switch (farm.type) {
      case "Dairy":
        return <DairyDashboard farmId={farmId} />;
      case "Sheep":
        return <SheepDashboard farmId={farmId} />;
      case "Crop":
        return <CropDashboard farmId={farmId} />;
      default:
        return <Typography>Unsupported farm type</Typography>;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        background: "linear-gradient(135deg, #f4f6f8 0%, #e9ecef 100%)",
      }}
    >
      <Slider />
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3, lg: 4 } }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a3c34" }}>
              {farm ? `${farm.name} Dashboard` : "Farm Dashboard"}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate("/dashboard")}>
              Back to Farms
            </Button>
          </Box>
          {renderDashboard()}
        </Container>
      </Box>
    </Box>
  );
};

export default FarmDashboard;