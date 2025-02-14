import React from "react";
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const farmActivities = [
  { activity: "Veterinary Checkup", date: "Feb 1, 2025", status: "Completed" },
  { activity: "Fertilizer Application", date: "Jan 28, 2025", status: "Completed" },
  { activity: "Irrigation Maintenance", date: "Jan 20, 2025", status: "Pending" },
  { activity: "Harvesting Cabbage", date: "Jan 15, 2025", status: "Completed" },
  { activity: "Soil Testing", date: "Jan 10, 2025", status: "Completed" },
];

const FarmActivitiesHistory = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        🏡 Farm Activities History
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Activity</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {farmActivities.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.activity}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell style={{ color: item.status === "Completed" ? "green" : "red" }}>
                  {item.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default FarmActivitiesHistory;
