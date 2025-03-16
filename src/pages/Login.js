import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Avatar, IconButton, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiService from '../api/apiService';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate =useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Please enter your email.');
      valid = false;
    }

    if (!password) {
      setPasswordError('Please enter your password.');
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await apiService.login(email, password);
      if (response.status) {
        toast.success('Login successful!');
        // Store the token in local storage
        localStorage.setItem('authToken', response.token);
        // Redirect to the home page after successful login
        navigate('/home');
      } else {
        if (response.message.toLowerCase().includes('email')) {
          setEmailError(response.message);
        } else {
          setPasswordError(response.message);
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const message = error.response.data.message || 'Invalid email or password.';
        if (message.toLowerCase().includes('email')) {
          setEmailError(message);
        } else {
          setPasswordError(message);
        }
      } else {
        toast.error('An error occurred. Please try again.');
      }
      console.error('Login error:', error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
              size="small"
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
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              size="small"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              size="small"
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