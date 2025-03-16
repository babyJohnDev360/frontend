import React, { useState, useEffect } from 'react';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import Loader from '../components/common/Loader';
import apiService from '../api/apiService';

function TradingSummary() {
  const [loading, setLoading] = useState(true);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    setLoading(true);
    try {
      const response = await apiService.getFund();
      setTrades(response?.data);
    } catch (error) {
      console.error('Error fetching trades:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }
console.log(trades,'vs');

  return (
    <div>
      <Typography variant="h5">Trading Summary</Typography>
      {trades.length === 0 ? (
        <Box mt={2}>
          <Typography variant="subtitle1">No records found</Typography>
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Stock</TableCell>
              <TableCell>Buy Price</TableCell>
              <TableCell>Sell Price</TableCell>
              <TableCell>Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trades?.length>0 && trades.map(trade => (
              <TableRow key={trade.id}>
                <TableCell>{trade.stock}</TableCell>
                <TableCell>{trade.buyPrice}</TableCell>
                <TableCell>{trade.sellPrice}</TableCell>
                <TableCell>{trade.volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default TradingSummary;