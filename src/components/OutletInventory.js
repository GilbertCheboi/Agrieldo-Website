import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchOutletDetails, fetchDailyInventory } from '../services/api';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function OutletInventory() {
  const { id } = useParams();
  const [outlet, setOutlet] = useState(null);
  const [weeklyStock, setWeeklyStock] = useState({ dates: [], produceItems: [] });
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());
  const [weekOptions, setWeekOptions] = useState([]);
  const [weekDates, setWeekDates] = useState([]);
  const [loading, setLoading] = useState(true);

  function getCurrentWeek() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    return `${today.getFullYear()}-${weekNumber.toString().padStart(2, '0')}`;
  }

  function generateWeekOptions() {
    const weeks = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i * 7);
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
      const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
      weeks.push(`${date.getFullYear()}-${weekNumber.toString().padStart(2, '0')}`);
    }
    return weeks.reverse();
  }

  function getWeekDates(weekString) {
    const [year, week] = weekString.split('-');
    const firstDayOfYear = new Date(year, 0, 1);
    const daysOffset = (parseInt(week) - 1) * 7;
    const firstDayOfWeek = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset));
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay() + 1);
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const outletRes = await fetchOutletDetails(id);
        const dates = getWeekDates(selectedWeek);
        setWeekDates(dates);

        // Fetch inventory for each day
        const dailyPromises = dates.map(date => 
          fetchDailyInventory(date) // Assuming this endpoint accepts a date parameter
        );
        const dailyResponses = await Promise.all(dailyPromises);
        
        const produceMap = new Map();
        const stockByDate = dates.map((date, dateIndex) => {
          // Filter for this specific outlet (exclude null/Plateau)
          const dayData = dailyResponses[dateIndex].filter(item => 
            item.outlet && item.outlet.id === parseInt(id)
          );
          
          const quantities = {};
          dayData.forEach(item => {
            produceMap.set(item.produce.id, {
              id: item.produce.id,
              name: item.produce.name,
              unit: item.produce.unit,
              image: item.produce.image // Full URL from ImageField
            });
            quantities[item.produce.id] = item.quantity;
          });
          
          return { date, quantities };
        });

        setOutlet(outletRes);
        setWeeklyStock({
          dates: stockByDate,
          produceItems: Array.from(produceMap.values())
        });
        setWeekOptions(generateWeekOptions());
      } catch (error) {
        console.error('Error fetching outlet data:', error);
        setWeeklyStock({ dates: [], produceItems: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, selectedWeek]);

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  if (loading) return <p>Loading...</p>;
  if (!outlet) return <p>Outlet not found</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{outlet.name} Inventory</h1>
      
      <FormControl sx={{ mb: 4, minWidth: 200 }}>
        <InputLabel>Select Week</InputLabel>
        <Select
          value={selectedWeek}
          onChange={handleWeekChange}
          label="Select Week"
        >
          {weekOptions.map(week => (
            <MenuItem key={week} value={week}>
              Week {week.split('-')[1]} ({week.split('-')[0]})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {weeklyStock.dates.length === 0 || weeklyStock.produceItems.length === 0 ? (
        <p>No stock available for week {selectedWeek.split('-')[1]}</p>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              {weeklyStock.produceItems.map(produce => (
                <TableCell key={produce.id}>
                  <div style={{ textAlign: 'center' }}>
                    {produce.image && (
                      <img
                        src={produce.image}
                        alt={produce.name}
                        style={{ 
                          width: '50px', 
                          height: '50px', 
                          objectFit: 'cover', 
                          marginBottom: '5px' 
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div>{produce.name}</div>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {weeklyStock.dates.map(({ date, quantities }) => (
              <TableRow key={date}>
                <TableCell>{formatDate(date)}</TableCell>
                {weeklyStock.produceItems.map(produce => (
                  <TableCell key={produce.id}>
                    {quantities[produce.id] !== undefined 
                      ? `${Number(quantities[produce.id]).toFixed(2)} ${produce.unit}`
                      : `0.00 ${produce.unit}`}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default OutletInventory;