import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  TextField,
  Button,
  Typography,
  Modal,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const MachineryApplicationModal = ({ visible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    type_of_machine: "TRACTOR",
    model: "",
    price_per_day: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  return (
    <Modal open={visible} onClose={onClose}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          maxWidth: 600,
          mx: "auto",
          mt: "10%",
        }}
      >
        <Typography variant="h6" mb={2}>
          Submit Machinery for Leasing
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phone_number"
                fullWidth
                required
                value={formData.phone_number}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Type of Machine</InputLabel>
                <Select
                  name="type_of_machine"
                  value={formData.type_of_machine}
                  onChange={handleChange}
                  label="Type of Machine"
                >
                  <MenuItem value="TRACTOR">Tractor</MenuItem>
                  <MenuItem value="HARVESTER">Harvester</MenuItem>
                  <MenuItem value="PLOUGH">Plough</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Model"
                name="model"
                fullWidth
                required
                value={formData.model}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Price Per Day"
                name="price_per_day"
                type="number"
                fullWidth
                required
                value={formData.price_per_day}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Latitude"
                name="latitude"
                type="number"
                fullWidth
                value={formData.latitude}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Longitude"
                name="longitude"
                type="number"
                fullWidth
                value={formData.longitude}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
              <Button onClick={onClose} color="inherit">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="success">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default MachineryApplicationModal;
