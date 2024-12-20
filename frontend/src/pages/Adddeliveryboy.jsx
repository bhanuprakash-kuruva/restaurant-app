
import React, { useState,useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Box, Container, TextField, Button, Typography, Input } from '@mui/material';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { useUser } from '../contextAPI/context';
import { useNavigate } from 'react-router-dom';
const AddDeliveryBoy = () => {
  const [newDeliveryBoy, setNewDeliveryBoy] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    status: 'available',
    rating: 0,
    completedOrders: 0,
    imageURL: '',
  });
  const {role} =useUser()
  const navigate = useNavigate()
  useEffect(()=>{
    if(role !=='ADMIN'){
      navigate('/needaccess')
    }
  },[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDeliveryBoy({
      ...newDeliveryBoy,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setNewDeliveryBoy({
      ...newDeliveryBoy,
      imageURL: e.target.files[0], // Get the selected image file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check that all required fields are populated
    // if (!newDeliveryBoy.email || !newDeliveryBoy.firstName || !newDeliveryBoy.lastName || !newDeliveryBoy.phone || !newDeliveryBoy.imageURL) {
    //   alert("Please fill all fields.");
    //   return;
    // }

    const formData = new FormData();
    formData.append('email', newDeliveryBoy.email);
    formData.append('firstName', newDeliveryBoy.firstName);
    formData.append('lastName', newDeliveryBoy.lastName);
    formData.append('phone', newDeliveryBoy.phone);
    formData.append('status', newDeliveryBoy.status);
    formData.append('rating', newDeliveryBoy.rating);
    formData.append('completedOrders', newDeliveryBoy.completedOrders);
    formData.append('imageURL', newDeliveryBoy.imageURL);

    try {
      const response = await fetch('https://restaurant-app-three-pied.vercel.app/deliveryboy/add', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add delivery boy');
      }

      const data = await response.json();
      alert('Delivery Boy added successfully!');
      setNewDeliveryBoy({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        status: 'available',
        rating: 0,
        completedOrders: 0,
        imageURL: '',
      });
    } catch (error) {
      console.error(error);
      alert('Failed to add delivery boy');
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm" sx={{ my: 3, borderRadius: '15px', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px', boxShadow: '2' }}>
        <DeliveryDiningIcon color="primary" />
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }} gutterBottom>
          Add Delivery Boy
        </Typography>

        {/* Delivery Boy Form */}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={newDeliveryBoy.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            name="firstName"
            value={newDeliveryBoy.firstName}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            name="lastName"
            value={newDeliveryBoy.lastName}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            name="phone"
            value={newDeliveryBoy.phone}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Rating (0-5)"
            variant="outlined"
            fullWidth
            name="rating"
            type="number"
            value={newDeliveryBoy.rating}
            onChange={handleChange}
            sx={{ mb: 2 }}
            inputProps={{ min: 0, max: 5 }}
          />
          <TextField
            label="Completed Orders"
            variant="outlined"
            fullWidth
            name="completedOrders"
            type="number"
            value={newDeliveryBoy.completedOrders}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          {/* File input for image upload */}
          <Input
            type="file"
            name="imageURL"
            onChange={handleImageChange}
            sx={{ mb: 2 }}
            required
          />

          <Box sx={{display:'flex',justifyContent:'center'}}>
          <Button type="submit" variant="contained" color="success" >
            Add Delivery Boy
          </Button>
          </Box>
        </form>
      </Container>
    </Layout>
  );
};

export default AddDeliveryBoy;
