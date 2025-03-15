import React, { useState, useEffect } from 'react';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Select, MenuItem } from '@mui/material';
import Loader from '../components/common/Loader';
import apiService from '../api/apiService';

function Transactions() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await apiService.listUsers(); // Assuming transactions are part of the user list for simplicity
      setTransactions(response?.users);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
    setLoading(false);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTransactions = transactions.filter(transaction => filter === 'all' || transaction.type.toLowerCase() === filter);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Typography variant="h5">Transactions</Typography>
      <Select value={filter} onChange={handleFilterChange}>
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="deposit">Deposits</MenuItem>
        <MenuItem value="withdrawal">Withdrawals</MenuItem>
      </Select>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTransactions.map(transaction => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>${transaction.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary">Export Report</Button>
    </div>
  );
}

export default Transactions;