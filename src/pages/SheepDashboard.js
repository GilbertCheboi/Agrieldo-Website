// src/components/SheepDashboard.js
import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { fetchSheepData, fetchSheepTypes, createSheep } from "../services/api";
import DashboardCard from "../components/DashboardCard";

const SheepDashboard = ({ farmId }) => {
  const [sheepData, setSheepData] = useState([]);
  const [sheepTypes, setSheepTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    tag_number: "",
    dob: "",
    sheep_type: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadSheepData = async () => {
      try {
        const data = await fetchSheepData({ farmId });
        setSheepData(data);
      } catch (error) {
        console.error("Failed to load sheep data:", error);
      }
    };
    const loadSheepTypes = async () => {
      try {
        const types = await fetchSheepTypes();
        setSheepTypes(types);
      } catch (error) {
        console.error("Failed to load sheep types:", error);
      }
    };
    loadSheepData();
    loadSheepTypes();
  }, [farmId]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ tag_number: "", dob: "", sheep_type: "" });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

// src/components/SheepDashboard.js
const handleSubmit = async () => {
    if (!formData.tag_number || !formData.dob) {
      alert("Tag Number and Date of Birth are required.");
      return;
    }
    try {
      const payload = {
        farm: parseInt(farmId),
        tag_number: formData.tag_number,
        dob: formData.dob,
        sheep_type_id: formData.sheep_type || null, // Changed to sheep_type_id
      };
      console.log("Payload before submission:", payload);
      const newSheep = await createSheep(payload);
      console.log("New sheep response:", newSheep);
      setSheepData((prev) => [...prev, newSheep]);
      handleClose();
    } catch (error) {
      console.error("Error adding sheep:", error);
      alert(error.message);
    }
  };

  const handleSheepCountClick = () => {
    console.log("Sheep Count clicked, navigating to /sheep-list/", farmId); // Debug log
    navigate(`/sheep-list/${farmId}`);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
            onClick={handleSheepCountClick}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#1a3c34",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <span style={{ color: "#ffa500", fontSize: "1.2rem" }}>🐑</span>
                Sheep Count
              </Typography>
              <Typography variant="h6">{sheepData.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <DashboardCard title="🧶 Wool Production">
            <Typography variant="h6">
              {sheepData.reduce((sum, s) => sum + s.production_records.reduce((pSum, p) => pSum + p.wool_yield, 0), 0)} kg
            </Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <DashboardCard title="⚖️ Total Weight">
            <Typography variant="h6">
              {sheepData.reduce((sum, s) => sum + s.production_records.reduce((pSum, p) => pSum + p.weight, 0), 0)} kg
            </Typography>
          </DashboardCard>
        </Grid>
      </Grid>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 24, right: 24 }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Sheep</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="tag_number"
            label="Tag Number"
            fullWidth
            value={formData.tag_number}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="dob"
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.dob}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="sheep-type-label">Sheep Type</InputLabel>
            <Select
              labelId="sheep-type-label"
              name="sheep_type"
              value={formData.sheep_type}
              onChange={handleChange}
              label="Sheep Type"
            >
              <MenuItem value="">None</MenuItem>
              {sheepTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add Sheep
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SheepDashboard;