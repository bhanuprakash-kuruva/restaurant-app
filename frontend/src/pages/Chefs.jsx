
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
  Input,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';

const Chefs = () => {
  const [chef, setChef] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newChef, setNewChef] = useState({
    name: '',
    speciality: '',
    experience: '',
    rating: 0,
    description: '',
    image: null, // Initially set to null
  });

  // Fetch the list of chefs when the component mounts
  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await fetch('http://localhost:8011/chef/showchefs');
        if (!response.ok) {
          throw new Error('Failed to fetch chef details');
        }
        const data = await response.json();
        setChef(data.chef); // Assuming the response contains an array of chefs
      } catch (error) {
        console.error(error);
      }
    };
    fetchChefs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewChef({
      ...newChef,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setNewChef({
      ...newChef,
      image: e.target.files[0], // Get the selected image file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check that all required fields are populated
    if (!newChef.name || !newChef.speciality || !newChef.experience || !newChef.rating || !newChef.image || !newChef.description) {
      alert("Please fill all fields.");
      return;
    }
    
    const formData = new FormData();
    formData.append('name', newChef.name);
    formData.append('speciality', newChef.speciality);
    formData.append('experience', newChef.experience);
    formData.append('rating', newChef.rating);
    formData.append('description', newChef.description);
    formData.append('image', newChef.image);

    try {
      const response = await fetch('http://localhost:8011/chef/addchef', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add chef');
      }

      const data = await response.json();
      setChef((prev) => [...prev, data.chef]); // Add new chef to the list

      setOpenModal(false);
      setNewChef({
        name: '',
        speciality: '',
        experience: '',
        rating: 0,
        description: '',
        image: null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Box sx={{ textAlign: 'center', py: 5, bgcolor: '#f7f7f7' }}>
        <Typography variant="h3" gutterBottom>
          Meet Our Chefs
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Our talented chefs bring the best of culinary artistry to your table.
        </Typography>
      </Box>

      

      {/* Display Chefs */}
      <Grid container spacing={4} sx={{ p: 4 }}>
        {chef.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c._id}>
            <Card sx={{ maxWidth: 345, mx: 'auto', boxShadow: 3 }}>
              <CardMedia component="img" height="200" image={`http://localhost:8011${c.imageURL}`} alt={c.name} />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {c.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#f39c12' }}>
                    <StarIcon />
                    <Typography variant="body1" sx={{ ml: 0.5 }}>
                      {c.rating}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  <strong>Specialty:</strong> {c.speciality}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Experience:</strong> {c.experience} years
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                  {c.description}
                </Typography>
                {/* <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  View More
                </Button> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Chefs;
