import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProfileManagement from './pages/ProfileManagement';
import TradingSummary from './pages/TradingSummary';
import Transactions from './pages/Transactions';
import WithdrawalStatus from './pages/WithdrawalStatus';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile-management">Profile Management</Link></li>
          <li><Link to="/trading-summary">Trading Summary</Link></li>
          <li><Link to="/transactions">Transactions</Link></li>
          <li><Link to="/withdrawal-status">Withdrawal Status</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/profile-management" element={<ProfileManagement />} />
        <Route path="/trading-summary" element={<TradingSummary />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/withdrawal-status" element={<WithdrawalStatus />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;