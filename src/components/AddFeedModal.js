import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { addFeedToStore } from '../services/api';

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
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const dataToSend = {
      name: formData.name.trim(),
      quantity_kg: parseFloat(formData.quantity_kg) || 0,
      price_per_kg: formData.price_per_kg ? parseFloat(formData.price_per_kg) : undefined, // Send undefined if blank
    };

    if (!dataToSend.name) {
      setError('Feed name is required');
      return;
    }
    if (dataToSend.quantity_kg <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }

    console.log('Sending to API:', dataToSend);
    try {
      const response = await addFeedToStore(dataToSend);
      const newFeed = response.data; // Full feed object from API
      const isNew = response.status === 201; // 201 for new, 200 for top-up
      onFeedAdded(newFeed);
      setSuccess(`Successfully ${isNew ? 'added' : 'topped up'} ${dataToSend.name} with ${dataToSend.quantity_kg} kg`);
      setFormData({ name: '', quantity_kg: '', price_per_kg: '' });
      setTimeout(() => {
        onClose();
      }, 1000); // Close after 1 second to show success
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to add or top up feed');
      console.error('API Error:', error.response);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Add Feed to Store
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Feed Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            variant="outlined"
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
            inputProps={{ min: '0.1', step: '0.1' }}
            variant="outlined"
          />
          <TextField
            label="Price per kg ($)"
            name="price_per_kg"
            type="number"
            value={formData.price_per_kg}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputProps={{ min: '0', step: '0.01' }}
            helperText="Optional: Leave blank to keep existing price for top-ups"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add or Top Up Feed
          </Button>
          {success && (
            <Typography color="success.main" sx={{ mt: 2, textAlign: 'center' }}>
              {success}
            </Typography>
          )}
          {error && (
            <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </Modal>
  );
};

export default AddFeedModal;