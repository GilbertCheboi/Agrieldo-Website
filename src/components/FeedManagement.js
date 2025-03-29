import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { fetchAnimals } from "../services/api";

const FeedManagement = ({ farmId }) => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnimals = async () => {
      try {
        const data = await fetchAnimals({ farmId });
        setAnimals(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load animals for feed management:", error);
        setLoading(false);
      }
    };
    loadAnimals();
  }, [farmId]);

  // Aggregate animals by category
  const categoryFeedPlans = animals.reduce((acc, animal) => {
    const cat = animal.category;
    if (!acc[cat]) {
      acc[cat] = {
        count: 0,
        feedPlan: animal.feed_plan || {
          feed_type: "Not set",
          daily_amount_kg: 0,
          frequency: "N/A",
          notes: "No plan defined",
        },
      };
    }
    acc[cat].count += 1;
    return acc;
  }, {});

  if (loading) return <Typography>Loading feed management...</Typography>;

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ p: 2, fontWeight: 600, color: "#1a3c34" }}>
        Feed Management by Category
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Category</strong>
            </TableCell>
            <TableCell>
              <strong>Count</strong>
            </TableCell>
            <TableCell>
              <strong>Feed Type</strong>
            </TableCell>
            <TableCell>
              <strong>Daily Amount (kg)</strong>
            </TableCell>
            <TableCell>
              <strong>Frequency</strong>
            </TableCell>
            <TableCell>
              <strong>Notes</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(categoryFeedPlans).map(
            ([category, { count, feedPlan }]) => (
              <TableRow key={category}>
                <TableCell>{category}</TableCell>
                <TableCell>{count}</TableCell>
                <TableCell>{feedPlan.feed_type}</TableCell>
                <TableCell>{feedPlan.daily_amount_kg}</TableCell>
                <TableCell>{feedPlan.frequency}</TableCell>
                <TableCell>{feedPlan.notes}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FeedManagement;
