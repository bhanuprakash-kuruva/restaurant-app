
import React, { useState } from 'react';
import TapasIcon from '@mui/icons-material/Tapas';
import { Box, TextField, Typography, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Checkbox } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Layout from '../components/Layout/Layout';
import SignupImage from '../assets/signup.webp'
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    mobileNumber: '',
    address: '',
    pincode: ''
  });

  const navigate = useNavigate(); // Move useNavigate hook here

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formValues.firstName || !formValues.lastName || !formValues.email || !formValues.password || !formValues.age || !formValues.mobileNumber || !formValues.address || !formValues.pincode) {
      alert('Please fill out all fields!');
    } else if (!acceptTerms) {
      alert('You must accept the terms and conditions to proceed.');
    } else if (!validateEmail(formValues.email)) {
      alert('Please enter a valid email address');
    } else if (!validatePassword(formValues.password)) {
      alert('Password must be at least 8 characters long');
    } else {
      const userData = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
        age: formValues.age,
        mobileNumber: formValues.mobileNumber,
        address: formValues.address,
        pincode: formValues.pincode
      };

      try {
        console.log(userData)
        const response = await fetch('http://localhost:8071/customer/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          console.log(response)
          const result = await response.json();
          navigate('/signin'); 
          alert(result.message); // The server is returning a success message
          // Use navigate to redirect to sign-in page after successful signup
        } else {
          // This handles the case where the server responds with an error status
          const errorData = await response.json();
          alert(errorData.message || 'Error occurred while signing up.');
        }
      } catch (error) {
        // This block handles network errors
        console.error('Error during sign-up:', error);
        alert('Network error. Please try again.');
      }

      // Reset form fields
      setFormValues({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        age: '',
        mobileNumber: '',
        address: '',
        pincode: ''
      });
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleTermsChange = (event) => {
    setAcceptTerms(event.target.checked);
  };

  return (
    <Layout>
      {/* <Box sx={{minHeight: '100vh',
          backgroundImage: `url(${SignupImage})`, // Set background image
          backgroundSize: 'cover', // Ensure the image covers the entire container
          backgroundPosition: 'center', // Center the background image
          backgroundAttachment: 'fixed',}}> */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3, }}>
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
            backgroundColor: '#fff',
          }}
        >
          <TapasIcon color="goldenrod" />
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Sign Up
          </Typography>
          <Typography>
            Already have an account? <Link to="/signin" style={{ cursor: 'pointer' }}>Sign In</Link>
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, width: '100%' }}>
            <TextField
              id="first-name"
              label="First Name"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              id="last-name"
              label="Last Name"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>
          <TextField
            id="email"
            label="Enter Your Email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formValues.password}
              onChange={handleChange}
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
          </FormControl>
          <TextField
            id="age"
            label="Enter Your Age"
            name="age"
            value={formValues.age}
            onChange={handleChange}
            type="number"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            id="mobile-number"
            label="Enter Mobile Number"
            name="mobileNumber"
            value={formValues.mobileNumber}
            onChange={handleChange}
            type="tel"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            id="address"
            label="Address"
            name="address"
            value={formValues.address}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <TextField
            id="pincode"
            label="Pincode"
            name="pincode"
            value={formValues.pincode}
            onChange={handleChange}
            type="number"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Checkbox
              checked={acceptTerms}
              onChange={handleTermsChange}
              color="primary"
            />
            <Typography variant="body2" component="p">
              I accept the{' '}
              <Link href="/tandc" color="primary" underline="hover">
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleSubmit}
            disabled={!acceptTerms} // Disable button if terms are not accepted
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      {/* </Box> */}
    </Layout>
  );
};

export default Signup;
