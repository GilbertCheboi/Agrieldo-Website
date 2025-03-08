import { useState, useEffect } from 'react';
import { fetchProduce, fetchOutlets, createInventory } from '../services/api';
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

function TransferModal({ open, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    produce_id: '',
    quantity: '',
    outlet_id: '',
  });
  const [produceList, setProduceList] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produceRes = await fetchProduce();
        const outletsRes = await fetchOutlets();
        setProduceList(produceRes);
        setOutlets(outletsRes);
        if (produceRes.length > 0) setFormData({ ...formData, produce_id: produceRes[0].id });
        if (outletsRes.length > 0) setFormData({ ...formData, outlet_id: outletsRes[0].id });
      } catch (error) {
        console.error('Error fetching data:', error);
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
        outlet_id: formData.outlet_id,
        quantity: parseFloat(formData.quantity),
      });
      alert('Transfer successful!');
      onSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading && open) return <p>Loading...</p>;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="transfer-modal-title">
      <Box sx={style}>
        <Typography id="transfer-modal-title" variant="h6" component="h2" gutterBottom>
          Transfer Stock from Plateau
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
          <TextField
            select
            label="Destination Outlet"
            name="outlet_id"
            value={formData.outlet_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {outlets.map(outlet => (
              <MenuItem key={outlet.id} value={outlet.id}>
                {outlet.name}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={onClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Transfer
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default TransferModal;