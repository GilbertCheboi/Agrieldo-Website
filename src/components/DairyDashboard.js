import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MilkProductionChart from "./MilkProductionChart";
import FeedVsMilkRevenueChart from "./FeedVsMilkRevenueChart";
import LivestockSummary from "./LivestockSummary";

const DairyDashboard = ({ farmId }) => {
  const navigate = useNavigate();

  console.log({
    MilkProductionChart,
    FeedVsMilkRevenueChart,
    LivestockSummary,
  });

  return (
    <Box>
      {/* Livestock Summary */}
      {LivestockSummary ? (
        <LivestockSummary farmId={farmId} navigate={navigate} />
      ) : (
        <Typography color="error">LivestockSummary component not found</Typography>
      )}

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: "12px",
              bgcolor: "#fff",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, color: "#1a3c34", mb: 1 }}
            >
              📈 Milk Production
            </Typography>
            {MilkProductionChart ? (
              <MilkProductionChart farmId={farmId} />
            ) : (
              <Typography>MilkProductionChart not found</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: "12px",
              bgcolor: "#fff",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, color: "#1a3c34", mb: 1 }}
            >
              📈 Milk vs Feed
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