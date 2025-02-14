import React from "react";
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from "@mui/material";
import { FaCalendarAlt, FaSeedling, FaTools, FaUserMd, FaChartLine } from "react-icons/fa";

const activities = [
  { date: "10th Feb", activity: "Grass Planting", icon: <FaSeedling color="#4CAF50" size={18} /> },
  { date: "15th Feb", activity: "Barn Maintenance", icon: <FaTools color="#FFA500" size={18} /> },
  { date: "20th Feb", activity: "Veterinary Checkup", icon: <FaUserMd color="red" size={18} /> },
  { date: "25th Feb", activity: "Financial Review", icon: <FaChartLine color="#333" size={18} /> },
];

const MonthlyActivities = () => {
  return (
    <Box sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2, boxShadow: 2, maxWidth: 400 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px", color: "#333", mb: 2 }}
      >
        <FaCalendarAlt color="#ffa500" size={24} /> Monthly Schedule
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#ffa500" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Activity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>{item.date}</TableCell>
                <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {item.icon} {item.activity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MonthlyActivities;
