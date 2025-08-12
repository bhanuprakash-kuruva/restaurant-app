
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
  Typography, Table,
  FormControlLabel
} from '@mui/material';
import { jsPDF } from 'jspdf';
import { Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ShoppingCart, Receipt } from '@mui/icons-material';

import { Link, useNavigate } from 'react-router-dom';

const Menu = () => {

  const navigate = useNavigate();
  // const [email, setEmail] = useState('');
  const [menuItems, setMenuItems] = useState([]); // State to store fetched menu items
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const [tabValue, setTabValue] = useState('1'); // Initializing tabValue for TabContext
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [filteredMenu, setFilteredMenu] = useState(menuItems);
  const [searchQuery, setSearchQuery] = useState('');
  const {email,logout,logo} = useUser()
  const handleAccount = () => {

    navigate('/profile')
    // window.location.href('/profile')
  };
  // useEffect(()=>{
  //   const { email, logout } = useUser();
  //   setEmail(email)
  // },[email])
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('https://restaurant-6xfaogsc7-kuruva-bhanu-praashs-projects.vercel.app//item/menu-items'); // Replace with your backend API
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
  //     const response = await fetch(`https://restaurant-6xfaogsc7-kuruva-bhanu-praashs-projects.vercel.app//item/update-likes/${menuId}`,{
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
  //     const response = await fetch(`https://restaurant-6xfaogsc7-kuruva-bhanu-praashs-projects.vercel.app//item/update-dislikes/${menuId}`,{
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
    console.log(email)
    try {
      const response = await fetch('https://restaurant-6xfaogsc7-kuruva-bhanu-praashs-projects.vercel.app//orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customerName: email }),
      });

      if (response.ok) {
        generateReceipt()
        const data = await response.json();
        alert(`Order placed successfully! Order ID: ${data.orderId}`);
        setDialogOpen(false);
        setOrderDialogOpen(false)
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
      const response = await fetch(`https://restaurant-6xfaogsc7-kuruva-bhanu-praashs-projects.vercel.app//item/update-likes/${menuId}`, {
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
      const response = await fetch(`https://restaurant-6xfaogsc7-kuruva-bhanu-praashs-projects.vercel.app//item/update-dislikes/${menuId}`, {
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
      const response = await fetch(`https://restaurant-6xfaogsc7-kuruva-bhanu-praashs-projects.vercel.app//customer/wishlist/${email}/${itemId}`, {
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
    logo('CUSTOMER')
    navigate('/')
  }

  const calculateTotalAmount = () => {
    return Object.values(selectedItems).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };
  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  useEffect(() => {
    if (email === null) {
      navigate('*')
    }
  }, [email])





  const downloadReceipt = () => {
    const doc = new jsPDF();

    // Title with customized font and positioning
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text('Table Tales Receipt', 105, 20, null, null, 'center'); // Title centered
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");

    // Customer information
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 30);
    doc.text(`Customer: ${email}`, 20, 40);

    // Draw a horizontal line to separate title from items
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);

    let yPosition = 55;
    doc.text('Items:', 20, yPosition); // Heading for items
    yPosition += 10;

    // Add each item and its price/quantity
    Object.entries(selectedItems).forEach(([menuId, { price, quantity }]) => {
      const menuName = menuItems.find((item) => item._id === menuId)?.name;

      // Menu item and price
      doc.setFont("helvetica", "normal");
      doc.text(`${menuName}`, 20, yPosition);
      doc.text(`₹${price} x ${quantity}`, 140, yPosition, { align: 'right' });

      // Simple Unicode for a cart (instead of using icons)
      doc.text("🛒", 170, yPosition); // Shopping cart emoji

      yPosition += 8;
    });

    // Spacer before totals
    yPosition += 10;

    // Draw a line before totals section
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 190, yPosition);

    // Calculating subtotal, tax, and total
    const subtotal = calculateTotalAmount();
    const tax = subtotal * 0.18; // Assuming 18% tax rate
    const total = subtotal + tax;

    // Totals section
    yPosition += 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 20, yPosition);
    yPosition += 8;
    doc.setFont("helvetica", "normal");
    doc.text(`Tax (18%): ₹${tax.toFixed(2)}`, 20, yPosition);
    yPosition += 8;

    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 0, 0);  // Red color for the total amount
    doc.text(`Total: ₹${total.toFixed(2)}`, 20, yPosition); // Bold and red total
    doc.setTextColor(0, 0, 0);  // Reset color to black for next text

    // Draw a line at the end of the receipt
    yPosition += 10;
    doc.line(20, yPosition, 190, yPosition);

    // Add a receipt icon (using Unicode or simple text)
    doc.text("📜", 170, yPosition - 5); // Receipt emoji

    // Save the generated PDF
    doc.save('receipt.pdf');
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter the menu items based on name or description
    const filteredItems = menuItems.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredMenu(filteredItems);
  };


  const generateReceipt = () => {
    const items = Object.entries(selectedItems).map(([menuId, details]) => ({
      name: menuItems.find((item) => item._id === menuId)?.name,
      price: details.price,
      quantity: details.quantity,
      total: details.price * details.quantity,
    }));

    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.18; // Assuming 18% tax rate
    const total = subtotal + tax;

    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Receipt
        </Typography>
        <Table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price per Item (₹)</th>
              <th>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
                <td>₹{item.total}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Subtotal: ₹{subtotal.toFixed(2)}
        </Typography>
        <Typography variant="h6">
          Tax (18%): ₹{tax.toFixed(2)}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
          Total: ₹{total.toFixed(2)}
        </Typography>
      </Box>
    );
  };


  return (
    <Layout>
      {/* <Box sx={{display:'flex',justifyContent:'space-between',backgroundColor:'gray'}}>
        <IconButton color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ position: 'absolute', ml: '2' }}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Typography variant="h3" sx={{ bgcolor: 'gray', textAlign: 'center' }}>
          Menu Items
        </Typography>
        <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{
          marginTop: 2,
          width: '80%',  // Adjust width as needed
          maxWidth: 500, // Max width for responsiveness
        }}
        fullWidth
      />
      </Box> */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'gray',
          padding: '10px', // Add padding for spacing
        }}
      >
        {/* Menu Icon Button */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{
            zIndex: 1, // Ensure the icon stays on top of other elements
          }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>

        {/* Typography for the title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: '200',
            color: 'white',
            textAlign: 'center',
            flexGrow: 1, // This will make the Typography take the available space and center it
          }}
        >
          Menu Items
        </Typography>

        {/* Search Input */}
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            width: 200,  // Fixed width for search bar
            marginLeft: 2, // Space between title and search input
            backgroundColor: 'white', // Make the text field background white for contrast
          }}
        />
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
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {(filteredMenu.length > 0 || searchQuery==='') ? (
          filteredMenu.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 2,
                border: '1px solid #ddd',
                borderRadius: 2,
                padding: 2,
                width: '80%',
                maxWidth: 500,
              }}
            >
              <img src={`https://restaurant-6xfaogsc7-kuruva-bhanu-praashs-projects.vercel.app/${item.imageURL}`} alt={item.name} style={{ width: 60, height: 60, marginRight: 16 }} />
              <Box>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">{item.category}</Typography>
                <Typography variant="body2">{item.description}</Typography>
                
                <Typography variant="body2" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                  ₹ {item.price}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>No items found</Typography>
        )}
      </Box>
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
                const updatedImageURL = `${menu.imageURL}`;
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
                  const updatedImageURL = `${menu.imageURL}`;

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
                  const updatedImageURL = `${menu.imageURL}`;

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
                const updatedImageURL = `${menu.imageURL}`

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
                const updatedImageURL = `${menu.imageURL}`

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
                const updatedImageURL = `${menu.imageURL}`

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
                const updatedImageURL = `${menu.imageURL}`
                console.log(updatedImageURL)
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
                const updatedImageURL = `${menu.imageURL}`

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
                const updatedImageURL = `${menu.imageURL}`

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
                const updatedImageURL = `${menu.imageURL}`

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
          <Button variant="contained" color="primary" onClick={() => { setOrderDialogOpen(false); setReceiptDialogOpen(true); }}>
            View Receipt
          </Button>
          <Button variant="contained" color="primary" onClick={handleOrderSubmit}>
            Place Order
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={receiptDialogOpen} onClose={() => setReceiptDialogOpen(false)}>
        <DialogTitle>Receipt</DialogTitle>
        <DialogContent>
          {generateReceipt()}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={downloadReceipt}>
            Download Receipt
          </Button>
          <Button onClick={() => { setReceiptDialogOpen(false); setOrderDialogOpen(true); }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Layout >
  );
};

export default Menu;

