import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiService from '../api/apiService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const response = await apiService.login(email, password);
      if (response.status) {
        toast.success('Login successful!');
        // Handle successful login (redirect, save token, etc.)
      } else {
        toast.error(response.message || 'Invalid email or password.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Invalid email or password.');
      } else {
        toast.error('An error occurred. Please try again.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '16px' }}
          >
            Login
          </Button>
        </form>
        <ToastContainer />
      </Box>
    </Container>
  );
}

export default Login;