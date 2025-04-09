// components/FeedAnimalsModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, MenuItem, Button, Typography } from '@mui/material';
import { feedAnimals, getFeedingPlans } from "../services/api";
import CreateFeedingPlanModal from './CreateFeedingPlanModal';
import ListFeedingPlansModal from './ListFeedingPlansModal';

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
  const [formData, setFormData] = useState({ category: '', plan_id: '' });
  const [feedingPlans, setFeedingPlans] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const data = await getFeedingPlans();
        setFeedingPlans(data || []);
      } catch (error) {
        console.error('Error fetching plans:', error);
        setError('Failed to load feeding plans');
      } finally {
        setLoading(false);
      }
    };
    if (open) {
      fetchPlans();
      setFormData({ category: '', plan_id: '' });
    }
  }, [open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const dataToSend = {
      category: formData.category,
      plan_id: formData.plan_id,
    };

    if (!dataToSend.category || !dataToSend.plan_id) {
      setError('Category and feeding plan are required');
      return;
    }

    console.log('Sending to API:', dataToSend);
    try {
      const response = await feedAnimals(dataToSend);
      setMessage(response.message);
      onFeedUpdated();
      setFormData({ category: '', plan_id: '' });
      setTimeout(() => onClose(), 1000);
    } catch (error) {
      console.error('API Error:', error.response || error);
      setError(error.response?.data?.error || 'Failed to feed animals');
    }
  };

  const handlePlanCreated = (newPlan) => {
    setFeedingPlans((prev) => [...prev, newPlan]);
    setCreateModalOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>Feed Animals</Typography>
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
              disabled={loading}
            >
              <MenuItem value="">Select Category</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Feeding Plan"
              name="plan_id"
              value={formData.plan_id}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              disabled={loading || !formData.category}
            >
              <MenuItem value="">Select Plan</MenuItem>
              {feedingPlans.map((plan) => (
                <MenuItem key={plan.id} value={plan.id}>{plan.name}</MenuItem>
              ))}
            </TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              Feed Now
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => setCreateModalOpen(true)}
              disabled={loading}
            >
              Create Feeding Plan
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => setListModalOpen(true)}
              disabled={loading}
            >
              List Feeding Plans
            </Button>
            {message && <Typography color="success.main" sx={{ mt: 2 }}>{message}</Typography>}
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          </form>
        </Box>
      </Modal>
      <CreateFeedingPlanModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onPlanCreated={handlePlanCreated}
      />
      <ListFeedingPlansModal
        open={listModalOpen}
        onClose={() => setListModalOpen(false)}
      />
    </>
  );
};

export default FeedAnimalsModal;