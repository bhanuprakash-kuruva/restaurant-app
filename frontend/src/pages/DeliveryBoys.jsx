import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const DeliveryBoys = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);

  // Fetch the list of delivery boys when the component mounts
  useEffect(() => {
    const fetchDeliveryBoys = async () => {
      try {
        const response = await fetch('http://localhost:8011/deliveryboy/show');
        if (!response.ok) {
          throw new Error('Failed to fetch delivery boy details');
        }
        const data = await response.json();
        console.log(data)
        setDeliveryBoys(data.deliverboys); // Assuming the response contains an array of delivery boys
      } catch (error) {
        console.error(error);
      }
    };
    fetchDeliveryBoys();
  }, []);

  return (
    <Layout>
      <Box sx={{ textAlign: 'center', py: 5, bgcolor: '#f7f7f7' }}>
        <Typography variant="h4" sx={{fontWeight:'bold'}} gutterBottom>
          Delivery Boys
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Our dedicated delivery boys ensure that your orders reach you on time.
        </Typography>
      </Box>

      {/* Display Delivery Boys */}
      <Grid container spacing={4} sx={{ p: 4 }}>
        {deliveryBoys.map((db) => (
          <Grid item xs={12} sm={6} md={4} key={db._id}>
            <Card sx={{ maxWidth: 345, mx: 'auto', boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:8011${db.imageURL}`}
                alt={`${db.firstName} ${db.lastName}`}
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {db.firstName} {db.lastName}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#f39c12' }}>
                    <StarIcon />
                    <Typography variant="body1" sx={{ ml: 0.5 }}>
                      {db.rating}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  <strong>Status:</strong> {db.status}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Completed Orders:</strong> {db.completedOrders.length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Phone:</strong> {db.phone}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default DeliveryBoys;
