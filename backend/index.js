const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const cors = require('cors')
const adminRoute = require('./routes/admin')
const path = require('path')
const connectToMongo = require('./connect');
const customerRoute = require('./routes/customer')
const itemRoute = require('./routes/item')
const orderRoute = require('./routes/order')
const chefRoute = require('./routes/chef')
const bodyParser = require('body-parser');
const cateringRoute = require('./routes/catering')
const deliveryRoute = require('./routes/delivery')
const reviewRoute = require('./routes/review')
dotenv.config();

const app = express();
const PORT = 8011 || 5010;
const MONGO_URI = process.env.MONGO_URL
const corsOptions = {
    origin: 'http://localhost:5173',  // Change this to the frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Allow cookies to be sent with requests
  };
//   app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors(corsOptions));
app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
// Root Route
app.use('/customer', cors(corsOptions),customerRoute);
app.use('/admin',adminRoute)
app.use('/item',cors(corsOptions),itemRoute)
app.use('/orders',cors(corsOptions),orderRoute)
app.use('/chef',chefRoute)
app.use('/catering',cors(corsOptions),cateringRoute)
app.use('/deliveryboy',deliveryRoute)
app.use('/reviews',cors(corsOptions),reviewRoute)
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`)
})