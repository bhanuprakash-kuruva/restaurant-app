const express = require('express')
const { addDeliveryBoy, showDeliveryBoys } = require('../controllers/delivery.js')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')

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

const upload = multer({ storage: storage });

router.post('/add', upload.single('imageURL'), addDeliveryBoy)
router.get('/show',showDeliveryBoys)

module.exports = router