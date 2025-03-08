import { useState, useEffect } from 'react';
import { fetchProduce, createInventory } from '../services/api';
import { Modal, Box, TextField, Button, MenuItem, Typography, Alert } from '@mui/material';

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

function AddToPlateauModal({ open, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    produce_id: '',
    quantity: '',
  });
  const [produceList, setProduceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produceRes = await fetchProduce();
        setProduceList(produceRes);
        if (produceRes.length > 0) setFormData({ ...formData, produce_id: produceRes[0].id });
      } catch (error) {
        console.error('Error fetching produce:', error);
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
      await createInventory({
        produce_id: formData.produce_id,
        outlet_id: null,
        quantity: parseFloat(formData.quantity),
      });
      alert('Stock added to Plateau!');
      onSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading && open) return <p>Loading...</p>;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-to-plateau-modal-title">
      <Box sx={style}>
        <Typography id="add-to-plateau-modal-title" variant="h6" component="h2" gutterBottom>
          Add Stock to Plateau
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Produce"
            name="produce_id"
            value={formData.produce_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {produceList.map(item => (
              <MenuItem key={item.id} value={item.id}>
                <div className="flex items-center">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 object-cover mr-2 rounded"
                    />
                  )}
                  {item.name}
                </div>
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
              Add to Plateau
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default AddToPlateauModal;