import React from "react";
import { Grid, Paper, Typography, Box, Container } from "@mui/material";
import Sidebar from "./ Sidebar";
import CalendarComponent from "./ CalendarComponent";
import ProductionOverview from "./ProductionOverview"; 
import MilkProductionChart from "./MilkProductionChart";
import FinancialOverview from "./FinancialOverview";
import LivestockOverview from "./LivestockOverview";
import MonthlyActivities from "./MonthlyActivities";
import TaskManagement from "./TaskManagement";
import FeedManagement from "./FeedManagement";
import FarmActivitiesHistory from "./FarmActivitiesHistory"; 

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl">
          {/* Dashboard Title */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#333",
              mb: 3,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            🚜 Farmer Dashboard
          </Typography>

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
