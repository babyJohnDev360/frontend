import React, { useState, useEffect } from 'react';
import Loader from '../components/common/Loader';

function Transactions() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Simulate a fetch call to get transactions
    setTimeout(() => {
      // This is where you would fetch your transactions data
      setTransactions([
        { id: 1, type: 'Deposit', amount: 1000, date: '2025-03-01' },
        { id: 2, type: 'Withdrawal', amount: 500, date: '2025-03-02' },
        // Add more transactions as needed
      ]);
      setLoading(false);
    }, 2000); // Simulate a 2-second delay for fetching data
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.date}: {transaction.type} of ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;