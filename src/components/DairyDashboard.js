import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Box, List, ListItem, ListItemText, Divider, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MilkProductionChart from "./MilkProductionChart";
import FeedVsMilkRevenueChart from "./FeedVsMilkRevenueChart";
import { fetchDailyTotals, fetchDailyFeedVsMilkRevenue } from "../services/api";

const DairyDashboard = ({ farmId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    milkToday: 0,
    averageYield: 0,
    lactatingAnimals: 0,
    milkRevenueThisMonth: 0,
    feedCostThisMonth: 0,
  });

  // Log when component mounts
  console.log("DairyDashboard: Component mounted, farmId:", farmId);

  // Debug farmId
  useEffect(() => {
    console.log("DairyDashboard: useEffect triggered, farmId:", farmId);
    if (!farmId) {
      console.warn("DairyDashboard: farmId is undefined");
    }
  }, [farmId]);

  // Placeholder data
  const topCows = [
    { id: "AG001", yield: 22 },
    { id: "AG023", yield: 20 },
    { id: "AG017", yield: 19 },
  ];

  const healthSummary = {
    sickAnimals: 3,
    pregnantCows: 12,
    nextVetVisit: "2025-05-01",
    vaccinationDue: ["2025-05-05", "2025-05-10"],
  };

  const feedingSummary = {
    feedInventoryKg: 1200,
    feedConsumedToday: 580,
    feedingCompliance: "98%",
  };

  const alerts = [
    { type: "Low Feed Inventory", level: "warning" },
    { type: "Missed Milking: Cow AG045", level: "danger" },
    { type: "Vaccination Due: AG030", level: "info" },
  ];

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const today = new Date();
        const startDate = new Date(today.setDate(today.getDate() - 60)).toISOString().split("T")[0];
        const endDate = new Date().toISOString().split("T")[0];
        const dailyTotals = await fetchDailyTotals(startDate, endDate);

        const revenueStartDate = new Date(today.setDate(today.getDate() - 30)).toISOString().split("T")[0];
        const revenueData = await fetchDailyFeedVsMilkRevenue(farmId, revenueStartDate, endDate);

        const todayStr = new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short" });
        const todayData = dailyTotals.find((entry) => entry.date === todayStr) || { total_milk_yield: 0 };
        const milkToday = todayData.total_milk_yield;

        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const monthMap = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
        const currentMonthData = dailyTotals.filter((entry) => {
          const [monthStr] = entry.date.split(" ");
          const entryMonth = monthMap[monthStr];
          return entryMonth === currentMonth && currentYear === currentYear;
        });
        const totalMilkThisMonth = currentMonthData.reduce((sum, entry) => sum + entry.total_milk_yield, 0);

        const lactatingAnimals = 28; // Placeholder
        const averageYield = lactatingAnimals > 0 ? (totalMilkThisMonth / lactatingAnimals / currentMonthData.length).toFixed(1) : 0;

        const milkRevenueThisMonth = revenueData.reduce((sum, entry) => sum + entry.milk_revenue, 0);
        const feedCostThisMonth = revenueData.reduce((sum, entry) => sum + entry.feed_cost, 0);

        setDashboardData({
          milkToday,
          averageYield,
          lactatingAnimals,
          milkRevenueThisMonth,
          feedCostThisMonth,
        });
        setLoading(false);
      } catch (error) {
        console.error("DairyDashboard: Failed to load dashboard data:", error);
        setLoading(false);
      }
    };
    loadDashboardData();
  }, [farmId]);

  if (loading) {
    return <Typography>Loading dashboard...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* Navigation to AnimalList */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log("DairyDashboard: Navigating to AnimalList with farmId:", farmId);
            navigate(`/animal-list?farmId=${farmId}`);
          }}
          disabled={!farmId} // Disable if farmId is undefined
        >
          View Animals
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: "#f0fdfa", borderRadius: "12px" }}>
            <Typography variant="h6" sx={{ color: "#1a3c34", mb: 1 }}>
              🥛 Today's Milk
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {dashboardData.milkToday.toFixed(1)}L
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography>Avg Yield/Cow: <b>{dashboardData.averageYield}L</b></Typography>
            <Typography>Lactating Cows: <b>{dashboardData.lactatingAnimals}</b></Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: "#fef9c3", borderRadius: "12px" }}>
            <Typography variant="h6" sx={{ color: "#92400e", mb: 1 }}>
              🐄 Animal Health
            </Typography>
            <Stack spacing={0.5}>
              <Typography>Sick: <b>{healthSummary.sickAnimals}</b></Typography>
              <Typography>Pregnant: <b>{healthSummary.pregnantCows}</b></Typography>
              <Typography>Next Vet Visit: <b>{healthSummary.nextVetVisit}</b></Typography>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: "#ecfdf5", borderRadius: "12px" }}>
            <Typography variant="h6" sx={{ color: "#047857", mb: 1 }}>
              💰 Financials
            </Typography>
            <Stack spacing={0.5}>
              <Typography>Milk Revenue: <b>Ksh.{dashboardData.milkRevenueThisMonth.toFixed(2)}</b></Typography>
              <Typography>Feed Cost: <b>Ksh.{dashboardData.feedCostThisMonth.toFixed(2)}</b></Typography>
              <Typography>Profit: <b>Ksh.{(dashboardData.milkRevenueThisMonth - dashboardData.feedCostThisMonth).toFixed(2)}</b></Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, borderRadius: "12px" }}>
            <Typography variant="h6" sx={{ color: "#1a3c34", mb: 1 }}>
              🏆 Top Producing Cows
            </Typography>
            <List dense>
              {topCows.map((cow) => (
                <ListItem key={cow.id}>
                  <ListItemText primary={`${cow.id} - ${cow.yield}L`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2, borderRadius: "12px" }}>
            <Typography variant="h6" sx={{ color: "#b91c1c", mb: 1 }}>
              🚨 Alerts
            </Typography>
            <List dense>
              {alerts.map((alert, idx) => (
                <ListItem key={idx}>
                  <ListItemText
                    primary={alert.type}
                    primaryTypographyProps={{
                      color:
                        alert.level === "danger"
                          ? "error"
                          : alert.level === "warning"
                          ? "orange"
                          : "primary",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: "12px",
              bgcolor: "#fff",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, color: "#1a3c34", mb: 1 }}
            >
              📈 Milk Production Trend
            </Typography>
            <MilkProductionChart farmId={farmId} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: "12px",
              bgcolor: "#fff",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, color: "#1a3c34", mb: 1 }}
            >
              📊 Milk vs Feed Revenue
            </Typography>
            <FeedVsMilkRevenueChart farmId={farmId} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DairyDashboard;