const Customer = require('../models/customer');
const bcrypt = require('bcrypt');  // You might want to hash passwords before saving
const { ObjectId } = require('mongoose').Types;


async function createCustomer(req, res) {
    const { firstName, lastName, email, password, age, mobileNumber, address, pincode } = req.body;
    console.log(firstName);
    console.log(email)
    console.log(password)
    // Validate the required fields
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Additional validation (e.g., email format)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Hash the password before saving (for security purposes)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare the data object
    const data = {
        firstName,
        lastName,
        email,
        password,  // Store hashed password
        age,
        mobileNumber,
        address,
        pincode
    };

    try {
        // Check if email already exists (ensure uniqueness)
        const existingUser = await Customer.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Create a new customer
        const newCustomer = await Customer.create(data);

        // Exclude password from the response for security reasons
        const { password: _, ...customerWithoutPassword } = newCustomer.toObject();

        res.status(201).json({
            message: 'User created successfully',
            customer: customerWithoutPassword,  // Return customer data without password
        });
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ message: 'Error creating customer', error: error.message });
    }
}
// Function to show all customers
async function showCustomer(req, res) {
    const email = req.params.id; // Use the correct query parameter for the email
    console.log("Fetching customer with email:", email);

    try {
        // Fetch the customer from the database using the email
        const customer = await Customer.findOne({ email: email }).populate('wishList').populate('orders');

        if (!customer) {
            // Handle case where customer is not found
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ customer: customer });
    } catch (err) {
        // Return error with detailed message
        res.status(500).json({ message: 'Error while retrieving customer data', error: err.message });
    }
}

async function updateProfile(req, res) {
    const email = req.params.id;
    console.log(email)
    const { firstName, lastName, age, mobileNumber, address, pincode } = req.body;
    console.log('update customer')
    // Find the user by email and update their details in the database
    try {
        const user = await Customer.findOne({ email: email }); // Assume User is a Mongoose model
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user with the new details
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
        user.mobileNumber = mobileNumber;
        user.address = address;
        user.pincode = pincode;

        // Save the updated user to the database
        await user.save();

        // Respond with the updated user data
        res.json({ customer: user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile' });
    }
}





async function validateCustomer(req, res) {
    const { email, password,user } = req.body;
    console.log(email, password,user);
    const r = user
    try {
        // Find the user by email
        const user = await Customer.findOne({ email });

        if (!user) {
            // If no user found with the provided email
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user)
        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log(isPasswordMatch)
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        console.log(user.password)
        if (isPasswordMatch) {
            // If passwords match
            console.log('Password match result:', isPasswordMatch);
            if(password===process.env.ADMIN_SECRET && r ==='ADMIN'){
                return res.status(200).json({ message: 'User found',role: "ADMIN" });
            }
            else if(password===process.env.DELIVERY_SECRET && r==='DELIVERY BOY'){
                return res.status(200).json({ message: 'User found',role: "DELIVERY BOY" });
            }
            else{
                return res.status(200).json({ message: 'User found',role: "CUSTOMER" });
            }
        } else {
            // If passwords do not match
            return res.status(401).json({ message: 'Invalid password' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}


async function addToWishlist(req, res) {
    const email = req.params.id1
    const itemId = req.params.id2
   
    try {
        // Find the customer by their email
        const customer = await Customer.findOne({ email });
    
        if (!customer) {
          return res.status(404).json({ message: 'Customer not found' });
        }
    
        // Add item to wishlist if not already added
        if (!customer.wishList.includes(itemId)) {
          customer.wishList.push(itemId);
          await customer.save();
          return res.status(200).json({ message: 'Item added to wishlist' });
        } else {
          return res.status(400).json({ message: 'Item already in wishlist' });
        }
      } catch (err) {
        console.error('Error adding item to wishlist:', err);
        return res.status(500).json({ message: 'Server error' });
      }
}

async function removeFromWishlist(req,res){
    const email = req.params.id
    const {itemId} = req.body
    console.log(itemId)
    try{
        const customer = await Customer.findOne({email:email}).populate('wishList')
        if(!customer){
            return res.status(404).json({message:'Customer not found'})
        }
        
        customer.wishList=  customer.wishList.filter((item)=> item._id.toString()!==itemId)
        
        await customer.save()
        // console.log(customer)
        return res.status(200).json({ message: 'Item removed from wishlist' });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error removing item from wishlist' });
      }
}

module.exports = {
    createCustomer,
    showCustomer,
    validateCustomer,
    updateProfile,
    addToWishlist,
    removeFromWishlist
};
