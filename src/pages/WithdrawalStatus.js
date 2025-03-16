import React, { useState, useEffect } from 'react';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Alert } from '@mui/material';
import Loader from '../components/common/Loader';
import apiService from '../api/apiService';

function WithdrawalStatus() {
  const [loading, setLoading] = useState(true);
  const [withdrawals, setWithdrawals] = useState([]);
  const [balancePayable, setBalancePayable] = useState(0);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const response = await apiService.getFund(); // Assuming withdrawals are part of the fund data for simplicity
      setWithdrawals(response?.data);
      setBalancePayable(0); // Set the balance payable as needed
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
    }
    setLoading(false);
  };

  const handleApprove = async (id) => {
    // Handle approve logic
  };

  const handleReject = async (id) => {
    try {
      await apiService.removeFund(id);
      fetchWithdrawals();
    } catch (error) {
      console.error('Error rejecting withdrawal:', error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Typography variant="h5">Withdrawal Status</Typography>
      {balancePayable > 0 && (
        <Alert severity="error">Withdrawal Rejected: Unpaid Service Fees!</Alert>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {withdrawals?.length>0 && withdrawals.map(withdrawal => (
            <TableRow key={withdrawal.id}>
              <TableCell>{withdrawal.date}</TableCell>
              <TableCell>${withdrawal.amount}</TableCell>
              <TableCell>{withdrawal.status}</TableCell>
              <TableCell>
                <Button variant="contained" color="success" onClick={() => handleApprove(withdrawal.id)}>Approve</Button>
                <Button variant="contained" color="error" onClick={() => handleReject(withdrawal.id)}>Reject</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default WithdrawalStatus;