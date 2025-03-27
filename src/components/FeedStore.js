import React, { useState, useEffect } from 'react';
import {
  Fab,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Restaurant as FeedIcon } from '@mui/icons-material';
import { getFeeds } from '../services/api';
import AddFeedModal from './AddFeedModal';
import FeedAnimalsModal from './FeedAnimalsModal';

const FeedStore = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [feedModalOpen, setFeedModalOpen] = useState(false);

  const fetchFeeds = async () => {
    try {
      const data = await getFeeds();
      setFeeds(data);
    } catch (error) {
      console.error('Error fetching feeds:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  const handleFeedAdded = (newFeed) => {
    setFeeds([...feeds, newFeed]);
  };

  const handleFeedUpdated = () => {
    fetchFeeds();
  };

  if (loading) return <Typography>Loading feeds...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Feed Store
      </Typography>
      {feeds.length === 0 ? (
        <Typography>No feeds in store</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Quantity (kg)</TableCell>
                <TableCell align="right">Price per kg ($)</TableCell>
                <TableCell align="right">Total Cost ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feeds.map((feed) => (
                <TableRow key={feed.id}>
                  <TableCell>{feed.name}</TableCell>
                  <TableCell align="right">{feed.quantity_kg}</TableCell>
                  <TableCell align="right">{feed.price_per_kg.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    {(feed.quantity_kg * feed.price_per_kg).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Fab
        color="primary"
        style={{ position: 'fixed', bottom: 80, right: 20 }}
        onClick={() => setAddModalOpen(true)}
      >
        <AddIcon />
      </Fab>
      <Fab
        color="secondary"
        style={{ position: 'fixed', bottom: 20, right: 20 }}
        onClick={() => setFeedModalOpen(true)}
      >
        <FeedIcon />
      </Fab>
      <AddFeedModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onFeedAdded={handleFeedAdded}
      />
      <FeedAnimalsModal
        open={feedModalOpen}
        onClose={() => setFeedModalOpen(false)}
        onFeedUpdated={handleFeedUpdated}
      />
    </Container>
  );
};

export default FeedStore;