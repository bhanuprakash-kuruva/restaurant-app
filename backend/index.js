
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

// Routes
const adminRoute = require('./routes/admin');
const customerRoute = require('./routes/customer');
const itemRoute = require('./routes/item');
const orderRoute = require('./routes/order');
const chefRoute = require('./routes/chef');
const cateringRoute = require('./routes/catering');
const deliveryRoute = require('./routes/delivery');
const reviewRoute = require('./routes/review');
const branchRoutes = require('./routes/branchRoutes');
const reservationRoutes = require('./routes/reservationRoutes');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8071;
const MONGO_URI = process.env.MONGO_URL;

// ✅ CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// ✅ Apply CORS before all routes
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight handling

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Root route - Status page
app.get('/', (req, res) => {
  res.send(`
    <h1>🚀 Server is running!</h1>
    <p>API Base URL: ${req.protocol}://${req.get('host')}</p>
    <p>Environment: ${process.env.NODE_ENV || 'development'}</p>
    <p>Allowed Origin: ${process.env.FRONTEND_URL || 'All (*)'}</p>
    <p>MongoDB URI: ${MONGO_URI ? '✅ Set' : '❌ Not Set'}</p>
  `);
});

// Routes
app.use('/customer', customerRoute);
app.use('/admin', adminRoute);
app.use('/item', itemRoute);
app.use('/orders', orderRoute);
app.use('/chef', chefRoute);
app.use('/catering', cateringRoute);
app.use('/deliveryboy', deliveryRoute);
app.use('/reviews', reviewRoute);
app.use('/api/branches', branchRoutes);
app.use('/api/reservations', reservationRoutes);


// ✅ Global Error Handling
app.use((err, req, res, next) => {
  if (err.name === 'CorsError') {
    console.error('CORS Error:', err.message);
    return res.status(403).json({ message: 'CORS Error: Not allowed by CORS policy' });
  }
  console.error('Server Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected...'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
