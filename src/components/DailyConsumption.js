import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { fetchDailyConsumption } from "../services/api";

const DailyConsumption = () => {
  const [consumptionData, setConsumptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadConsumptionData = async () => {
      try {
        const data = await fetchDailyConsumption();

        // Ensure consumption is an object and dates are sorted
        setConsumptionData({
          dates: data.dates || [],
          consumption: data.consumption || {},
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching daily consumption:", error);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    loadConsumptionData();
  }, []);

  return (
    <Box sx={{ p: 3, backgroundColor: "#ffffff", borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333", mb: 2 }}>
        🐄 Daily Feed Consumption (Last 7 Days)
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", my: 3 }} />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : consumptionData ? (
        <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#ffa500" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Feed Type</TableCell>
                {consumptionData.dates.map((date) => (
                  <TableCell key={date} sx={{ fontWeight: "bold", color: "white" }} align="center">
                    {date}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(consumptionData.consumption).map(([feedType, dailyData]) => (
                <TableRow key={feedType}>
                  <TableCell>{feedType}</TableCell>
                  {consumptionData.dates.map((date) => (
                    <TableCell key={date} align="center">
                      {dailyData[date] ? `${dailyData[date]} kg` : "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No consumption data available.</Typography>
      )}
    </Box>
  );
};

export default DailyConsumption;
