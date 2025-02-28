import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Box, Container, Avatar } from "@mui/material";
import Slider from "./ Sidebar";
import CalendarComponent from "./ CalendarComponent";
import ProductionOverview from "./ProductionOverview"; 
import MilkProductionChart from "./MilkProductionChart";
import FinancialOverview from "./FinancialOverview";
import LivestockOverview from "./LivestockOverview";
import MonthlyActivities from "./MonthlyActivities";
import TaskManagement from "./TaskManagement";
import FeedManagement from "./FeedManagement";
import FarmActivitiesHistory from "./FarmActivitiesHistory"; 
import axios from "axios";

const backendURL = "https://api.agrieldo.com"; // Replace with your backend URL

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [greeting, setGreeting] = useState("");

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

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <Slider />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl">
          {/* Dashboard Header with Profile */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            {/* Dashboard Title & Profile */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Profile Picture */}
              {profile?.image ? (
                <Avatar
                  src={`${backendURL}${profile.image}`}
                  alt="Profile"
                  sx={{
                    width: 100,
                    height: 100,
                    mr: 2,
                    border: "2px solid #ffa500",
                  }}
                />
              ) : (
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    mr: 2,
                    bgcolor: "#ffa500",
                  }}
                >
                  {profile?.first_name ? profile.first_name[0] : "?"}
                </Avatar>
              )}

              {/* Greeting Message with User Name */}
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                {greeting} {profile?.first_name && `- ${profile.first_name}`}!
              </Typography>
            </Box>
          </Box>

          {/* Responsive Grid Layout */}
          <Grid container spacing={3}>
            {/* Calendar Component */}
            <Grid item xs={12} sm={6} lg={4}>
              <DashboardCard title="📅 Calendar">
                <CalendarComponent />
              </DashboardCard>
            </Grid>

            {/* Milk Production Chart */}
            <Grid item xs={12} sm={6} lg={4}>
              <DashboardCard title="📊 Milk Production">
                <MilkProductionChart />
              </DashboardCard>
            </Grid>

            {/* Feed Management */}
            <Grid item xs={12} sm={6} lg={4}>
              <DashboardCard title="🌾 Feed Management">
                <FeedManagement />
              </DashboardCard>
            </Grid>

            {/* Production Overview */}
            <Grid item xs={12} sm={6} lg={4}>
              <DashboardCard title="🌾 Production Overview">
                <ProductionOverview />
              </DashboardCard>
            </Grid>

            {/* Financial Overview */}
            <Grid item xs={12} sm={6} lg={4}>
              <DashboardCard title="💰 Financial Overview">
                <FinancialOverview />
              </DashboardCard>
            </Grid>

            {/* Livestock Overview */}
            <Grid item xs={12} sm={6} lg={4}>
              <DashboardCard title="🐄 Livestock Overview">
                <LivestockOverview />
              </DashboardCard>
            </Grid>

            {/* Monthly Activities */}
            <Grid item xs={12} sm={6} lg={4}>
              <DashboardCard title="📆 Monthly Activities">
                <MonthlyActivities />
              </DashboardCard>
            </Grid>

            {/* Farm Activities History */}
            <Grid item xs={12} sm={6} lg={4}>
              <DashboardCard title="📜 Farm Activities History">
                <FarmActivitiesHistory />
              </DashboardCard>
            </Grid>

            {/* Task Management (Full Width) */}
            <Grid item xs={12}>
              <DashboardCard title="📋 Task Management">
                <TaskManagement />
              </DashboardCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

/* Reusable Card Component */
const DashboardCard = ({ title, children }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "12px",
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 2, color: "#ffa500" }}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

export default Dashboard;
