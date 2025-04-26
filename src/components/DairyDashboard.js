import React from "react";
import { Grid, Paper, Typography, Box, List, ListItem, ListItemText, Divider, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MilkProductionChart from "./MilkProductionChart";
import FeedVsMilkRevenueChart from "./FeedVsMilkRevenueChart";

const DairyDashboard = ({ farmId }) => {
  const navigate = useNavigate();

  // Dummy data
  const milkToday = 420; // litres
  const averageYield = 15.2; // litres per cow
  const lactatingAnimals = 28; // Number of lactating animals
  const milkRevenueThisMonth = 3500; // dollars
  const feedCostThisMonth = 800; // dollars

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

  return (
    <Box sx={{ p: 2 }}>

      {/* Top overview section with important figures */}
      <Grid container spacing={3}>
        {/* Milk Production Quick Stats */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: "#f0fdfa", borderRadius: "12px" }}>
            <Typography variant="h6" sx={{ color: "#1a3c34", mb: 1 }}>
              🥛 Today's Milk
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {milkToday}L
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography>Avg Yield/Cow: <b>{averageYield}L</b></Typography>
            <Typography>Lactating Cows: <b>{lactatingAnimals}</b></Typography>
          </Paper>
        </Grid>

        {/* Animal Health Quick Stats */}
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

        {/* Financial Overview (NEW) */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: "#ecfdf5", borderRadius: "12px" }}>
            <Typography variant="h6" sx={{ color: "#047857", mb: 1 }}>
              💰 Financials
            </Typography>
            <Stack spacing={0.5}>
              <Typography>Milk Revenue: <b>${milkRevenueThisMonth}</b></Typography>
              <Typography>Feed Cost: <b>${feedCostThisMonth}</b></Typography>
              <Typography>Profit: <b>${milkRevenueThisMonth - feedCostThisMonth}</b></Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Detailed Panels */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Top Producing Cows */}
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

        {/* Alerts */}
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

      {/* Charts Section */}
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
            {MilkProductionChart ? (
              <MilkProductionChart farmId={farmId} />
            ) : (
              <Typography>MilkProductionChart not found</Typography>
            )}
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
            {FeedVsMilkRevenueChart ? (
              <FeedVsMilkRevenueChart farmId={farmId} />
            ) : (
              <Typography>FeedVsMilkRevenueChart not found</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

    </Box>
  );
};

export default DairyDashboard;
