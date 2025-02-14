import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { fetchProductionHistory } from "../services/api";

const CommodityTable = ({ commodity, records }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ffa500" }}>
        {commodity}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const ProductionHistory = () => {
  const [groupedHistory, setGroupedHistory] = useState({});

  useEffect(() => {
    loadHistoryData();
  }, []);

  const loadHistoryData = async () => {
    try {
      const data = await fetchProductionHistory();
      
      // Group data by commodity
      const groupedData = data.reduce((acc, item) => {
        if (!acc[item.commodity]) {
          acc[item.commodity] = [];
        }
        acc[item.commodity].push(item);
        return acc;
      }, {});

      setGroupedHistory(groupedData);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        📅 Production History
      </Typography>
      
      {Object.entries(groupedHistory).map(([commodity, records]) => (
        <CommodityTable key={commodity} commodity={commodity} records={records} />
      ))}
    </Box>
  );
};

export default ProductionHistory;
