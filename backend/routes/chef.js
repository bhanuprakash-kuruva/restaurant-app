const Chef = require('../models/chef')
const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const router = express.Router()

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

const upload = multer({storage})
router.post('/addchef',upload.single('image'),async(req,res)=>{
    const {name,description,experience,speciality,rating} = req.body
    console.log(req.file)
    if (!req.file) {
        return res.status(400).json({ message: 'Image is required' });
      }

      const imageURL = `/uploads/${req.file.filename}`;
      console.log(name,description,experience,speciality,rating,imageURL)
    try{
        const newChef = new Chef({
            name,
            description,
            experience,
            speciality,
            rating,
            imageURL
        })
        await newChef.save();
    res.status(201).json({ message: 'Chef added successfully', chef: newChef });
    }catch (error) {
        console.error('Error adding chef:', error);
        res.status(500).json({ message: 'Error adding chef', error });
      }
})

router.get('/showchefs',async(req,res)=>{
    try{
        const chefs = await Chef.find({})
        if(!chefs){
           return res.status(404).json({message:'chefs not found.'})
        }
       return res.status(200).json({chef:chefs})
    }catch(err){
       return res.status(500).json({message:"Server error"})
    }
})


module.exports = router