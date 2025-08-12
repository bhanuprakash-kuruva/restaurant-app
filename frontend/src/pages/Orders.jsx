
// import React, { useState, useEffect } from 'react';
// import { Box, Typography, List, ListItem, ListItemText, Divider, Stepper, Step, StepLabel } from '@mui/material';
// import { useUser } from '../contextAPI/context';
// import Layout from '../components/Layout/Layout';

// const OrderPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [profileDetails, setProfileDetails] = useState(null);
//   const { email, logout } = useUser();
  
//   const e = email;

//   // Fetch orders for the user
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch(`http://localhost:8071/orders/${email}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch orders');
//         }
//         const data = await response.json();
//         setOrders(data.order); // Assuming the orders are inside the "order" key
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     if (email) {
//       fetchOrders();
//     }
//   }, [email]);  // Trigger fetch when email changes

//   // Fetch menu items
//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const response = await fetch('http://localhost:8071/item/menu-items'); // API endpoint for menu items
//         if (!response.ok) {
//           throw new Error('Failed to fetch menu items');
//         }
//         const data = await response.json();
//         setMenuItems(data);  // Set menu items data
//       } catch (err) {
//         console.error('Error fetching menu items:', err);
//       }
//     };

//     fetchMenuItems();
//   }, []);  // Fetch once on component mount

//   // Fetch user details
//   useEffect(() => {
//     if (email) {
//       const fetchUserDetails = async () => {
//         try {
//           const response = await fetch(`http://localhost:8071/customer/profile/${email}`);
//           if (!response.ok) {
//             throw new Error('Failed to fetch user details');
//           }
//           const data = await response.json();
//           setProfileDetails(data.customer);  // Store profile data
//         } catch (error) {
//           console.error('Error fetching user details:', error);
//         }
//       };

//       fetchUserDetails();
//     }
//   }, [email]); // Fetch when email changes

//   // Helper function to get the step index for the order status
//   const getOrderStatusStep = (status) => {
//     switch (status) {
//       case 'ordered':
//         return 0;
//       case 'pending':
//         return 1;
//       case 'delivered':
//       case 'cancelled': // Handle delivered and cancelled as final steps
//         return 2;
//       default:
//         return 0;
//     }
//   };

//   // Get the details (name and price) for a menu item
//   const getMenuItemDetails = (menuId) => {
//     const item = menuItems.find(item => item._id === menuId);
//     return item ? { name: item.name, price: item.price } : { name: 'Unknown Item', price: '0.00' };
//   };

//   return (
//     <Layout>
//       <Box sx={{ textAlign: 'left', width: '100%', p: 3 }}>
//         <Typography variant="h4" gutterBottom>Orders History</Typography>

//         {/* Check if profileDetails and orders exist */}
//         {profileDetails && profileDetails.orders && profileDetails.orders.length > 0 ? (
//           <List>
//             {/* Loop through all orders */}
//             {profileDetails.orders.map((order, index) => (
//               <div key={index}>
//                 <Typography variant="h6" sx={{ mt: 2 }}>
//                   Order ID: {order._id} - Status: {order.status === 'completed' ? 'Delivered' : order.status}
//                 </Typography>

//                 {/* Stepper for showing order status */}
//                 <Stepper activeStep={getOrderStatusStep(order.status)} alternativeLabel>
//                   {['Ordered', 'Shipped', 'Delivered'].map((status, i) => (
//                     <Step key={i}>
//                       <StepLabel>{status}</StepLabel>
//                     </Step>
//                   ))}
//                 </Stepper>
//                   <Typography variant="body1" sx={{ mt: 1 }}>
//                     Total amount: ₹{order.totalAmount}
//                   </Typography>
//                   <Typography variant="body1" sx={{ mt: 1 }}>
//                     Order placed at: {order.createdAt}
//                   </Typography>
//                 {/* Display the items in the order */}
//                 {order.items && order.items.length > 0 ? (
//                   order.items.map((item, i) => {
//                     const { name, price } = getMenuItemDetails(item.menuId); // Get name and price
//                     return (
//                       <ListItem key={i}>
//                         <ListItemText
//                           primary={name}  // Display item name
//                           secondary={`Price: ₹${price}`}  // Display item price
//                         />
//                         <ListItemText
//                           secondary={`Quantity: ${item.quantity}`}  // Display item quantity
//                         />
//                       </ListItem>
//                     );
//                   })
//                 ) : (
//                   <Typography variant="body2" sx={{ mt: 1 }}>
//                     No items in this order
//                   </Typography>
//                 )}

//                 <Divider sx={{ mt: 2 }} />
//               </div>
//             ))}
//           </List>
//         ) : (
//           <Typography>No orders available.</Typography>
//         )}
//       </Box>
//     </Layout>
//   );
// };

// export default OrderPage;


//mobile
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useUser } from '../contextAPI/context';
import Layout from '../components/Layout/Layout';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [profileDetails, setProfileDetails] = useState(null);
  const { email } = useUser();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Fetch orders for the user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:8071/orders/${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data.order);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (email) {
      fetchOrders();
    }
  }, [email]);

  // Fetch menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:8071/item/menu-items');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        console.error('Error fetching menu items:', err);
      }
    };

    fetchMenuItems();
  }, []);

  // Fetch user details
  useEffect(() => {
    if (email) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8071/customer/profile/${email}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }
          const data = await response.json();
          setProfileDetails(data.customer);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUserDetails();
    }
  }, [email]);

  const getOrderStatusStep = (status) => {
    switch (status) {
      case 'ordered':
        return 0;
      case 'pending':
        return 1;
      case 'delivered':
      case 'cancelled':
        return 2;
      default:
        return 0;
    }
  };

  const getMenuItemDetails = (menuId) => {
    const item = menuItems.find((item) => item._id === menuId);
    return item ? { name: item.name, price: item.price } : { name: 'Unknown Item', price: '0.00' };
  };

  return (
    <Layout>
      <Box
        sx={{
          textAlign: 'left',
          width: '100%',
          p: isSmallScreen ? 2 : 3,
          maxWidth: 900,
          mx: 'auto',
        }}
      >
        <Typography
          variant={isSmallScreen ? 'h5' : 'h4'}
          gutterBottom
          sx={{ fontWeight: 'bold', textAlign: isSmallScreen ? 'center' : 'left' }}
        >
          Orders History
        </Typography>

        {profileDetails && profileDetails.orders && profileDetails.orders.length > 0 ? (
          <List>
            {profileDetails.orders.map((order, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Typography
                  variant={isSmallScreen ? 'subtitle1' : 'h6'}
                  sx={{ mt: 2, textAlign: isSmallScreen ? 'center' : 'left' }}
                >
                  Order ID: {order._id} - Status:{' '}
                  {order.status === 'completed' ? 'Delivered' : order.status}
                </Typography>

                <Stepper
                  activeStep={getOrderStatusStep(order.status)}
                  alternativeLabel
                  sx={{ mt: 1, mb: 2, px: isSmallScreen ? 1 : 0 }}
                >
                  {['Ordered', 'Shipped', 'Delivered'].map((status, i) => (
                    <Step key={i}>
                      <StepLabel
                        sx={{
                          '& .MuiStepLabel-label': {
                            fontSize: isSmallScreen ? '0.75rem' : '1rem',
                          },
                        }}
                      >
                        {status}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>

                <Typography
                  variant="body1"
                  sx={{ mt: 1, textAlign: isSmallScreen ? 'center' : 'left' }}
                >
                  Total amount: ₹{order.totalAmount}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 1, mb: 2, textAlign: isSmallScreen ? 'center' : 'left' }}
                >
                  Order placed at: {new Date(order.createdAt).toLocaleString()}
                </Typography>

                {order.items && order.items.length > 0 ? (
                  order.items.map((item, i) => {
                    const { name, price } = getMenuItemDetails(item.menuId);
                    return (
                      <ListItem
                        key={i}
                        sx={{
                          display: 'flex',
                          flexDirection: isSmallScreen ? 'column' : 'row',
                          justifyContent: 'space-between',
                          alignItems: isSmallScreen ? 'flex-start' : 'center',
                          px: 0,
                        }}
                      >
                        <ListItemText
                          primary={name}
                          secondary={`Price: ₹${price}`}
                          sx={{ mb: isSmallScreen ? 1 : 0 }}
                        />
                        <ListItemText secondary={`Quantity: ${item.quantity}`} />
                      </ListItem>
                    );
                  })
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, textAlign: isSmallScreen ? 'center' : 'left' }}
                  >
                    No items in this order
                  </Typography>
                )}

                <Divider sx={{ mt: 2 }} />
              </Box>
            ))}
          </List>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
            No orders available.
          </Typography>
        )}
      </Box>
    </Layout>
  );
};

export default OrderPage;
