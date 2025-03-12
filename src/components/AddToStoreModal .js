import { useState, useEffect } from 'react';
import { fetchProduce, fetchStores, createInventory } from '../services/api';
import {
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Alert,
  Avatar,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const IMAGE_BASE_URL = 'http://207.154.253.97:8000'; // Adjust in production if needed

function AddToStoreModal({ open, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    produce: '',
    store: '',
    quantity: '',
  });
  const [produceList, setProduceList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [produceRes, storeRes] = await Promise.all([
          fetchProduce(),
          fetchStores(),
        ]);
        setProduceList(produceRes);
        setStoreList(storeRes);
        setFormData((prev) => ({
          ...prev,
          produce: produceRes.length > 0 ? produceRes[0].id : '',
          store: storeRes.length > 0 ? storeRes[0].id : '',
        }));
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load produce or store list.');
      } finally {
        setLoading(false);
      }
    };

    if (open) fetchData();
  }, [open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        produce: parseInt(formData.produce),
        quantity: parseFloat(formData.quantity),
        store: formData.store ? parseInt(formData.store) : null,
        outlet: null  // explicitly set outlet to null so backend doesn't complain
      };
  
      await createInventory(payload);
      alert('Stock successfully added to Store!');
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error creating inventory:', err);
      setError('Failed to add stock. Please check your input.');
    }
  };
  

  if (loading && open) return <p>Loading...</p>;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-to-store-modal-title">
      <Box sx={style}>
        <Typography id="add-to-store-modal-title" variant="h6" component="h2" gutterBottom>
          Add Stock to Store
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Produce"
            name="produce"
            value={formData.produce}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {produceList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <ListItemIcon>
                  <Avatar
                    src={
                      item.image
                        ? `${IMAGE_BASE_URL}${item.image}`
                        : `https://via.placeholder.com/40?text=${item.name.charAt(0)}`
                    }
                    alt={item.name}
                    sx={{ width: 32, height: 32 }}
                  />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Store"
            name="store"
            value={formData.store}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {storeList.map((store) => (
              <MenuItem key={store.id} value={store.id}>
                {store.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="number"
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={onClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Add to Store
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default AddToStoreModal;
