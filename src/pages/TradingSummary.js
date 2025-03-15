import React, { useState, useEffect } from 'react';
import Loader from '../components/common/Loader';

function TradingSummary() {
  const [loading, setLoading] = useState(true);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    // Simulate a fetch call to get trading summaries
    setTimeout(() => {
      // This is where you would fetch your trading summaries data
      setTrades([
        { id: 1, stock: 'AAPL', buyPrice: 150, sellPrice: 155, volume: 10 },
        { id: 2, stock: 'GOOGL', buyPrice: 2500, sellPrice: 2520, volume: 5 },
        // Add more trades as needed
      ]);
      setLoading(false);
    }, 2000); // Simulate a 2-second delay for fetching data
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Trading Summary</h2>
      <ul>
        {trades.map(trade => (
          <li key={trade.id}>
            {trade.stock}: Bought at ${trade.buyPrice}, Sold at ${trade.sellPrice}, Volume: {trade.volume}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TradingSummary;