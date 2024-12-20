
import React, { useState } from 'react';
import TapasIcon from '@mui/icons-material/Tapas';
import { Box, TextField, Typography, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Layout from '../components/Layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contextAPI/context';
import backImg from '../assets/signup.webp'
const Signin = () => {
  const { login,log } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // To hold error message for Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false); // Control Snackbar visibility

  // Email validation
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Password validation (simple example for minimum length)
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Input validations
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      setOpenSnackbar(true);
      return;
    } else if (!validatePassword(password)) {
      setError('Password must be at least 8 characters');
      setOpenSnackbar(true);
      return;
    }
    console.log(user)
    // Sending request to sign in
    try {
      const response = await fetch('https://restaurant-app-three-pied.vercel.app/customer/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password,user }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error during sign-in');
        setOpenSnackbar(true);
        return;
      }

      const data = await response.json();
      console.log('Success:', data);
      login(email); // Call login to update user state
      log(data.role) 
      navigate('/menu');
      
      // Clear the form after successful login
      setEmail('');
      setPassword('');
      setUser('');
    } catch (error) {
      console.error('Error:', error);
      setError('Network error. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Layout>
      <Box sx={{backgroundImage:`url${backImg}`,backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            maxWidth: 400,
            width: '100%',
          }}
        >
          <TapasIcon color="goldenrod" />
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Sign In
          </Typography>
          <TextField
            id="outlined-email"
            label="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <TextField
              id="outlined-user-type"
              label="Enter User Type"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ my: 2 }}
            />
            <Typography sx={{ mt: 1 }}>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </Typography>
          </FormControl>
          <Button variant="contained" color="success" onClick={handleSubmit} fullWidth>
            Sign In
          </Button>
        </Box>
      </Box>
      </Box>
      

      {/* Snackbar for error handling */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Signin;
