import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Typography, Box } from "@mui/material";
import { fetchDailyFeedVsMilkRevenue } from "../services/api";

const FeedVsMilkRevenueChart = ({ farmId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Last 14 days
        const today = new Date();
        const startDate = new Date(today.setDate(today.getDate() - 14))
          .toISOString()
          .split("T")[0];
        const endDate = new Date().toISOString().split("T")[0];

        const chartData = await fetchDailyFeedVsMilkRevenue(farmId, startDate, endDate);
        setData(chartData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load chart data:", error);
        setLoading(false);
      }
    };
    loadData();
  }, [farmId]);

  // Custom tick formatter for X-axis to show day and month
  const formatXAxis = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { day: "2-digit", month: "short" }); // e.g., "03 Apr"
  };

  if (loading) return <Typography>Loading chart...</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#1a3c34" }}>
        Milk Revenue vs Feed Cost Per Day
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 70 }}>
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            interval={0} // Show all days
            angle={-45} // Rotate labels 45 degrees counterclockwise
            textAnchor="end" // Align text to the end of the rotated label
            tick={{ fontSize: 10 }} // Even smaller font size for 14 labels
            height={80} // More space for rotated labels
          />
          <YAxis />
          <Tooltip
            formatter={(value) => `${value.toFixed(2)} `}
            labelFormatter={(label) =>
              new Date(label).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            }
          />
          <Legend />
          <Bar dataKey="milk_revenue" fill="#ffa500" name="Milk Revenue (Ksh.)" barSize={15} />
          <Bar dataKey="feed_cost" fill="#4caf50" name="Feed Cost (Ksh.)" barSize={15} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default FeedVsMilkRevenueChart;