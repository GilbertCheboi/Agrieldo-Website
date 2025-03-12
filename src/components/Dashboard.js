import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Box, Container, Avatar, Card, CardContent } from "@mui/material";
import Slider from "./ Sidebar";
import CalendarComponent from "./ CalendarComponent"
import MilkProductionChart from "./MilkProductionChart";
import FeedManagement from "./FeedManagement";
import ProductionOverview from "./ProductionOverview";
import FinancialOverview from "./FinancialOverview";
import LivestockOverview from "./LivestockOverview";
import MonthlyActivities from "./MonthlyActivities";
import TaskManagement from "./TaskManagement";
import FarmActivitiesHistory from "./FarmActivitiesHistory";
import { fetchAnimals, getFarms } from "../services/api";
import { useNavigate } from "react-router-dom";
import { GiCow, GiBull, GiFemale, GiBabyBottle, GiHeartBeats, GiGrass, GiMilkCarton, GiMedicalPack, GiBarn } from "react-icons/gi";
import axios from "axios"; // Kept for profile fetching

const backendURL = "https://api.agrieldo.com";

const calculateAgeInMonths = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date("2025-03-07");
  const diffMs = today - birthDate;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
};

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [greeting, setGreeting] = useState("");
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
  const [farmsData, setFarmsData] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState(null); // Track selected farm
  const [loadingLivestock, setLoadingLivestock] = useState(true);
  const [loadingFarms, setLoadingFarms] = useState(true);
  const navigate = useNavigate();

  // Fetch profile (unchanged)
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

  // Fetch farms and set initial selected farm
  useEffect(() => {
    const loadFarmsData = async () => {
      try {
        const farms = await getFarms();
        console.log("Farms data:", farms);
        const farmsArray = Array.isArray(farms) ? farms : [];
        setFarmsData(farmsArray);
        // Set the first farm as default if available
        if (farmsArray.length > 0) {
          setSelectedFarmId(farmsArray[0].id);
        }
        setLoadingFarms(false);
      } catch (error) {
        console.error("Failed to load farms data:", error);
        setFarmsData([]);
        setLoadingFarms(false);
      }
    };

    loadFarmsData();
  }, []);

  // Fetch livestock data when selectedFarmId changes
  useEffect(() => {
    const loadLivestockData = async () => {
      if (!selectedFarmId) return; // Skip if no farm selected
      try {
        setLoadingLivestock(true);
        // Assuming fetchAnimals accepts a farmId parameter
        const animals = await fetchAnimals({ farmId: selectedFarmId }); // Adjust this based on your API
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
        setLoadingLivestock(false);
      } catch (error) {
        console.error("Failed to load livestock data for farm:", error);
        setLivestockData({
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
        setLoadingLivestock(false);
      }
    };

    loadLivestockData();
  }, [selectedFarmId]); // Re-run when selectedFarmId changes

  // Set greeting (unchanged)
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const livestockCards = [
    { title: "Total Cows", count: livestockData.totalCows, icon: <GiCow size={24} color="#ffa500" />, filter: "" },
    { title: "Bulls", count: livestockData.bulls, icon: <GiBull size={24} color="#ffa500" />, filter: "category=Bull" },
    { title: "Heifers", count: livestockData.heifers, icon: <GiFemale size={24} color="#ffa500" />, filter: "category=Heifer" },
    { title: "Calves", count: livestockData.calves, icon: <GiBabyBottle size={24} color="#ffa500" />, filter: "category=Calf" },
    { title: "Newborns", count: livestockData.newborns, icon: <GiBabyBottle size={24} color="#ffa500" />, filter: "age=Newborn" },
    { title: "Pregnant", count: livestockData.pregnant, icon: <GiHeartBeats size={24} color="#ffa500" />, filter: "is_pregnant=true" },
    { title: "Dry", count: livestockData.dry, icon: <GiGrass size={24} color="#ffa500" />, filter: "category=Dry" },
    { title: "Milking", count: livestockData.milking, icon: <GiMilkCarton size={24} color="#ffa500" />, filter: "category=Milking" },
    { title: "Sick Cows", count: livestockData.sickCows, icon: <GiMedicalPack size={24} color="red" />, filter: "is_sick=true" },
  ];

  const handleCardClick = (filter) => {
    navigate(`/animal_list?farmId=${selectedFarmId}&${filter}`);
  };

  const handleFarmCardClick = (farmId) => {
    setSelectedFarmId(farmId); // Update selected farm
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
                src={profile?.image ? `${backendURL}${profile.image}` : undefined}
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
                {!profile?.image && (profile?.first_name ? profile.first_name[0] : "?")}
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
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a3c34", mb: 2 }}>
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
                        bgcolor: selectedFarmId === farm.id ? "#fff3e0" : "#fff", // Highlight selected farm
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
                      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <GiBarn size={24} color="#ffa500" />
                        <Box>
                          <Typography variant="body2" sx={{ color: "#666" }}>
                            {farm.name || "Unnamed Farm"}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: "#1a3c34" }}>
                            {farm.location || "Unknown Location"}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>

          {/* Livestock Cards (for selected farm) */}
          {selectedFarmId && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a3c34", mb: 2 }}>
                Livestock Summary - {farmsData.find(f => f.id === selectedFarmId)?.name || "Selected Farm"}
              </Typography>
              <Grid container spacing={2}>
                {livestockCards.map((card) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4} key={card.title}>
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
                      onClick={() => handleCardClick(card.filter)}
                    >
                      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {card.icon}
                        <Box>
                          <Typography variant="body2" sx={{ color: "#666" }}>
                            {card.title}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: card.title === "Sick Cows" ? "red" : "#1a3c34" }}>
                            {loadingLivestock ? "..." : card.count}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Main Dashboard Grid (for selected farm) */}
          {selectedFarmId && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={4}>
                <DashboardCard title="📅 Calendar">
                  <CalendarComponent farmId={selectedFarmId} />
                </DashboardCard>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <DashboardCard title="📈 Milk Production">
                  <MilkProductionChart farmId={selectedFarmId} />
                </DashboardCard>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <DashboardCard title="🌾 Feed Management">
                  <FeedManagement farmId={selectedFarmId} />
                </DashboardCard>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <DashboardCard title="📊 Production Overview">
                  <ProductionOverview farmId={selectedFarmId} />
                </DashboardCard>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <DashboardCard title="💰 Financial Overview">
                  <FinancialOverview farmId={selectedFarmId} />
                </DashboardCard>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <DashboardCard title="🐄 Livestock Overview">
                  <LivestockOverview farmId={selectedFarmId} />
                </DashboardCard>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <DashboardCard title="📅 Monthly Activities">
                  <MonthlyActivities farmId={selectedFarmId} />
                </DashboardCard>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <DashboardCard title="📜 Farm Activities">
                  <FarmActivitiesHistory farmId={selectedFarmId} />
                </DashboardCard>
              </Grid>
              <Grid item xs={12}>
                <DashboardCard title="📋 Tasks">
                  <TaskManagement farmId={selectedFarmId} />
                </DashboardCard>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
};

const DashboardCard = ({ title, children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: "16px",
        bgcolor: "#fff",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-4px)",
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "#1a3c34",
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <span style={{ color: "#ffa500", fontSize: "1.2rem" }}>{title.split(" ")[0]}</span>
        {title.split(" ").slice(1).join(" ")}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Paper>
  );
};

export default Dashboard;