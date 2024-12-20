
import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Stepper, Step, StepLabel } from '@mui/material';
import { useUser } from '../contextAPI/context';
import Layout from '../components/Layout/Layout';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [profileDetails, setProfileDetails] = useState(null);
  const { email, logout } = useUser();
  
  const e = email;

  // Fetch orders for the user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://restaurant-app-three-pied.vercel.app/orders/${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data.order); // Assuming the orders are inside the "order" key
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (email) {
      fetchOrders();
    }
  }, [email]);  // Trigger fetch when email changes

  // Fetch menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('https://restaurant-app-three-pied.vercel.app/item/menu-items'); // API endpoint for menu items
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setMenuItems(data);  // Set menu items data
      } catch (err) {
        console.error('Error fetching menu items:', err);
      }
    };

    fetchMenuItems();
  }, []);  // Fetch once on component mount

  // Fetch user details
  useEffect(() => {
    if (email) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`https://restaurant-app-three-pied.vercel.app/customer/profile/${email}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }
          const data = await response.json();
          setProfileDetails(data.customer);  // Store profile data
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUserDetails();
    }
  }, [email]); // Fetch when email changes

  // Helper function to get the step index for the order status
  const getOrderStatusStep = (status) => {
    switch (status) {
      case 'ordered':
        return 0;
      case 'pending':
        return 1;
      case 'delivered':
      case 'cancelled': // Handle delivered and cancelled as final steps
        return 2;
      default:
        return 0;
    }
  };

  // Get the details (name and price) for a menu item
  const getMenuItemDetails = (menuId) => {
    const item = menuItems.find(item => item._id === menuId);
    return item ? { name: item.name, price: item.price } : { name: 'Unknown Item', price: '0.00' };
  };

  return (
    <Layout>
      <Box sx={{ textAlign: 'left', width: '100%', p: 3 }}>
        <Typography variant="h4" gutterBottom>Orders History</Typography>

        {/* Check if profileDetails and orders exist */}
        {profileDetails && profileDetails.orders && profileDetails.orders.length > 0 ? (
          <List>
            {/* Loop through all orders */}
            {profileDetails.orders.map((order, index) => (
              <div key={index}>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Order ID: {order._id} - Status: {order.status === 'completed' ? 'Delivered' : order.status}
                </Typography>

                {/* Stepper for showing order status */}
                <Stepper activeStep={getOrderStatusStep(order.status)} alternativeLabel>
                  {['Ordered', 'Shipped', 'Delivered'].map((status, i) => (
                    <Step key={i}>
                      <StepLabel>{status}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Total amount: ₹{order.totalAmount}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Order placed at: {order.createdAt}
                  </Typography>
                {/* Display the items in the order */}
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, i) => {
                    const { name, price } = getMenuItemDetails(item.menuId); // Get name and price
                    return (
                      <ListItem key={i}>
                        <ListItemText
                          primary={name}  // Display item name
                          secondary={`Price: ₹${price}`}  // Display item price
                        />
                        <ListItemText
                          secondary={`Quantity: ${item.quantity}`}  // Display item quantity
                        />
                      </ListItem>
                    );
                  })
                ) : (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    No items in this order
                  </Typography>
                )}

                <Divider sx={{ mt: 2 }} />
              </div>
            ))}
          </List>
        ) : (
          <Typography>No orders available.</Typography>
        )}
      </Box>
    </Layout>
  );
};

export default OrderPage;
