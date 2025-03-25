// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Container,
  Avatar,
  Card,
  CardContent,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Slider from "./ Sidebar";
import { useNavigate } from "react-router-dom";
import { getFarms, createFarm } from "../services/api";
import axios from "axios";
import { GiBarn } from "react-icons/gi";

const backendURL = "https://api.agrieldo.com";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [farmsData, setFarmsData] = useState([]);
  const [loadingFarms, setLoadingFarms] = useState(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "Dairy",
  });
  const navigate = useNavigate();

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRole = localStorage.getItem("user_role");
        const token = localStorage.getItem("accessToken");
        if (!token) return;
        const endpoint =
          userRole === "staff"
            ? `${backendURL}/api/profiles/staff/profile/`
            : `${backendURL}/api/profiles/farmer/profile/`;
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // Fetch farms
  const fetchFarms = async () => {
    try {
      const farms = await getFarms();
      console.log("Farms data:", farms);
      const farmsArray = Array.isArray(farms) ? farms : [];
      setFarmsData(farmsArray);
      setLoadingFarms(false);
    } catch (error) {
      console.error("Failed to load farms data:", error);
      setFarmsData([]);
      setLoadingFarms(false);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  // Set greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const handleFarmCardClick = (farmId) => {
    navigate(`/dashboard/${farmId}`);
  };

  // Form handlers
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await createFarm(formData);
      setOpen(false);
      setFormData({ name: "", location: "", type: "Dairy" });
      fetchFarms(); // Refresh farms list
    } catch (error) {
      console.error("Error creating farm:", error);
    }
  };

  // Farm type options
  const farmTypes = [
    { value: "Dairy", label: "Dairy" },
    { value: "Sheep", label: "Sheep" },
    { value: "Crop", label: "Crop" },
  ];

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
          {/* Greeting Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
              p: 2,
              bgcolor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={
                  profile?.image ? `${backendURL}${profile.image}` : undefined
                }
                alt="Profile"
                sx={{
                  width: { xs: 48, md: 64 },
                  height: { xs: 48, md: 64 },
                  mr: 2,
                  bgcolor: profile?.image ? "transparent" : "#ffa500",
                  border: "2px solid #ffa500",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                {!profile?.image &&
                  (profile?.first_name ? profile.first_name[0] : "?")}
              </Avatar>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#1a3c34",
                  letterSpacing: "-0.5px",
                }}
              >
                {greeting}{" "}
                <span style={{ color: "#ffa500" }}>
                  {profile?.first_name && `${profile.first_name}!`}
                </span>
              </Typography>
            </Box>
          </Box>

          {/* Farms Cards */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#1a3c34", mb: 2 }}
            >
              My Farms
            </Typography>
            <Grid container spacing={2}>
              {loadingFarms ? (
                <Typography>Loading farms...</Typography>
              ) : farmsData.length === 0 ? (
                <Typography>No farms available.</Typography>
              ) : (
                farmsData.map((farm) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4} key={farm.id}>
                    <Card
                      sx={{
                        bgcolor: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
                          transform: "translateY(-2px)",
                        },
                      }}
                      onClick={() => handleFarmCardClick(farm.id)}
                    >
                      <CardContent
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <GiBarn size={24} color="#ffa500" />
                        <Box>
                          <Typography variant="body2" sx={{ color: "#666" }}>
                            {farm.name || "Unnamed Farm"}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: "#1a3c34" }}
                          >
                            {farm.location || "Unknown Location"}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#888" }}>
                            Type: {farm.type || "Unknown"}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>

          {/* FAB Button */}
          <Fab
            color="primary"
            aria-label="add"
            sx={{ position: "fixed", bottom: 24, right: 24 }}
            onClick={() => setOpen(true)}
          >
            <AddIcon />
          </Fab>

          {/* Add Farm Modal */}
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Add New Farm</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Farm Name"
                fullWidth
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="location"
                label="Location"
                fullWidth
                value={formData.location}
                onChange={handleChange}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="farm-type-label">Farm Type</InputLabel>
                <Select
                  labelId="farm-type-label"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Farm Type"
                >
                  {farmTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Add Farm
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
