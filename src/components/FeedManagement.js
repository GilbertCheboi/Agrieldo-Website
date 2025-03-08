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

const BASE_URL = "https://api.agrieldo.com/";

const getImageUrl = (imagePath) => {
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `${BASE_URL}${cleanPath}`;
};

const FeedManagement = () => {
  const [open, setOpen] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionData, setTransactionData] = useState({
    feed: "",
    quantity_kg: "",
    action: "ADD",
  });

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
  };

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

      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#ffa500" }}>Image</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#ffa500" }}>Feed Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#ffa500" }} align="center">Quantity (kg)</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#ffa500" }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feeds.length > 0 ? (
                feeds.map((feed) => (
                  <TableRow key={feed.id}>
                    <TableCell>
                      {feed.image ? (
                        <img
                          src={getImageUrl(feed.image)}
                          alt={feed.name}
                          style={{ maxHeight: "50px", maxWidth: "50px", objectFit: "cover" }}
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      ) : (
                        "No Image"
                      )}
                    </TableCell>
                    <TableCell>{feed.name}</TableCell>
                    <TableCell align="center">{feed.quantity_kg}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ color: "#ffa500", borderColor: "#ffa500" }}
                        onClick={handleOpen}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No feeds available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Fab
        color="primary"
        sx={{ position: "absolute", bottom: 16, right: 16, backgroundColor: "#ffa500" }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      <Modal open={open} onClose={handleClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ backgroundColor: "white", p: 4, borderRadius: 2, width: 400 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Record Feed Transaction
          </Typography>

          {loading ? (
            <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
          ) : (
            <form onSubmit={handleSubmit}>
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