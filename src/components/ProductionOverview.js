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
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { fetchTodaysProductionData, addProductionRecord, updateProductionRecord } from "../services/api";

const commodityOptions = ["Tomatoes", "Onions", "Cabbage", "Kales", "Milk", "Potatoes"];

const ProductionOverview = () => {
  const [productionData, setProductionData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const [formData, setFormData] = useState({
    commodity: "",
    quantity: "",
  });

  useEffect(() => {
    loadProductionData();
  }, []);

  const loadProductionData = async () => {
    try {
      const data = await fetchTodaysProductionData(); // Fetch only today's data
      setProductionData(data);
    } catch (error) {
      console.error("Error fetching today's production:", error);
    }
  };

  const handleOpen = (record = null) => {
    setEditingRecord(record);
    setFormData(record ? { commodity: record.commodity, quantity: record.quantity } : { commodity: "", quantity: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingRecord(null);
    setFormData({ commodity: "", quantity: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      let result;
      if (editingRecord) {
        result = await updateProductionRecord(editingRecord.id, formData);
      } else {
        result = await addProductionRecord(formData);
      }

      console.log("API Response:", result);
      if (result) {
        loadProductionData(); // Reload today's data
        handleClose();
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        📅 Today's Production
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Commodity</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>Last Updated</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productionData.length > 0 ? (
              productionData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.commodity}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.last_updated}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpen(item)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No production data available for today.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* FAB Button */}
      <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Fab color="primary" onClick={() => handleOpen()} size="medium">
          <AddIcon />
        </Fab>
      </Box>

      {/* Add/Edit Production Record Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingRecord ? "Edit Production Record" : "Add Production Record"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            select
            label="Commodity"
            name="commodity"
            value={formData.commodity}
            onChange={handleChange}
            fullWidth
          >
            {commodityOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {editingRecord ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ProductionOverview;
