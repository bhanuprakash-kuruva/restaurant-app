const DeliveryBoy = require('../models/deliveryboy')

async function addDeliveryBoy(req,res){
    const {email,firstName,lastName,phone,status,rating} = req.body

    if (!email || !phone) {
        return res.status(400).json({ message: 'Email and phone are required.' });
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }
    console.log(req.file)
    if (!req.file) {
        return res.status(400).json({ message: 'Image is required' });
      }

      const imageURL = `/uploads/${req.file.filename}`;
    const data={
        email,
        firstName,
        lastName,
        phone,
        status,
        rating,
        imageURL
    }

    try{
        const existingDeliveryBoy = await DeliveryBoy.findOne({ email });
        if (existingDeliveryBoy) {
            return res.status(400).json({ message: 'Email already exists.' });
        }
        const newPerson = await DeliveryBoy.create(data)
        return res.status(201).json({message:"Delivery boy added successfully"})
    }catch (error) {
        console.error('Error adding delivery boy:', error);
        res.status(500).json({ message: 'Error adding delivery boy', error: error.message });
    }
}

async function showDeliveryBoys(req,res){
    try{
        const boys = await DeliveryBoy.find({})
        if(!boys){
            return res.status(404).json({message:'No delivery boys found'})
        }
        return res.status(201).json({deliverboys:boys})
    }catch(err){
        return res.status(500).json({message:'Internal Server error'})
    }
}

module.exports = {
    addDeliveryBoy,
    showDeliveryBoys
}