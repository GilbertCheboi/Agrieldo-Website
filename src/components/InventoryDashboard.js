import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPlateauInventory, fetchOutlets, fetchDailyInventory } from '../services/api';
import { Fab, Box, Tooltip, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoveIcon from '@mui/icons-material/ArrowForward';
import TransferModal from './TransferModal';
import AddToPlateauModal from './AddToPlateauModal';

function InventoryDashboard() {
  const [plateauStock, setPlateauStock] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [dailyStock, setDailyStock] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [openTransfer, setOpenTransfer] = useState(false);
  const [openAddToPlateau, setOpenAddToPlateau] = useState(false);

  const fetchData = async () => {
    try {
      const plateauRes = await fetchPlateauInventory();
      const outletsRes = await fetchOutlets();
      const dailyRes = await fetchDailyInventory(selectedDate);
      setPlateauStock(plateauRes);
      setOutlets(outletsRes);
      setDailyStock(dailyRes);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const handleOpenTransfer = () => setOpenTransfer(true);
  const handleCloseTransfer = () => setOpenTransfer(false);
  const handleOpenAddToPlateau = () => setOpenAddToPlateau(true);
  const handleCloseAddToPlateau = () => setOpenAddToPlateau(false);
  const handleSuccess = () => {
    fetchData();
    handleCloseTransfer();
    handleCloseAddToPlateau();
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Inventory Management Dashboard</h1>
      
      <TextField
        label="Select Date"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 4 }}
      />

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Plateau Stock (as of {selectedDate})</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dailyStock.filter(item => !item.outlet).map(item => (
            <div key={item.id} className="bg-white p-4 rounded shadow flex items-center">
              {item.produce.image && (
                <img
                  src={item.produce.image}
                  alt={item.produce.name}
                  className="w-16 h-16 object-cover mr-4 rounded"
                />
              )}
              <div>
                <h3 className="font-bold">{item.produce.name}</h3>
                <p>{item.quantity} {item.produce.unit}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Outlets (as of {selectedDate})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {outlets.map(outlet => (
            <Link to={`/inventory/outlet/${outlet.id}`} key={outlet.id} className="bg-white p-4 rounded shadow hover:bg-gray-50">
              <h3 className="font-bold">{outlet.name}</h3>
              <p>Total Stock: {dailyStock
                .filter(item => item.outlet && item.outlet.id === outlet.id)
                .reduce((sum, item) => sum + item.quantity, 0)} units</p>
            </Link>
          ))}
        </div>
      </section>

      <Box sx={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Tooltip title="Transfer Stock">
          <Fab color="primary" aria-label="transfer" onClick={handleOpenTransfer}>
            <MoveIcon />
          </Fab>
        </Tooltip>
        <Tooltip title="Add to Plateau">
          <Fab color="primary" aria-label="add" onClick={handleOpenAddToPlateau}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>

      <TransferModal open={openTransfer} onClose={handleCloseTransfer} onSuccess={handleSuccess} />
      <AddToPlateauModal open={openAddToPlateau} onClose={handleCloseAddToPlateau} onSuccess={handleSuccess} />
    </div>
  );
}

export default InventoryDashboard;