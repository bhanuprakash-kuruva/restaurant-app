
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Container, CardMedia, CssBaseline, Grid, Typography, Button, CircularProgress, Snackbar, Alert, CardActions } from '@mui/material';
import Layout from '../components/Layout/Layout';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import { Link,useNavigate } from 'react-router-dom';
import AdminImg from '../assets/admin.avif';
import ItemImg from '../assets/item.webp'
import AnalyticsImg from '../assets/adminanalytics.webp'
import AdminChefImg from '../assets/adminchef.avif';
import deliveryImg from '../assets/delivery.avif'
import { useUser } from '../contextAPI/context';

function AdminPage() {
  const [chefs, setChefs] = useState([]);
  const [items, setItems] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const {role} =useUser()
  const navigate = useNavigate()
  useEffect(()=>{
    if(role !=='ADMIN'){
      navigate('/needaccess')
    }
  },[])
  // Fetch chefs and items data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch chefs data
        const chefsResponse = await fetch('https://restaurant-app-three-pied.vercel.app/chef/showchefs');
        if (!chefsResponse.ok) throw new Error('Failed to fetch chefs data');
        const chefsData = await chefsResponse.json();
        setChefs(chefsData.chef);
        console.log(chefs)
        // Fetch items data
        const itemsResponse = await fetch('https://restaurant-app-three-pied.vercel.app/item/menu-items');
        if (!itemsResponse.ok) throw new Error('Failed to fetch items data');
        const itemsData = await itemsResponse.json();
        setItems(itemsData);
        console.log(items)

        const deliveryBoyResponse = await fetch('https://restaurant-app-three-pied.vercel.app/deliveryboy/show')
        if (!deliveryBoyResponse) throw new Error('Failed to fetch delivery boys')
        const deliveryBoysData = await deliveryBoyResponse.json()
        setDeliveryBoys(deliveryBoysData.deliverboys)
        console.log(deliveryBoys)
        setLoading(false);
      } catch (err) {
        console.error('Error occurred while fetching data:', err);
        setError('Failed to load data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://restaurant-app-three-pied.vercel.app/catering/getEvents');
        if (response.ok) {
          const data = await response.json();
          setEventsData(data.events);
        } else {
          const error = await response.json();
          alert("Error occurred", error.message);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);
  // Handle loading state
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress size={80} />
        <Typography variant="h6" color="textSecondary" mt={2}>
          Loading data...
        </Typography>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Snackbar open={true} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    );
  }

  return (
    <Layout>
      <Box sx={{ display: 'flex', color: 'white', backgroundImage: `url(${AdminImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <CssBaseline />

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 3,
          }}
        >
          <Container>
            {/* Welcome Message and Restaurant Stats */}
            <Box mb={4}>
              <Typography variant="h4" gutterBottom>
                Welcome to the Admin Dashboard
              </Typography>
              <Typography variant="h6">
                Here’s a quick overview of the restaurant’s current status:
              </Typography>
              <Grid container spacing={3} mt={2}>
                {/* Active Chefs Card */}
                <Grid item xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      minHeight: 180,
                      boxShadow: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'scale(1.05)',
                        transition: 'all 0.3s ease-in-out',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{fontWeight:'bold'}}>Active Chefs</Typography>
                      <Typography variant="h5">{chefs.length}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        The number of chefs currently working in the restaurant.
                      </Typography>
                      <CardActions>
                        <Link to={'/chefs'}>
                          <Button variant="contained" color="success">
                            View Chefs
                          </Button>
                        </Link>
                      </CardActions>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Total Items Card */}
                <Grid item xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      minHeight: 180,
                      boxShadow: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'scale(1.05)',
                        transition: 'all 0.3s ease-in-out',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{fontWeight:'bold'}}>Total Food Items</Typography>
                      <Typography variant="h5">{items.length}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        The total number of food items listed in the restaurant menu.
                      </Typography>
                      <CardActions>
                        <Link to={'/menu'}>
                          <Button variant="contained" color="success">
                            View Menu
                          </Button>
                        </Link>
                      </CardActions>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Delivery Boys Card */}
                <Grid item xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      minHeight: 180,
                      boxShadow: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'scale(1.05)',
                        transition: 'all 0.3s ease-in-out',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{fontWeight:'bold'}}>Delivery Boys</Typography>
                      <Typography variant="h5">{deliveryBoys.length}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        The number of delivery boys currently working in the restaurant.
                      </Typography>
                      <CardActions>
                        <Link to={'/deliveryboys'}>
                          <Button variant="contained" color="success">
                            View Delivery Boys
                          </Button>
                        </Link>
                      </CardActions>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      minHeight: 180,
                      boxShadow: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'scale(1.05)',
                        transition: 'all 0.3s ease-in-out',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{fontWeight:'bold'}}>Catering Services</Typography>
                      <Typography variant="h5">{eventsData.length}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        The number of catering events to be completed by the restaurant.
                      </Typography>
                      <CardActions>
                        <Link to={'/events'}>
                          <Button variant="contained" color="success">
                            View Catering Events
                          </Button>
                        </Link>
                      </CardActions>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>


            {/* Admin Action Cards */}
            <Grid container spacing={3} mt={4}>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    maxHeight: 350,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'scale(1.05)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  <CardMedia sx={{ minHeight: '80px' }} component="img" src={`${ItemImg}`} alt="item image" />
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                      Add Item
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={2}>
                      Add a new food item to the restaurant menu.
                    </Typography>
                    <Link to={'/additem'}>
                      <Button
                        variant="contained"
                        color="warning"
                        startIcon={<RamenDiningIcon />}
                        sx={{
                          mx: 2,
                          my: 1,
                          textTransform: 'none',
                          fontWeight: 'bold',
                          width: '180px',
                          '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.1)' },
                          transition: 'background-color 0.3s ease',
                        }}
                      >
                        Add Food Item
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    minHeight: 180,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'scale(1.05)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  <CardMedia sx={{ minHeight: '100px' }} component="img" src={`${AdminChefImg}`} alt="chef image" />
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                      Add Chef
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={2}>
                      Add a new chef to manage the kitchen and create new dishes.
                    </Typography>
                    <Link to={'/addchef'}>
                      <Button variant="contained" color="secondary">
                        Add New Chef
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    minHeight: 180,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'scale(1.05)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  <CardMedia sx={{ minHeight: '100px' }} component="img" src={`${deliveryImg}`} alt="delivery image" />
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                      Add Delivery Boy
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={2}>
                      Assign a delivery boy to handle customer orders.
                    </Typography>
                    <Link to={'/adddeliveryboy'}>
                      <Button variant="contained" color="success">
                        Add Delivery Boy
                      </Button></Link>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    minHeight: 350,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'scale(1.05)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  <CardMedia sx={{ minHeight: '100px' }} component="img" src={`${AnalyticsImg}`} alt="analytics" />
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                      Analytics
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={2}>
                      View detailed restaurant analytics and performance data.
                    </Typography>
                    <Link to={'/analytics'}>
                      <Button variant="contained" color="error">
                        View Analytics
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Layout>
  );
}

export default AdminPage;
