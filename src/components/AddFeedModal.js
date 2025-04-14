// components/AddFeedModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, Autocomplete } from '@mui/material';
import { addFeedToStore, getFeeds } from '../services/api';

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
  const [feeds, setFeeds] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      const fetchFeeds = async () => {
        setLoading(true);
        try {
          const data = await getFeeds();
          setFeeds(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error('Error fetching feeds:', err);
          setFeeds([]);
        } finally {
          setLoading(false);
        }
      };
      fetchFeeds();
    }
  }, [open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  // Handle selection from dropdown
  const handleFeedNameChange = (event, newValue) => {
    const name = typeof newValue === 'object' && newValue ? newValue.name : newValue || '';
    setFormData({ ...formData, name });
    setError('');
    setSuccess('');
  };

  // Handle manual typing
  const handleFeedNameInputChange = (event, newInputValue) => {
    setFormData({ ...formData, name: newInputValue });
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
      price_per_kg: formData.price_per_kg ? parseFloat(formData.price_per_kg) : undefined,
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
      const newFeed = await addFeedToStore(dataToSend);
      console.log('Received Feed Data:', newFeed);

      if (!newFeed || typeof newFeed !== 'object' || !newFeed.id) {
        throw new Error('Invalid or missing feed data in API response');
      }

      onFeedAdded(newFeed);
      setSuccess(`Successfully added or topped up ${dataToSend.name} with ${dataToSend.quantity_kg} kg`);
      setFormData({ name: '', quantity_kg: '', price_per_kg: '' });
      setTimeout(() => onClose(), 1000);
    } catch (error) {
      console.error('API Error:', error.response || error);
      setError(error.response?.data?.error || error.message || 'Failed to add or top up feed');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Add Feed to Store
        </Typography>
        <form onSubmit={handleSubmit}>
          <Autocomplete
            options={feeds}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
            freeSolo
            loading={loading}
            value={formData.name}
            onChange={handleFeedNameChange}          // For dropdown selection
            onInputChange={handleFeedNameInputChange} // For manual typing
            renderInput={(params) => (
              <TextField
                {...params}
                label="Feed Name"
                name="name"
                fullWidth
                margin="normal"
                required
                variant="outlined"
                helperText="Select an existing feed or type a new name"
              />
            )}
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
            disabled={loading}
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