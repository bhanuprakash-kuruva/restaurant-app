



import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import StarIcon from '@mui/icons-material/Star';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LogoutIcon from '@mui/icons-material/Logout';
import { useUser } from '../contextAPI/context';
import {
  TextField,
  Checkbox,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
  FormControlLabel
} from '@mui/material';
import { Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { Link, useNavigate } from 'react-router-dom';

const Menu = () => {
  const { email, logout } = useUser();
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]); // State to store fetched menu items
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const [tabValue, setTabValue] = useState('1'); // Initializing tabValue for TabContext
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const handleAccount = () => {

    navigate('/profile')
    // window.location.href('/profile')
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('https://restaurant-app-three-pied.vercel.app//item/menu-items'); // Replace with your backend API
        if (response.ok) {
          const data = await response.json();
          setMenuItems(data); // Update state with fetched menu items
        } else {
          console.error('Failed to fetch menu items');
        }
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleCheckboxChange = (menuId, price) => {
    setSelectedItems((prev) => {
      const updated = { ...prev };
      if (updated[menuId]) {
        delete updated[menuId]; // Remove the item if unchecked
      } else {
        updated[menuId] = { price, quantity: 1 }; // Default quantity is 1
      }
      return updated;
    });
  };

  useEffect(() => {
    const amount = Object.values(selectedItems).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(amount);
  }, [selectedItems]);

  const handleQuantityChange = (menuId, quantity) => {
    console.log(menuId)
    console.log(quantity)
    const parsedQuantity = parseInt(quantity, 10); // Convert string to number
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) return; // Ignore invalid or negative values

    setSelectedItems((prev) => {
      const updated = { ...prev };
      if (updated[menuId]) {
        updated[menuId].quantity = parsedQuantity; // Update the quantity
      } else {
        updated[menuId] = { quantity: parsedQuantity }; // Initialize if not already present
      }
      return updated;
    });
  };


  // const handleLike = (itemId) => {
  //   setLikes({ ...likes, [itemId]: (likes[itemId] || 0) + 1 });
  // };
  // const handleLike = async (menuId) => {
  //   try {
  //     // Send a request to the backend to update the like
  //     const response = await fetch(`https://restaurant-app-three-pied.vercel.app//item/update-likes/${menuId}`,{
  //       method:'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })

  //     if(response.ok){
  //       const data = await response.json()
  //       // Update the likes in the frontend after successful backend update
  //     setLikes(data.likes);
  //     console.log('Like updated successfully:', data.likes)
  //     }else {
  //       throw new Error('Failed to update like');
  //     }
  //   } catch (err) {
  //     console.error('Error updating like:', err.message);
  //   }
  // };
  // // const handleDislike = (menuName) => {
  // //   setDislikes({ ...dislikes, [menuName]: (dislikes[menuName] || 0) + 1 });
  // // };
  // const handleDislike = async (menuId) => {
  //   try {
  //     // Send a request to the backend to update the like
  //     const response = await fetch(`https://restaurant-app-three-pied.vercel.app//item/update-dislikes/${menuId}`,{
  //       method:'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })

  //     if(response.ok){
  //       const data = await response.json()
  //       // Update the likes in the frontend after successful backend update
  //     setDislikes(data.dislikes);
  //     console.log('disike updated successfully:', data.dislikes)
  //     }else {
  //       throw new Error('Failed to update dislike');
  //     }
  //   } catch (err) {
  //     console.error('Error updating dislike:', err.message);
  //   }
  // };
  const handleOrderSubmit = async () => {
    // Extract menuId and quantity from selectedItems
    const items = Object.entries(selectedItems).map(([menuId, details]) => ({
      menuId,
      quantity: details.quantity, // Use the updated quantity from selectedItems
    }));

    try {
      const response = await fetch('https://restaurant-app-three-pied.vercel.app//orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customerName: email }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Order placed successfully! Order ID: ${data.orderId}`);
        setDialogOpen(false);
        setSelectedItems({});
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to place order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order. Please try again later.');
    }
  };

  const handleLike = async (menuId) => {
    try {
      const response = await fetch(`https://restaurant-app-three-pied.vercel.app//item/update-likes/${menuId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLikes((prevLikes) => ({
          ...prevLikes,
          [menuId]: (prevLikes[menuId] || 0) + 1,
        }));
        console.log('Like updated successfully:', data.likes);
      } else {
        throw new Error('Failed to update like');
      }
    } catch (err) {
      console.error('Error updating like:', err.message);
    }
  };
  
  // Handle dislike
  const handleDislike = async (menuId) => {
    try {
      const response = await fetch(`https://restaurant-app-three-pied.vercel.app//item/update-dislikes/${menuId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Update the dislikes in the frontend after successful backend update
        setDislikes((prevDislikes) => ({
          ...prevDislikes,
          [menuId]: (prevDislikes[menuId] || 0) + 1,
        }));
        console.log('Dislike updated successfully:', data.dislikes);
      } else {
        throw new Error('Failed to update dislike');
      }
    } catch (err) {
      console.error('Error updating dislike:', err.message);
    }
  };
  const handleDialogClick = () => {

    setDialogOpen(false);
    setOrderDialogOpen(true);
  };



  const handleCartClick = async (itemId) => {
    try {
      const response = await fetch(`https://restaurant-app-three-pied.vercel.app//customer/wishlist/${email}/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Show success feedback
        alert('Item added to wishlist!');
        setDialogOpen(false);  // Close the dialog after adding to wishlist
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to add item to wishlist.');
      }
    } catch (err) {
      console.error('Error occurred while adding item to wishlist:', err);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleLogOut = () => {
    logout(null);
    navigate('/')
  }
  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <Layout>
      <Box>
        <IconButton color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ position: 'absolute', ml: '2' }}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Typography variant="h3" sx={{ bgcolor: 'gray', textAlign: 'center' }}>
          Menu Items
        </Typography>
      </Box>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            transition: 'width 0.3s ease-in-out', // Smooth drawer transition
          },
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            my: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
          role="menu" // Mark as menu for accessibility
          onKeyDown={(e) => {
            if (e.key === 'Escape') setDrawerOpen(false); // Close drawer on Escape key
          }}
        >
          {/* Header Section */}
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mb: 2,
              fontWeight: 'bold',
            }}
          >
            <FastfoodIcon sx={{ fontSize: '2rem', color: 'success.main' }} />
            Table Tales
          </Typography>
          <Divider />

          {/* Special Items Accordion */}
          <Accordion sx={{ textAlign: 'left' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StarIcon color="warning" />
                Special Items
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {menuItems
                  .filter((menu) => menu.category === 'Special')
                  .map((menu, index) => (
                    <ListItem
                      button
                      key={index}
                      sx={{
                        '&:hover': { bgcolor: 'rgba(0, 150, 136, 0.1)' },
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      <ListItemText
                        primary={menu.name}
                        secondary={`Price: ₹${menu.price}`}
                        primaryTypographyProps={{ fontWeight: 'bold' }}
                      />
                    </ListItem>
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>

          {/* My Account Section */}
          <Button
            variant="outlined"
            color="info"
            onClick={handleAccount}
            startIcon={<AccountCircleIcon />}
            sx={{
              mx: 2,
              my: 1,
              textTransform: 'none',
              fontWeight: 'bold',
              width: '180px',
              '&:hover': { bgcolor: 'rgba(0, 150, 136, 0.1)' },
              transition: 'background-color 0.3s ease',
            }}
          >
            My Account
          </Button>

          {/* Chefs Section */}
          <Link to={'/chefs'}>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<EmojiPeopleIcon />}
              sx={{
                mx: 2,
                my: 1,
                textTransform: 'none',
                fontWeight: 'bold',
                width: '180px',
                '&:hover': { bgcolor: 'rgba(255, 87, 34, 0.1)' },
                transition: 'background-color 0.3s ease',
              }}
            >
              Chefs
            </Button>
          </Link>

          {/* Add Food Item Section */}
          <Link to={'/additem'}>
            <Button
              variant="outlined"
              color="success"
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

          {/* Log Out Section */}
          <Button
            variant="outlined"
            color="warning"
            onClick={handleLogOut}
            startIcon={<LogoutIcon />}
            sx={{
              mx: 2,
              my: 1,
              textTransform: 'none',
              fontWeight: 'bold',
              width: '180px',
              '&:hover': { bgcolor: 'rgba(233, 30, 99, 0.1)' },
              transition: 'background-color 0.3s ease',
            }}
          >
            Log Out
          </Button>

          {/* Footer Section */}
          <Box
            sx={{
              mt: 'auto',
              py: 2,
              textAlign: 'center',
              bgcolor: 'rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography variant="body2" color="textSecondary">
              © {new Date().getFullYear()} Table Tales. All Rights Reserved.
            </Typography>
          </Box>
        </Box>
      </Drawer>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} aria-label="Menu Tabs">
              <Tab label="All items" value="1" />
              <Tab label="Tiffins" value="2" />
              <Tab label="Fast Food Items" value="3" />
              <Tab label="General Food Items" value="4" />
              <Tab label="Sea Food" value="5" />
              <Tab label="Snacks" value="6" />
              <Tab label="Beverages" value="7" />
              <Tab label="Salad" value="8" />
              <Tab label="Cuisines" value="9" />
              <Tab label="Dessert" value="10" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', bgcolor: 'gray' }}>


              {menuItems.map((menu, index) => {
                const updatedImageURL = `https://restaurant-app-three-pied.vercel.app/${menu.imageURL}`;

                return (
                  <Card key={index} sx={{ maxWidth: '350px', display: 'flex', m: 2, backgroundColor: 'rgb(206, 206, 206)' }}>
                    <CardActionArea>

                      <CardMedia sx={{ minHeight: '400px' }} component="img" src={updatedImageURL} alt={menu.name} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {menu.name}
                        </Typography>
                        <Typography variant="body2">{menu.description}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                          <Typography>
                            <CurrencyRupeeIcon fontSize="small" />
                            {menu.price}
                          </Typography>
                          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ThumbUpOffAltRoundedIcon onClick={() => handleLike(menu._id)} sx={{ cursor: 'pointer' }} />
                            {menu.likes || 0}
                            <ThumbDownRoundedIcon onClick={() => handleDislike(menu._id)} sx={{ cursor: 'pointer' }} />
                            {menu.dislikes || 0}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 2 }}>
                          <Button variant="contained" color="success" onClick={() => handleCartClick(menu._id)}>
                            Add to WishList
                          </Button>
                          <Button variant="contained" color="success" onClick={() => setDialogOpen(true)}>
                            Order Now
                          </Button>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )
              })}
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', bgcolor: 'gray' }}>
              {menuItems
                .filter((menu) => menu.category === 'tiffin') // Filter menu items based on category
                .map((menu, index) => {
                  const updatedImageURL = `https://restaurant-app-three-pied.vercel.app/${menu.imageURL}`;
                  
                  return (
                    <Card key={index} sx={{ maxWidth: '350px', display: 'flex', m: 2, backgroundColor: 'rgb(206, 206, 206)' }}>
                      <CardActionArea>

                        <CardMedia sx={{ minHeight: '400px' }} component="img" src={updatedImageURL} alt={menu.name} />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {menu.name}
                          </Typography>
                          <Typography variant="body2">{menu.description}</Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                            <Typography>
                              <CurrencyRupeeIcon fontSize="small" />
                              {menu.price}
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <ThumbUpOffAltRoundedIcon onClick={() => handleLike(menu._id)} sx={{ cursor: 'pointer' }} />
                              {menu.likes || 0}
                              <ThumbDownRoundedIcon onClick={() => handleDislike(menu._id)} sx={{ cursor: 'pointer' }} />
                              {menu.dislikes || 0}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 2 }}>
                            <Button variant="contained" color="success" onClick={() => handleCartClick(menu._id)}>
                              Add to WishList
                            </Button>
                            <Button variant="contained" color="success" onClick={() => setDialogOpen(true)}>
                              Order Now
                            </Button>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  )
                })}
            </Box>
          </TabPanel>
          <TabPanel value="3">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', bgcolor: 'gray' }}>
              {menuItems
                .filter((menu) => menu.category === 'Fast Food') // Filter menu items based on category
                .map((menu, index) => {
                  const updatedImageURL = `https://restaurant-app-three-pied.vercel.app/${menu.imageURL}`;
                  
                  return (
                    <Card key={index} sx={{ maxWidth: '350px', display: 'flex', m: 2, backgroundColor: 'rgb(206, 206, 206)' }}>
                      <CardActionArea>
                        <CardMedia sx={{ minHeight: '400px' }} component="img" src={updatedImageURL} alt={menu.name} />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {menu.name}
                          </Typography>
                          <Typography variant="body2">{menu.description}</Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                            <Typography>
                              <CurrencyRupeeIcon fontSize="small" />
                              {menu.price}
                            </Typography>
                            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <ThumbUpOffAltRoundedIcon onClick={() => handleLike(menu.name)} sx={{ cursor: 'pointer' }} />
                              {likes[menu.name] || 0}
                              <ThumbDownRoundedIcon onClick={() => handleDislike(menu.name)} sx={{ cursor: 'pointer' }} />
                              {dislikes[menu.name] || 0}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 2 }}>
                            <Button variant="contained" color="success" onClick={() => handleCartClick(menu._id)}>
                              Add to WishList
                            </Button>
                            <Button variant="contained" color="success" onClick={() => setDialogOpen(true)}>
                              Order Now
                            </Button>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  )
                })}
            </Box>
          </TabPanel>
          <TabPanel value="4"><Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', bgcolor: 'gray' }}>
            {menuItems
              .filter((menu) => menu.category === 'Full meals') // Filter menu items based on category
              .map((menu, index) => {
                const updatedImageURL = `https://restaurant-app-three-pied.vercel.app/${menu.imageURL}`
               
                return (
                  <Card key={index} sx={{ maxWidth: '350px', display: 'flex', m: 2, backgroundColor: 'rgb(206, 206, 206)' }}>
                    <CardActionArea>
                      <CardMedia sx={{ minHeight: '400px' }} component="img" src={updatedImageURL} alt={menu.name} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {menu.name}
                        </Typography>
                        <Typography variant="body2">{menu.description}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                          <Typography>
                            <CurrencyRupeeIcon fontSize="small" />
                            {menu.price}
                          </Typography>
                          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ThumbUpOffAltRoundedIcon onClick={() => handleLike(menu.name)} sx={{ cursor: 'pointer' }} />
                            {likes[menu.name] || 0}
                            <ThumbDownRoundedIcon onClick={() => handleDislike(menu.name)} sx={{ cursor: 'pointer' }} />
                            {dislikes[menu.name] || 0}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 2 }}>
                          <Button variant="contained" color="success" onClick={() => handleCartClick(menu._id)}>
                            Add to WishList
                          </Button>
                          <Button variant="contained" color="success" onClick={() => setDialogOpen(true)}>
                            Order Now
                          </Button>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )
              }

              )}
          </Box></TabPanel>
          <TabPanel value="5"><Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', bgcolor: 'gray' }}>
            {menuItems
              .filter((menu) => menu.category === 'Sea food') // Filter menu items based on category
              .map((menu, index) => {
                const updatedImageURL = `https://restaurant-app-three-pied.vercel.app/${menu.imageURL}`
                
                return (
                  <Card key={index} sx={{ maxWidth: '350px', display: 'flex', m: 2, backgroundColor: 'rgb(206, 206, 206)' }}>
                    <CardActionArea>
                      <CardMedia sx={{ minHeight: '400px' }} component="img" src={updatedImageURL} alt={menu.name} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {menu.name}
                        </Typography>
                        <Typography variant="body2">{menu.description}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                          <Typography>
                            <CurrencyRupeeIcon fontSize="small" />
                            {menu.price}
                          </Typography>
                          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ThumbUpOffAltRoundedIcon onClick={() => handleLike(menu.name)} sx={{ cursor: 'pointer' }} />
                            {likes[menu.name] || 0}
                            <ThumbDownRoundedIcon onClick={() => handleDislike(menu.name)} sx={{ cursor: 'pointer' }} />
                            {dislikes[menu.name] || 0}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 2 }}>
                          <Button variant="contained" color="success" onClick={() => handleCartClick(menu._id)}>
                            Add to WishList
                          </Button>
                          <Button variant="contained" color="success" onClick={() => setDialogOpen(true)}>
                            Order Now
                          </Button>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )
              }

              )}
          </Box></TabPanel>
          <TabPanel value="6"><Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', bgcolor: 'gray' }}>
            {menuItems
              .filter((menu) => menu.category === 'Snack') // Filter menu items based on category
              .map((menu, index) => {
                const updatedImageURL = `https://restaurant-app-three-pied.vercel.app/${menu.imageURL}`
                
                return (
                  <Card key={index} sx={{ maxWidth: '350px', display: 'flex', m: 2, backgroundColor: 'rgb(206, 206, 206)' }}>
                    <CardActionArea>
                      <CardMedia sx={{ minHeight: '400px' }} component="img" src={updatedImageURL} alt={menu.name} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {menu.name}
                        </Typography>
                        <Typography variant="body2">{menu.description}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                          <Typography>
                            <CurrencyRupeeIcon fontSize="small" />
                            {menu.price}
                          </Typography>
                          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ThumbUpOffAltRoundedIcon onClick={() => handleLike(menu.name)} sx={{ cursor: 'pointer' }} />
                            {likes[menu.name] || 0}
                            <ThumbDownRoundedIcon onClick={() => handleDislike(menu.name)} sx={{ cursor: 'pointer' }} />
                            {dislikes[menu.name] || 0}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 2 }}>
                          <Button variant="contained" color="success" onClick={() => handleCartClick(menu._id)}>
                            Add to WishList
                          </Button>
                          <Button variant="contained" color="success" onClick={() => setDialogOpen(true)}>
                            Order Now
                          </Button>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )
              }

              )}
          </Box></TabPanel>
          <TabPanel value="7"><Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', bgcolor: 'gray' }}>
            {menuItems
              .filter((menu) => menu.category === 'Beverage') // Filter menu items based on category
              .map((menu, index) => {
                const updatedImageURL = `https://restaurant-app-three-pied.vercel.app/${menu.imageURL}`
                
                return (
                  <Card key={index} sx={{ maxWidth: '350px', display: 'flex', m: 2, backgroundColor: 'rgb(206, 206, 206)' }}>
                    <CardActionArea>
                      <CardMedia sx={{ minHeight: '400px' }} component="img" src={updatedImageURL} alt={menu.name} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {menu.name}
                        </Typography>
                        <Typography variant="body2">{menu.description}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                          <Typography>
                            <CurrencyRupeeIcon fontSize="small" />
                            {menu.price}
                          </Typography>
                          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ThumbUpOffAltRoundedIcon onClick={() => handleLike(menu.name)} sx={{ cursor: 'pointer' }} />
                            {likes[menu.name] || 0}
                            <ThumbDownRoundedIcon onClick={() => handleDislike(menu.name)} sx={{ cursor: 'pointer' }} />
                            {dislikes[menu.name] || 0}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 2 }}>
                          <Button variant="contained" color="success" onClick={() => handleCartClick(menu._id)}>
                            Add to WishList
                          </Button>
                          <Button variant="contained" color="success" onClick={() => setDialogOpen(true)}>
                            Order Now
                          </Button>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )
              }

              )}
          </Box></TabPanel>
          <TabPanel value="8"><Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', bgcolor: 'gray' }}>
            {menuItems
              .filter((menu) => menu.category === 'Salad') // Filter menu items based on category
              .map((menu, index) => {
                const updatedImageURL = `https://restaurant-app-three-pied.vercel.app/${menu.imageURL}`
                
                return (
                  <Card key={index} sx={{ maxWidth: '350px', display: 'flex', m: 2, backgroundColor: 'rgb(206, 206, 206)' }}>
                    <CardActionArea>
                      <CardMedia sx={{ minHeight: '400px' }} component="img" src={updatedImageURL} alt={menu.name} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {menu.name}
                        </Typography>
                        <Typography variant="body2">{menu.description}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                          <Typography>
                            <CurrencyRupeeIcon fontSize="small" />
                            {menu.price}
                          </Typography>
                          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ThumbUpOffAltRoundedIcon onClick={() => handleLike(menu.name)} sx={{ cursor: 'pointer' }} />
                            {likes[menu.name] || 0}
                            <ThumbDownRoundedIcon onClick={() => handleDislike(menu.name)} sx={{ cursor: 'pointer' }} />
                            {dislikes[menu.name] || 0}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 2 }}>
                          <Button variant="contained" color="success" onClick={() => handleCartClick(menu._id)}>
                            Add to WishList
                          </Button>
                          <Button variant="contained" color="success" onClick={() => setDialogOpen(true)}>
                            Order Now
                          </Button>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )
              }

              )}
          </Box></TabPanel>
          <TabPanel value="9"><Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', bgcolor: 'gray' }}>
            {menuItems
              .filter((menu) => menu.category === 'Cuisine') // Filter menu items based on category
              .map((menu, index) => {
                const updatedImageURL = `https://restaurant-app-three-pied.vercel.app/${menu.imageURL}`
                
                return (
                  <Card key={index} sx={{ maxWidth: '350px', display: 'flex', m: 2, backgroundColor: 'rgb(206, 206, 206)' }}>
                    <CardActionArea>
                      <CardMedia sx={{ minHeight: '400px' }} component="img" src={updatedImageURL} alt={menu.name} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {menu.name}
                        </Typography>
                        <Typography variant="body2">{menu.description}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                          <Typography>
                            <CurrencyRupeeIcon fontSize="small" />
                            {menu.price}
                          </Typography>
                          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ThumbUpOffAltRoundedIcon onClick={() => handleLike(menu.name)} sx={{ cursor: 'pointer' }} />
                            {likes[menu.name] || 0}
                            <ThumbDownRoundedIcon onClick={() => handleDislike(menu.name)} sx={{ cursor: 'pointer' }} />
                            {dislikes[menu.name] || 0}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 2 }}>
                          <Button variant="contained" color="success" onClick={() => handleCartClick(menu._id)}>
                            Add to WishList
                          </Button>
                          <Button variant="contained" color="success" onClick={() => setDialogOpen(true)}>
                            Order Now
                          </Button>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )
              }

              )}
          </Box></TabPanel>
          <TabPanel value="10"><Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', bgcolor: 'gray' }}>
            {menuItems
              .filter((menu) => menu.category === 'Dessert') // Filter menu items based on category
              .map((menu, index) => {
                const updatedImageURL = `https://restaurant-app-three-pied.vercel.app/${menu.imageURL}`
                
                return (
                  <Card key={index} sx={{ maxWidth: '350px', display: 'flex', m: 2, backgroundColor: 'rgb(206, 206, 206)' }}>
                    <CardActionArea>
                      <CardMedia sx={{ minHeight: '400px' }} component="img" src={updatedImageURL} alt={menu.name} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {menu.name}
                        </Typography>
                        <Typography variant="body2">{menu.description}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                          <Typography>
                            <CurrencyRupeeIcon fontSize="small" />
                            {menu.price}
                          </Typography>
                          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ThumbUpOffAltRoundedIcon onClick={() => handleLike(menu.name)} sx={{ cursor: 'pointer' }} />
                            {likes[menu.name] || 0}
                            <ThumbDownRoundedIcon onClick={() => handleDislike(menu.name)} sx={{ cursor: 'pointer' }} />
                            {dislikes[menu.name] || 0}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', my: 2 }}>
                          <Button variant="contained" color="success" onClick={() => handleCartClick(menu._id)}>
                            Add to WishList
                          </Button>
                          <Button variant="contained" color="success" onClick={() => setDialogOpen(true)}>
                            Order Now
                          </Button>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )
              }

              )}
          </Box></TabPanel>
        </TabContext>
      </Box>
      

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Require Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you want to order now?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDialogClick}>Order It</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={orderDialogOpen} onClose={() => setOrderDialogOpen(false)}>
        <DialogTitle>Select Items</DialogTitle>
        <DialogContent>
          {menuItems.map((menu) => (
            <Box key={menu._id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!selectedItems[menu._id]}
                    onChange={() => handleCheckboxChange(menu._id, menu.price)}
                  />
                }
                label={`${menu.name} - ₹${menu.price}`}
              />
              {selectedItems[menu._id] && (
                <TextField
                  sx={{ ml: 2 }}
                  type="number"
                  label="Quantity"
                  size="small"
                  variant="outlined"
                  value={selectedItems[menu._id].quantity}
                  onChange={(e) =>
                    handleQuantityChange(menu._id, parseInt(e.target.value, 10))
                  }
                  inputProps={{ min: 1 }}
                />
              )}
            </Box>
          ))}
          <Typography variant="h6" mt={2}>
            Total: ₹{totalAmount}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleOrderSubmit}>
            Place Order
          </Button>
        </DialogActions>
      </Dialog>

    </Layout >
  );
};

export default Menu;

