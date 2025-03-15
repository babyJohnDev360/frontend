import React, { useState, useEffect } from 'react';
import Loader from '../components/common/Loader';

function WithdrawalStatus() {
  const [loading, setLoading] = useState(true);
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    // Simulate a fetch call to get withdrawal status
    setTimeout(() => {
      // This is where you would fetch your withdrawal status data
      setWithdrawals([
        { id: 1, amount: 1000, status: 'Approved', date: '2025-03-01' },
        { id: 2, amount: 500, status: 'Pending', date: '2025-03-02' },
        // Add more withdrawals as needed
      ]);
      setLoading(false);
    }, 2000); // Simulate a 2-second delay for fetching data
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Withdrawal Status</h2>
      <ul>
        {withdrawals.map(withdrawal => (
          <li key={withdrawal.id}>
            {withdrawal.date}: ${withdrawal.amount} - {withdrawal.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WithdrawalStatus;