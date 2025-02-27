
import React, { useState,useEffect } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import Layout from '../components/Layout/Layout';
import TapasIcon from '@mui/icons-material/Tapas';
import { useUser } from '../contextAPI/context';
import { useNavigate } from 'react-router-dom';
const AddItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    description: '',
    image: null, // Store the image file here
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // Get the selected image file
    });
  };
  const {role} =useUser()
  const navigate = useNavigate()
  useEffect(()=>{
    if(role !=='ADMIN'){
      navigate('/needaccess')
    }
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all required fields are filled
    const { name, category, price, description, image } = formData;
    if (!name || !category || !price || !description || !image) {
      alert('Please fill in all the required fields');
      return;
    }

    const newFormData = new FormData();
    newFormData.append('name', name);
    newFormData.append('category', category);
    newFormData.append('price', price);
    newFormData.append('description', description);
    newFormData.append('image', image); // Append the image file

    try {
      // Send the form data including the image file
      const response = await fetch('https://restaurant-app-three-pied.vercel.app/addItem', {
        method: 'POST',
        body: newFormData,
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      const data = await response.json();
      console.log('Item added successfully:', data);
      alert('Item added successfully!');
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item');
    }
  };

  return (
    <Layout>
        <Container maxWidth="sm" sx={{ my:3 ,borderRadius:'15px',p:2, display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',border:'2px', boxShadow:'2'}}>
        <TapasIcon color="goldenrod" />
      <Typography variant="h4" sx={{textAlign:'center',fontWeight:'bold'}} gutterBottom>
        Add Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Item Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button
                component="span"
                variant="outlined"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Upload Image
              </Button>
            </label>
          </Grid>
          <Grid item xs={6}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 2 }}
            >
              Add Item
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    </Layout>
  );
};

export default AddItem;
