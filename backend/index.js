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
const PORT = process.env.PORT || 8071;
const MONGO_URI = process.env.MONGO_URL;

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies or credentials
};

// Apply CORS globally
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/customer', cors(corsOptions), customerRoute);
app.use('/admin', adminRoute);
app.use('/item', cors(corsOptions), itemRoute);
app.use('/orders', cors(corsOptions), orderRoute);
app.use('/chef', chefRoute);
app.use('/catering', cors(corsOptions), cateringRoute);
app.use('/deliveryboy', deliveryRoute);
app.use('/reviews', cors(corsOptions), reviewRoute);

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
