import React from "react";
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from "@mui/material";
import { GiCow, GiBabyBottle, GiMedicalPack } from "react-icons/gi";

const LivestockOverview = () => {
  return (
    <Box sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2, boxShadow: 2, maxWidth: 400 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px", color: "#333", mb: 2 }}
      >
        <GiCow color="#ffa500" size={28} /> Livestock Overview
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#ffa500" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <GiCow color="#ffa500" size={20} /> Total Cows
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>50</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <GiBabyBottle color="#ffa500" size={20} /> Newborns
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>5</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <GiMedicalPack color="red" size={20} /> Sick Cows
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold", color: "red" }}>2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LivestockOverview;
