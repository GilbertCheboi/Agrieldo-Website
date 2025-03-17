import { useState, useEffect } from 'react';
import {
  fetchProduce,
  fetchOutlets,
  createInventory,
} from '../services/api';
import {
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Alert,
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

function TransferModal({ open, onClose, onSuccess, storeId }) {
  const [formData, setFormData] = useState({
    produce_id: '',
    quantity: '',
    outlet_id: '',
    created_at: '', // ✅ NEW FIELD
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

        setFormData(prev => ({
          ...prev,
          produce_id: produceRes.length > 0 ? produceRes[0].id : '',
          outlet_id: outletsRes.length > 0 ? outletsRes[0].id : '',
        }));
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load produce or outlets. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      setLoading(true);
      fetchData();
    }
  }, [open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.produce_id ||
      !formData.quantity ||
      !formData.outlet_id ||
      !storeId
    ) {
      setError('All fields are required, including store ID.');
      return;
    }

    try {
      const payload = {
        produce: parseInt(formData.produce_id),
        store: storeId,
        outlet: parseInt(formData.outlet_id),
        quantity: parseFloat(formData.quantity),
      };

      // ✅ Add created_at if user selected it
      if (formData.created_at) {
        payload.created_at = new Date(formData.created_at).toISOString();
      }

      await createInventory(payload);
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Transfer error:', err);
      setError(err.message || 'Failed to transfer stock. Please try again.');
    }
  };

  if (loading && open) return <p className="text-center mt-4">Loading...</p>;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="transfer-modal-title">
      <Box sx={style}>
        <Typography id="transfer-modal-title" variant="h6" gutterBottom>
          Transfer Stock to Outlet
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
            name="produce_id"
            value={formData.produce_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            {produceList.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
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
            inputProps={{ min: 0.01, step: 0.01 }}
          />

          <TextField
            select
            label="Destination Outlet"
            name="outlet_id"
            value={formData.outlet_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            {outlets.map(outlet => (
              <MenuItem key={outlet.id} value={outlet.id}>
                {outlet.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Date and Time (Optional)"
            type="datetime-local"
            name="created_at"
            value={formData.created_at}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

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
