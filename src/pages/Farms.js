import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getFarms, createFarm } from "../services/api";

const Farms = () => {
  const [farms, setFarms] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", location: "", type: "Dairy" }); // Added type with default

  const fetchFarms = async () => {
    try {
      const data = await getFarms();
      setFarms(data);
    } catch (error) {
      console.error("Failed to load farms", error);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await createFarm(formData); // Passes name, location, and type
      setOpen(false);
      setFormData({ name: "", location: "", type: "Dairy" }); // Reset form
      fetchFarms();
    } catch (error) {
      console.error("Error creating farm:", error);
    }
  };

  // Farm type options
  const farmTypes = [
    { value: "Dairy", label: "Dairy" },
    { value: "Sheep", label: "Sheep" },
    { value: "Crop", label: "Crop" },
  ];

  return (
    <div className="p-4">
      <Typography variant="h5" gutterBottom>My Farms</Typography>

      <Grid container spacing={2}>
        {farms.map((farm) => (
          <Grid item xs={12} sm={6} md={4} key={farm.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{farm.name}</Typography>
                <Typography variant="body2" color="textSecondary">{farm.location}</Typography>
                <Typography variant="caption">Type: {farm.type}</Typography>
                <Typography variant="caption" display="block">
                  Staff: {farm.farm_staff?.length || 0} {/* Updated to farm_staff */}
                </Typography>
                <Typography variant="caption" display="block">
                  Vets: {farm.vet_staff?.length || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* FAB Button */}
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: 24, right: 24 }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>

      {/* Add Farm Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Farm</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Farm Name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            fullWidth
            value={formData.location}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="farm-type-label">Farm Type</InputLabel>
            <Select
              labelId="farm-type-label"
              name="type"
              value={formData.type}
              onChange={handleChange}
              label="Farm Type"
            >
              {farmTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add Farm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Farms;