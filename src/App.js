import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './pages/Home';
import ProfileManagement from './pages/ProfileManagement';
import TradingSummary from './pages/TradingSummary';
import Transactions from './pages/Transactions';
import WithdrawalStatus from './pages/WithdrawalStatus';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="*"
          element={
            <>
              <Header />
              <Box my={2}>
                <Routes>
                  <Route path="/profile-management" element={<ProfileManagement />} />
                  <Route path="/trading-summary" element={<TradingSummary />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/withdrawal-status" element={<WithdrawalStatus />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </Box>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;