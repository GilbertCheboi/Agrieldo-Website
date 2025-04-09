// components/ListFeedingPlansModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { getFeedingPlans } from "../services/api";

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

const ListFeedingPlansModal = ({ open, onClose }) => {
  const [feedingPlans, setFeedingPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const data = await getFeedingPlans();
        setFeedingPlans(data || []);
      } catch (err) {
        console.error('Error fetching plans:', err);
        setError('Failed to load feeding plans');
      } finally {
        setLoading(false);
      }
    };
    if (open) fetchPlans();
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>Feeding Plans</Typography>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : feedingPlans.length === 0 ? (
          <Typography>No feeding plans found.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Feeds</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedingPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.name}</TableCell>
                  <TableCell>
                    {plan.items.map((item) => (
                      <Typography key={item.id}>{`${item.feed_name}: ${item.quantity_per_animal} kg`}</Typography>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ListFeedingPlansModal;