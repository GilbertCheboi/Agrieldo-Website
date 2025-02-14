import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Fab,
  Modal,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import { GiWheat } from "react-icons/gi";
import AddIcon from "@mui/icons-material/Add";
import { addTransaction, fetchFeeds } from "../services/api";

const FeedManagement = () => {
  const [open, setOpen] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionData, setTransactionData] = useState({
    feed: "",
    quantity_kg: "",
    action: "ADD",
  });

  // Fetch feeds when component loads
  useEffect(() => {
    const loadFeeds = async () => {
      try {
        const feedsData = await fetchFeeds();
        setFeeds(feedsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feeds:", error);
        setLoading(false);
      }
    };
    loadFeeds();
  }, []);

  // Handle modal open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle form input change
  const handleChange = (e) => {
    setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!transactionData.feed) {
      alert("Please select a feed!");
      return;
    }
    await addTransaction(transactionData);
    alert("Transaction Recorded!");
    handleClose();
  };

  return (
    <Box sx={{ position: "relative", p: 2 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px" }}
      >
        <GiWheat color="#ffa500" /> Feed Management
      </Typography>

      {/* Table for displaying feeds */}
      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#ffa500" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Feed Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }} align="center">Quantity (kg)</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feeds.length > 0 ? (
                feeds.map((feed) => (
                  <TableRow key={feed.id}>
                    <TableCell>{feed.name}</TableCell>
                    <TableCell align="center">{feed.quantity_kg}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: "#ffa500", color: "white" }}
                        onClick={handleOpen}
                      >
                        Add Transaction
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No feeds available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Floating Action Button (FAB) */}
      <Fab
        color="primary"
        sx={{ position: "absolute", bottom: 16, right: 16, backgroundColor: "#ffa500" }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      {/* Modal for Handling Feed Transactions */}
      <Modal open={open} onClose={handleClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ backgroundColor: "white", p: 4, borderRadius: 2, width: 400 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Record Feed Transaction
          </Typography>

          {loading ? (
            <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Feed Dropdown */}
              <TextField
                fullWidth
                select
                label="Select Feed"
                name="feed"
                value={transactionData.feed}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              >
                {feeds.map((feed) => (
                  <MenuItem key={feed.id} value={feed.id}>
                    {feed.name}
                  </MenuItem>
                ))}
              </TextField>

              {/* Quantity Input */}
              <TextField
                fullWidth
                label="Quantity (kg)"
                type="number"
                name="quantity_kg"
                value={transactionData.quantity_kg}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />

              {/* Action Dropdown */}
              <TextField
                fullWidth
                select
                label="Action"
                name="action"
                value={transactionData.action}
                onChange={handleChange}
                sx={{ mb: 2 }}
              >
                <MenuItem value="ADD">Add</MenuItem>
                <MenuItem value="CONSUME">Consume</MenuItem>
              </TextField>

              <Button type="submit" fullWidth variant="contained" sx={{ backgroundColor: "#ffa500", color: "white" }}>
                Submit
              </Button>
            </form>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default FeedManagement;
