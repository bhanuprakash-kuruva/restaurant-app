const express = require('express')
const router = express.Router()
const multer = require('multer')
const Review = require('../models/review')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save the file in the "uploads" directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Generate unique filename
    }
});

const upload = multer({ storage });

// API to handle review submission
router.post('/', upload.single('image'), async (req, res) => {
    const { rating, comment, foodRating, serviceRating, atmosphereRating, dateOfVisit, customerName } = req.body;
    const image = req.file ? req.file.path : null; // Check if file exists

    if (!rating || !comment || !foodRating || !serviceRating || !atmosphereRating || !dateOfVisit) {
        return res.status(400).json({ message: 'Please fill in all fields before submitting the review.' });
    }

    try {
        const newReview = new Review({
            rating,
            comment,
            foodRating,
            serviceRating,
            atmosphereRating,
            dateOfVisit,
            customerName,
            image,
        });

        await newReview.save();
        res.status(201).json({ message: 'Review submitted successfully!', review: newReview });
    } catch (error) {
        console.error('Error saving review: ', error);
        res.status(500).json({ message: 'An error occurred while submitting your review.' });
    }
});

router.get('/showreviews', async (req, res) => {
    try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews: ', error);
      res.status(500).json({ message: 'An error occurred while fetching reviews.' });
    }
  });

module.exports = router