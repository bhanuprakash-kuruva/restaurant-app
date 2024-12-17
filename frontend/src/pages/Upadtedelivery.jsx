
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Select, MenuItem, FormControl, InputLabel, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import Layout from '../components/Layout/Layout';
import { useUser } from '../contextAPI/context';
import { useNavigate } from 'react-router-dom';
const DeliverBoyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuItems, setMenuItems] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const {role} =useUser()
  const navigate = useNavigate()
  useEffect(()=>{
    if(role !=='DELIVERY BOY' && role !=='ADMIN'){
      navigate('/needaccess')
    }
  },[])
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('http://localhost:8011/item/menu-items');
                if (!response.ok) {
                    throw new Error('Failed to fetch menu items');
                }
                const data = await response.json();
                setMenuItems(data);
            } catch (err) {
                console.error("Error fetching menu items:", err);
            }
        };
        fetchMenuItems();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:8011/orders/deliveryboy/showpendingorders');
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                const updatedOrders = data.order.map(order => ({
                    ...order,
                    status: order.status === 'completed' ? 'delivered' : order.status
                }));
                setOrders(updatedOrders);
                setLoading(false);
            } catch (err) {
                console.error("Error occurred while fetching orders:", err);
                alert("Failed to load orders.");
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getOrderStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'ordered':
                return 'blue';
            case 'pending':
                return 'orange';
            case 'delivered':
                return 'green';
            case 'canceled':
                return 'red';
            default:
                return 'gray';
        }
    };

    const getItemName = (menuId) => {
        const item = menuItems.find(item => item._id === menuId);
        return item ? item.name : 'Unknown Item';
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:8011/orders/changestatus/${orderId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            const data = await response.json();
            setSnackbarMessage(data.message || "Order status updated successfully!");
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error("Error updating order status:", error);
            setSnackbarMessage("Error updating order status.");
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    return (
        <Layout>
            <div style={{ padding: '20px' }}>
                <Typography variant="h4" gutterBottom>Pending Orders for Delivery</Typography>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell>Customer Name</TableCell>
                                    <TableCell>Items</TableCell>
                                    <TableCell>Total Amount</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Update Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.length > 0 ? (
                                    orders.map(order => (
                                        <TableRow key={order._id} hover>
                                            <TableCell>{order._id}</TableCell>
                                            <TableCell>{order.customerName}</TableCell>
                                            <TableCell>
                                                {order.items.map(item =>
                                                    `${getItemName(item.menuId)} (x${item.quantity})`).join(', ')}
                                            </TableCell>
                                            <TableCell>{`₹${order.totalAmount}`}</TableCell>
                                            <TableCell>
                                                <Typography sx={{ color: getOrderStatusColor(order.status) }}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <FormControl fullWidth>
                                                    <InputLabel>Status</InputLabel>
                                                    <Select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                    >
                                                        <MenuItem value="pending">Pending</MenuItem>
                                                        <MenuItem value="delivered">Delivered</MenuItem>
                                                        <MenuItem value="canceled">Canceled</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6}>No pending orders to deliver.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                {/* Snackbar for success/error messages */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        </Layout>
    );
};

export default DeliverBoyOrders;
