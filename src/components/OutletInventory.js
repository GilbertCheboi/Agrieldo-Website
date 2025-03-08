import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchOutletInventory, fetchOutletDetails, fetchDailyInventory } from '../services/api';
import { TextField } from '@mui/material';

function OutletInventory() {
  const { id } = useParams();
  const [outlet, setOutlet] = useState(null);
  const [dailyStock, setDailyStock] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const outletRes = await fetchOutletDetails(id);
        const dailyRes = await fetchDailyInventory(selectedDate);
        setOutlet(outletRes);
        setDailyStock(dailyRes.filter(item => item.outlet && item.outlet.id === parseInt(id)));
      } catch (error) {
        console.error('Error fetching outlet data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (!outlet) return <p>Outlet not found</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{outlet.name} Inventory</h1>
      
      <TextField
        label="Select Date"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 4 }}
      />

      {dailyStock.length === 0 ? (
        <p>No stock available on {selectedDate}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dailyStock.map(item => (
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
      )}
    </div>
  );
}

export default OutletInventory;