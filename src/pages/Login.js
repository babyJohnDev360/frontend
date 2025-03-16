import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
        console.log(response);
        
        toast.success('Login successful!');
        // Store the token in local storage
        localStorage.setItem('authToken', response.token);
        // Redirect or perform other actions after successful login
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
    <Container component="main" maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={6} style={{ padding: '20px', marginTop: '20px', textAlign: 'center' }}>
          <Avatar style={{ margin: '10px auto', backgroundColor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Dummy Logo
          </Typography>
          <Typography component="h2" variant="h6">
            Welcome to Dummy App
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '10px' }}>
            <TextField
            size='small'
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                        size='small'

              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                        size='small'

              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: '20px 0 10px' }}
            >
              Sign In
            </Button>
          </form>
        </Paper>
        <ToastContainer />
      </Box>
    </Container>
  );
}

export default Login;