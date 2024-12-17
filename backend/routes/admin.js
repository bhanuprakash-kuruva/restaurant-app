const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const Item = require('../models/item');
const router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create 'uploads' folder if it doesn't exist
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using the timestamp and file extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// Route to add an item (including image)
router.post('/addItem', upload.single('image'), async (req, res) => {
  const { name, category, price, description } = req.body;
  
  // Check if the image is uploaded
  if (!req.file) {
    return res.status(400).json({ message: 'Image is required' });
  }

  const imageURL = `/uploads/${req.file.filename}`; // Construct the image URL

  try {
    const newItem = new Item({
      name,
      category,
      price,
      description,
      imageURL, // Store the image URL
    });

    await newItem.save();
    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ message: 'Error adding item', error });
  }
});

module.exports = router;
