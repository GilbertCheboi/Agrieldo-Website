import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, MenuItem, Button, Typography } from '@mui/material';
import { feedAnimals, getFeeds } from "../services/api";

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

const categories = [
  "Calf (0-3 months)", "Weaner Stage 1 (3-6 months)", "Weaner Stage 2 (6-9 months)",
  "Yearling (9-12 months)", "Bulling (12-15 months)", "In-Calf", "Steaming",
  "Heifer", "Early Lactating", "Mid Lactating", "Late Lactating", "Dry", "Bull",
];

const FeedAnimalsModal = ({ open, onClose, onFeedUpdated }) => {
  const [formData, setFormData] = useState({
    category: '',
    feed_id: '',
    quantity_per_animal: '',
  });
  const [feeds, setFeeds] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const data = await getFeeds();
        setFeeds(data);
      } catch (error) {
        console.error('Error fetching feeds:', error);
      }
    };
    if (open) fetchFeeds(); // Fetch when modal opens
  }, [open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await feedAnimals(formData);
      setMessage(response.message);
      onFeedUpdated();
      setFormData({ category: '', feed_id: '', quantity_per_animal: '' });
      setTimeout(onClose, 1000);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to feed animals');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6">Feed Animals</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="">Select Category</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Feed"
            name="feed_id"
            value={formData.feed_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="">Select Feed</MenuItem>
            {feeds.map((feed) => (
              <MenuItem key={feed.id} value={feed.id}>{feed.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Quantity per Animal (kg)"
            name="quantity_per_animal"
            type="number"
            value={formData.quantity_per_animal}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ min: "0.1", step: "0.1" }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Feed Now
          </Button>
          {message && <Typography color="success.main">{message}</Typography>}
          {error && <Typography color="error">{error}</Typography>}
        </form>
      </Box>
    </Modal>
  );
};

export default FeedAnimalsModal;