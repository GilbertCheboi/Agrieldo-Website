import { useEffect, useState } from 'react';
import {
  fetchStoreInventory,
  fetchOutlets,
  fetchProduce,
} from '../services/api';
import {
  Fab,
  Box,
  Tooltip,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Avatar,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoveIcon from '@mui/icons-material/ArrowForward';
import DownloadIcon from '@mui/icons-material/Download';
import TransferModal from './TransferModal';
import AddToStoreModal from './AddToStoreModal ';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';

const IMAGE_BASE_URL = 'https://api.agrieldo.com';

function InventoryDashboard() {
  const [storeStock, setStoreStock] = useState([]);
  const [storeId, setStoreId] = useState(null);
  const [outlets, setOutlets] = useState([]);
  const [produceItems, setProduceItems] = useState([]);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [openTransfer, setOpenTransfer] = useState(false);
  const [openAddToStore, setOpenAddToStore] = useState(false);

  const fetchData = async () => {
    try {
      const [storeRes, outletRes, produceRes] = await Promise.all([
        fetchStoreInventory(startDate, endDate),
        fetchOutlets(),
        fetchProduce(),
      ]);

      setStoreStock(storeRes);
      if (storeRes.length > 0) {
        setStoreId(storeRes[0].store?.id || storeRes[0].store);
      }

      setOutlets(outletRes);
      setProduceItems(produceRes);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const handleOpenTransfer = () => setOpenTransfer(true);
  const handleCloseTransfer = () => setOpenTransfer(false);
  const handleOpenAddToStore = () => setOpenAddToStore(true);
  const handleCloseAddToStore = () => setOpenAddToStore(false);

  const handleSuccess = () => {
    fetchData();
    handleCloseTransfer();
    handleCloseAddToStore();
  };

  const getStockQuantity = (produceId, outletId = null) => {
    const filtered = storeStock.filter((item) => {
      const itemProduceId = item.produce?.id || item.produce;
      const isProduceMatch = itemProduceId === produceId;

      if (outletId !== null) {
        const itemOutletId = item.outlet?.id || item.outlet;
        return isProduceMatch && itemOutletId === outletId;
      } else {
        return isProduceMatch && (!item.outlet || item.outlet === null);
      }
    });

    const total = filtered.reduce((sum, i) => sum + i.quantity, 0);
    return total;
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Inventory Report (${startDate} to ${endDate})`, 14, 15);

    const tableColumn = ['Produce Item', 'Store Stock', ...outlets.map(outlet => outlet.name)];
    const tableRows = [];

    produceItems.forEach((produce) => {
      const rowData = [
        produce.name,
        getStockQuantity(produce.id),
        ...outlets.map((outlet) => getStockQuantity(produce.id, outlet.id)),
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save(`inventory_report_${startDate}_to_${endDate}.pdf`);
  };

  const handleDownloadCSV = () => {
    const csvData = produceItems.map((produce) => {
      const row = {
        'Produce Item': produce.name,
        'Store Stock': getStockQuantity(produce.id),
      };
      outlets.forEach((outlet) => {
        row[outlet.name] = getStockQuantity(produce.id, outlet.id);
      });
      return row;
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `inventory_report_${startDate}_to_${endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p>Loading inventory...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Inventory Management Dashboard</h1>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      {/* Download Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDownloadCSV}
        >
          Download CSV
        </Button>
      </Box>

      <Paper sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Produce Item</strong></TableCell>
              <TableCell><strong>Store Stock</strong></TableCell>
              {outlets.map((outlet) => (
                <TableCell key={outlet.id}><strong>{outlet.name}</strong></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {produceItems.map((produce) => (
              <TableRow key={produce.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar
                      src={
                        produce.image
                          ? `${IMAGE_BASE_URL}${produce.image}`
                          : `https://via.placeholder.com/40?text=${produce.name.charAt(0)}`
                      }
                      alt={produce.name}
                      sx={{ width: 40, height: 40 }}
                    />
                    {produce.name}
                  </Box>
                </TableCell>
                <TableCell>{getStockQuantity(produce.id)}</TableCell>
                {outlets.map((outlet) => (
                  <TableCell key={outlet.id}>
                    {getStockQuantity(produce.id, outlet.id)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Floating Action Buttons */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Tooltip title="Transfer Stock">
          <Fab color="primary" aria-label="transfer" onClick={handleOpenTransfer}>
            <MoveIcon />
          </Fab>
        </Tooltip>
        <Tooltip title="Add to Store">
          <Fab color="secondary" aria-label="add" onClick={handleOpenAddToStore}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>

      {/* Modals */}
      <TransferModal
        open={openTransfer}
        onClose={handleCloseTransfer}
        onSuccess={handleSuccess}
        storeId={storeId}
      />

      <AddToStoreModal
        open={openAddToStore}
        onClose={handleCloseAddToStore}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

export default InventoryDashboard;
