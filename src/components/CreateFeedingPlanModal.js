// components/CreateFeedingPlanModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, MenuItem, Button, Typography, IconButton } from '@mui/material';
import { getFeeds, createFeedingPlan } from "../services/api";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CreateFeedingPlanModal = ({ open, onClose, onPlanCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    items: [{ feed_id: '', quantity_per_animal: '' }],
  });
  const [feeds, setFeeds] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeeds = async () => {
      setLoading(true);
      try {
        const data = await getFeeds();
        setFeeds(data || []);
      } catch (err) {
        console.error('Error fetching feeds:', err);
        setError('Failed to load feeds');
      } finally {
        setLoading(false);
      }
    };
    if (open) fetchFeeds();
  }, [open]);

  const handleChange = (e, index = null) => {
    if (index === null) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      const newItems = [...formData.items];
      newItems[index][e.target.name] = e.target.value;
      setFormData({ ...formData, items: newItems });
    }
    setMessage('');
    setError('');
  };

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, { feed_id: '', quantity_per_animal: '' }] });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const dataToSend = {
      name: formData.name,
      items: formData.items.map(item => ({
        feed_id: item.feed_id,
        quantity_per_animal: item.quantity_per_animal,
      })),
    };

    if (!dataToSend.name) {
      setError('Plan name is required');
      return;
    }
    if (dataToSend.items.length === 0 || dataToSend.items.some(item => !item.feed_id || !item.quantity_per_animal)) {
      setError('All feed items must have a feed and quantity');
      return;
    }

    console.log('Sending to API:', dataToSend);
    try {
      const response = await createFeedingPlan(dataToSend);
      setMessage('Feeding plan created successfully');
      onPlanCreated(response);
      setFormData({ name: '', items: [{ feed_id: '', quantity_per_animal: '' }] });
      setTimeout(() => onClose(), 1000);
    } catch (error) {
      console.error('API Error:', error.response || error);
      setError(error.response?.data?.error || 'Failed to create feeding plan');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>Create Feeding Plan</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Plan Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            disabled={loading}
          />
          {formData.items.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                select
                label="Feed"
                name="feed_id"
                value={item.feed_id}
                onChange={(e) => handleChange(e, index)}
                sx={{ width: '50%', mr: 1 }}
                required
                disabled={loading}
              >
                <MenuItem value="">Select Feed</MenuItem>
                {feeds.map((feed) => (
                  <MenuItem key={feed.id} value={feed.id}>{feed.name}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="Quantity (kg)"
                name="quantity_per_animal"
                type="number"
                value={item.quantity_per_animal}
                onChange={(e) => handleChange(e, index)}
                sx={{ width: '40%' }}
                required
                inputProps={{ min: "0.1", step: "0.1" }}
                disabled={loading}
              />
              <IconButton onClick={() => removeItem(index)} disabled={loading || formData.items.length === 1}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addItem}
            sx={{ mb: 2 }}
            disabled={loading}
          >
            Add Feed
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            Create Plan
          </Button>
          {message && <Typography color="success.main" sx={{ mt: 2 }}>{message}</Typography>}
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </form>
      </Box>
    </Modal>
  );
};

export default CreateFeedingPlanModal;