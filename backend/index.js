const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoute = require('./routes/admin');
const path = require('path');
const customerRoute = require('./routes/customer');
const itemRoute = require('./routes/item');
const orderRoute = require('./routes/order');
const chefRoute = require('./routes/chef');
const bodyParser = require('body-parser');
const cateringRoute = require('./routes/catering');
const deliveryRoute = require('./routes/delivery');
const reviewRoute = require('./routes/review');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8011;
const MONGO_URI = process.env.MONGO_URL;

const corsOptions = {
  origin: 'https://restaurant-app-frontend-ruby.vercel.app',  // Remove trailing slash
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Allow cookies to be sent with requests
};

// Apply CORS globally
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));  // Handles preflight OPTIONS requests

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/customer', customerRoute);
app.use('/admin', adminRoute);
app.use('/item', itemRoute);
app.use('/orders', orderRoute);
app.use('/chef', chefRoute);
app.use('/catering', cateringRoute);
app.use('/deliveryboy', deliveryRoute);
app.use('/reviews', reviewRoute);

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
