
import React, { useState, useEffect } from 'react';
import {
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import Layout from '../components/Layout/Layout';
import { useUser } from '../contextAPI/context';
import { useNavigate } from 'react-router-dom';
const SalesAndItemsAnalysis = () => {
  const [orders, setOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [todayOrders, setTodayOrders] = useState([]);  // New state for today's orders
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([])
  const [error, setError] = useState(null);
  const [currentTab, setCurrentTab] = useState(0); // Track current tab for chart switching
  const [largestStatus, setLargestStatus] = useState('')
  const [largestValue, setLargestValue] = useState(0);
  const [ratingsData, setRatingsData] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState([]);
  const {role} =useUser()
  const navigate = useNavigate()
  useEffect(()=>{
    if(role !=='ADMIN'){
      navigate('/needaccess')
    }
  },[])
  // Fetch orders data on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8011/orders/deliveryboy/showorders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();

        const updatedOrders = data.order.map(order => ({
          ...order,
          status: order.status === 'completed' ? 'delivered' : order.status,
        }));

        setOrders(updatedOrders);
        setLoading(false);

        // Filter today's orders
        const today = new Date().toLocaleDateString();
        const filteredTodayOrders = updatedOrders.filter(order => {
          const orderDate = new Date(order.createdAt).toLocaleDateString();
          return orderDate === today;
        });
        setTodayOrders(filteredTodayOrders);

      } catch (err) {
        console.error("Error occurred while fetching orders:", err);
        setError("Failed to load orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:8011/item/menu-items'); // replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();

        setMenuItems(data);  // Store the menu items in the state

      } catch (err) {
        console.error("Error fetching menu items:", err);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch('http://localhost:8011/reviews/showreviews'); // Replace with your API endpoint for ratings
        if (!response.ok) {
          throw new Error('Failed to fetch ratings');
        }
        const data = await response.json();
        setRatingsData(data);  // Store the ratings data in state
      } catch (err) {
        console.error("Error occurred while fetching ratings:", err);
        setError("Failed to load ratings.");
      }
    };

    fetchRatings();
  }, []);
  useEffect(() => {
    const analyzeRatings = () => {
      if (!ratingsData || ratingsData.length === 0) return;

      const totalRatings = ratingsData.length;
      const totalScore = ratingsData.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = totalScore / totalRatings;

      // Calculate distribution of ratings
      const ratingDistribution = ratingsData.reduce((acc, review) => {
        const rating = review.rating;
        acc[rating] = acc[rating] ? acc[rating] + 1 : 1;
        return acc;
      }, {});

      // Convert rating distribution into an array for easy rendering
      const formattedRatingDistribution = Object.keys(ratingDistribution).map(rating => ({
        rating: rating,
        count: ratingDistribution[rating],
      }));

      setAverageRating(averageRating);
      setRatingDistribution(formattedRatingDistribution);
    };

    analyzeRatings();
  }, [ratingsData]);


  // Analyze total sales over time
  useEffect(() => {
    const analyzeSales = () => {
      const salesByDate = orders.reduce((acc, order) => {
        if (!order.createdAt || !order.totalAmount) return acc;

        const date = new Date(order.createdAt).toLocaleDateString();
        const total = order.totalAmount;

        if (acc[date]) {
          acc[date].totalSales += total;
        } else {
          acc[date] = { date, totalSales: total };
        }

        return acc;
      }, {});

      const formattedSalesData = Object.values(salesByDate);
      setSalesData(formattedSalesData);
    };

    if (orders.length > 0) {
      analyzeSales();
    }
  }, [orders]);

  // Analyze most purchased items
  

  useEffect(() => {
    const analyzeItems = () => {
      if (!orders || orders.length === 0) {
        return; // Return early if no orders
      }

      console.log('menuItems:', menuItems);  // Debugging the menuItems array

      const itemCount = orders.reduce((acc, order) => {
        if (!order.items || order.items.length === 0) return acc; // Ensure items exist

        order.items.forEach((item) => {
          const itemId = item.menuId;  // Use menuId instead of _id
          const quantity = item.quantity;

          console.log('itemId:', itemId);  // Debugging itemId (menuId in order)

          if (!itemId) {
            console.log('Item without menuId:', item);  // Debugging missing menuId
            return acc;  // Skip item if menuId is missing
          }

          // Find the item in menuItems based on menuId
          const menuItem = menuItems.find(m => m._id === itemId);  // Compare with _id

          if (!menuItem) {
            console.log(`Item with menuId ${itemId} not found in menuItems`);  // Debugging missing menuItem
          }

          const itemName = menuItem ? menuItem.name : null;  // Get the name if found
          console.log('itemName:', itemName);  // Debugging itemName

          if (!itemName || quantity == null) return acc; // Ensure valid data

          // Accumulate the quantities for each item
          if (acc[itemName]) {
            acc[itemName].quantity += quantity;
          } else {
            acc[itemName] = { itemId: itemName, quantity };
          }
        });

        return acc;
      }, {});

      const formattedItemsData = Object.values(itemCount);
      setItemsData(formattedItemsData);  // Update state with the formatted data
    };

    if (orders.length > 0 && menuItems.length > 0) {
      analyzeItems();  // Run only when both orders and menuItems are available
    }
  }, [orders, menuItems]);

  useEffect(() => {
    // Analyze order status distribution
    const analyzeStatus = () => {
      const statusCount = orders.reduce((acc, order) => {
        const status = order.status;

        if (acc[status]) {
          acc[status] += 1;
        } else {
          acc[status] = 1;
        }

        return acc;
      }, {});

      const formattedStatusData = Object.keys(statusCount).map((status) => ({
        name: status,
        value: statusCount[status],
      }));

      setStatusData(formattedStatusData);

      // Find the largest status
      let largestStatus = '';
      let largestValue = -1;

      formattedStatusData.forEach((entry) => {
        if (entry.value > largestValue) {
          largestValue = entry.value;
          largestStatus = entry.name;
        }
      });

      // Set the largest status and value to state once
      setLargestStatus(largestStatus);
      setLargestValue(largestValue);
    };

    if (orders.length > 0) {
      analyzeStatus();
    }
  }, [orders]);


  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress size={80} />
        <Typography variant="h6" color="textSecondary" mt={2}>
          Loading orders...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Snackbar open={true} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    );
  }

  return (
    <Layout>
      <div style={{ padding: '20px', backgroundColor: 'rgb(235, 235, 235)' }}>
      <Typography sx={{ fontWeight: 900, fontSize: '30px', textAlign: 'center' }} gutterBottom>
        Sales & Items Analysis
      </Typography>

      {/* Tabs for different chart views */}
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label="Sales Over Time" />
        <Tab label="Most Purchased Items" />
        <Tab label="Order Status Distribution" />
        <Tab label="Today's Orders" /> {/* New Tab for Today's Orders */}
      </Tabs>

      {/* Chart Content Based on Tab Selection */}
      <Box mt={3}>
        {currentTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Sales Over Time
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {currentTab === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Most Purchased Items
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={itemsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="itemId" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="quantity" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {currentTab === 2 && (

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Order Status Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      {/* Add Legend here */}
                      <Legend layout="horizontal" align="center" verticalAlign="bottom" />
                      <Pie
                        data={statusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {statusData.map((entry, index) => {
                          // Determine whether the status is delivered, cancelled, or pending
                          let statusColor = '';
                          let statusText = '';

                          if (entry.name === 'delivered') {
                            statusColor = '#008000'; // Green
                            statusText = 'Delivered';
                          } else if (entry.name === 'canceled') {
                            statusColor = '#FF0000'; // Red
                            statusText = 'Cancelled';
                          } else if (entry.name === 'pending') {
                            statusColor = '#FFA500'; // Orange
                            statusText = 'Pending';
                          }

                          // Log status info to the console
                          console.log(`Order Status: ${statusText}, Value: ${entry.value}`);

                          return (
                            <Cell
                              key={`cell-${index}`}
                              fill={statusColor} // Set the color based on the status
                            />
                          );
                        })}
                      </Pie>

                      {/* Find and log the status with the largest value */}
                      {/* {(() => {
                        let largestStatus = '';
                        let largestValue = -1;

                        statusData.forEach((entry) => {
                          if (entry.value > largestValue) {
                            setLargestValue(entry.value)
                            setLargestStatus(entry.name)
                          }
                        });

                        console.log(`The largest status is: ${largestStatus} with a value of: ${largestValue}`);
                        return null; // This prevents rendering anything in the PieChart but logs the result
                      })()} */}
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>


        )}

        {currentTab === 3 && (  // Displaying Today's Orders as Table
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Today's Orders
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Order ID</TableCell>
                          <TableCell>Total Amount</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {todayOrders.length > 0 ? (
                          todayOrders.map((order, index) => (
                            <TableRow key={index}>
                              <TableCell>{order._id}</TableCell>
                              <TableCell>${order.totalAmount}</TableCell>
                              <TableCell>{order.status}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} align="center">
                              No orders today.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
      

      <Box mt={4}>
        <Typography sx={{ fontWeight: 900, fontSize: '30px', textAlign: 'center' }} gutterBottom>
          Customer Ratings Analysis
        </Typography>

        <Card sx={{ boxShadow: 3, mb: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
              Key Insights:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  <strong>Average Customer Rating:</strong> {averageRating.toFixed(2)} / 5
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>Rating Distribution:</strong>
                  <ul>
                    {ratingDistribution.map((entry, index) => (
                      <li key={index}>
                        {entry.rating} Stars: {entry.count} reviews
                      </li>
                    ))}
                  </ul>
                </Typography>
              </li>
            </ul>
          </CardContent>
        </Card>
      </Box>

      {/* Optionally, add a chart to visualize the rating distribution */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rating Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ratingDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rating" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4} >
        <Typography sx={{ fontWeight: 900, fontSize: '30px', textAlign: 'center' }} gutterBottom>
          Analytics Summary
        </Typography>
        <Card sx={{ boxShadow: 3, mb: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
              Key Insights:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  <strong>Total Sales:</strong> Based on recent data, our total sales have been steadily increasing, with a noticeable spike in the past week.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>Top-Selling Items:</strong> The most popular items today include {itemsData.length > 0 ? itemsData[0].itemId : "N/A"} which accounted for {itemsData.length > 0 ? itemsData[0].quantity : 0} orders.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>Order Status:</strong>{`The largest status is: ${largestStatus} with a value of: ${largestValue}`}
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>Today's Orders:</strong> We have received {todayOrders.length} orders today, with a total amount of ${todayOrders.reduce((acc, order) => acc + order.totalAmount, 0)}.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  <strong>Customer Review's:</strong> Our customers rated {averageRating.toFixed(2)} / 5 for the restaurant services.
                </Typography>
              </li>
            </ul>
          </CardContent>
        </Card>
      </Box>

    </div>
    </Layout>
  );
};

export default SalesAndItemsAnalysis;
