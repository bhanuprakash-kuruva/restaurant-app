import React from 'react';
import Layout from '../components/Layout/Layout';
import { Box, Typography, Button, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

const Needaccess = () => {
  const navigate = useNavigate()

  const handleRedirectToLogin = () => {
    navigate('/signin') // Redirect to login page
  };

  return (
    <Layout>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: '5rem', color: 'error.main', mb: 2 }} />
        <Typography variant="h4" color="error" sx={{ mb: 2 }}>
          Page Not Found
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          The page you're looking for does not exist. You don't have access to the page.
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={handleRedirectToLogin}
          sx={{ width: '200px', fontWeight: 'bold' }}
        >
          Log In
        </Button>
      </Container>
    </Layout>
  );
};

export default Needaccess;

