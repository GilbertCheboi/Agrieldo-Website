import React, { useState, useEffect } from 'react';
import { Fab, Container, List, ListItem, ListItemText } from '@mui/material';
import { Add as AddIcon, Restaurant as FeedIcon } from '@mui/icons-material';
import { getFeeds } from "../services/api";
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

  if (loading) return <p>Loading feeds...</p>;

  return (
    <Container>
      <h2>Feed Store</h2>
      {feeds.length === 0 ? (
        <p>No feeds in store</p>
      ) : (
        <List>
          {feeds.map((feed) => (
            <ListItem key={feed.id}>
              <ListItemText
                primary={`${feed.name} - ${feed.quantity_kg} kg`}
                secondary={`$${feed.price_per_kg}/kg`}
              />


            </ListItem>
          ))}
        </List>
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