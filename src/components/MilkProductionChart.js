import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Typography, Box } from "@mui/material";
import { fetchDailyTotals } from "../services/api"; // Adjust the import path
import LocalDrinkIcon from "@mui/icons-material/LocalDrink"; // Icon for milk
import GrassIcon from "@mui/icons-material/Grass"; // Icon for feed

const MilkProductionChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDailyTotals = async () => {
      try {
        // Fetch data for a broader range (e.g., last 60 days)
        const today = new Date();
        const startDate = new Date(today.setDate(today.getDate() - 60)).toISOString().split("T")[0]; // 60 days ago
        const endDate = new Date().toISOString().split("T")[0]; // Today
        const totals = await fetchDailyTotals(startDate, endDate);
        setData(totals);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load daily totals:", error);
        setLoading(false);
      }
    };
    loadDailyTotals();
  }, []);

  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-11 (January is 0)
  const currentYear = currentDate.getFullYear();

  // Filter data for the current month
  const currentMonthData = data.filter((entry) => {
    // Assuming entry.date is in "MMM DD" format (e.g., "Feb 01")
    const [monthStr, day] = entry.date.split(" ");
    const monthMap = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    const entryMonth = monthMap[monthStr];
    const entryYear = currentYear; // Default to current year if not in data
    return entryMonth === currentMonth && entryYear === currentYear;
  });

  // Calculate totals for the current month
  const totalMilkThisMonth = currentMonthData.reduce((sum, entry) => sum + entry.total_milk_yield, 0);
  const totalFeedThisMonth = currentMonthData.reduce((sum, entry) => sum + entry.total_feed_consumption, 0);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <LocalDrinkIcon sx={{ color: "#ffa500", mr: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
          Milk:
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {totalMilkThisMonth.toFixed(2)} liters
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <GrassIcon sx={{ color: "#4caf50", mr: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
          Feed:
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {totalFeedThisMonth.toFixed(2)} kg
        </Typography>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="total_milk_yield"
              stroke="#ffa500"
              strokeWidth={2}
              name="Milk Yield (L)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="total_feed_consumption"
              stroke="#4caf50"
              strokeWidth={2}
              name="Feed Consumption (kg)"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default MilkProductionChart;