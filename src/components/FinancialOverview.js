import React, { useState } from "react";
import { Paper, Typography, Grid, Divider, Box } from "@mui/material";
import { FaChartLine, FaMoneyBillWave, FaShoppingCart, FaDollarSign } from "react-icons/fa";

const FinancialOverview = () => {
  // Dummy financial data
  const [financialData] = useState({
    totalRevenue: 50000,
    totalExpenses: 30000,
    netProfit: 20000,
    lastUpdated: "February 2025",
  });

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fff",
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "#333",
          mb: 2,
        }}
      >
        <FaChartLine color="#ffa500" size={24} /> Financial Overview
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" gap={1}>
            <FaMoneyBillWave color="#4CAF50" size={18} />
            <Typography variant="body1">
              <strong>Total Revenue:</strong> ${financialData.totalRevenue.toLocaleString()}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center" gap={1}>
            <FaShoppingCart color="red" size={18} />
            <Typography variant="body1">
              <strong>Total Expenses:</strong> ${financialData.totalExpenses.toLocaleString()}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center" gap={1}>
            <FaDollarSign color={financialData.netProfit >= 0 ? "#4CAF50" : "red"} size={18} />
            <Typography variant="body1" sx={{ fontWeight: "bold", color: financialData.netProfit >= 0 ? "green" : "red" }}>
              Net Profit: ${financialData.netProfit.toLocaleString()}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="caption" color="textSecondary" sx={{ mt: 2, display: "block" }}>
        Last Updated: {financialData.lastUpdated}
      </Typography>
    </Paper>
  );
};

export default FinancialOverview;
