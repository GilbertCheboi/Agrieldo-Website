import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { addFeedToStore } from "../services/api";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AddFeedModal = ({ open, onClose, onFeedAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity_kg: '',
    price_per_kg: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const dataToSend = {
      name: formData.name.trim(),
      quantity_kg: parseFloat(formData.quantity_kg) || 0, // Convert to number
      price_per_kg: parseFloat(formData.price_per_kg) || 0, // Convert to number
    };
    if (!dataToSend.name) {
      setError('Feed name is required');
      return;
    }
    console.log('Sending to API:', dataToSend);
    try {
      const newFeed = await addFeedToStore(dataToSend);
      onFeedAdded(newFeed);
      setFormData({ name: '', quantity_kg: '', price_per_kg: '' });
      onClose();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to add feed');
      console.error('API Error:', error.response);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6">Add Feed to Store</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Feed Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Quantity (kg)"
            name="quantity_kg"
            type="number"
            value={formData.quantity_kg}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ min: "0", step: "0.1" }}
          />
          <TextField
            label="Price per kg ($)"
            name="price_per_kg"
            type="number"
            value={formData.price_per_kg}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ min: "0", step: "0.01" }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Feed
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </form>
      </Box>
    </Modal>
  );
};

export default AddFeedModal;