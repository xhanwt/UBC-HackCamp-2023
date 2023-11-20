// routes/authRoutes.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    console.log('Entered email:', email);
    console.log('Entered password:', password);
    console.log('Stored password:', user.password);

    if(password !== user.password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    return res.json({ success: true, user });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle user registration
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, gender, healthCardNumber } = req.body;

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }


    // Create a new user
    const newUser = new User({
      email,
      password,
      name,
      gender,
      healthCardNumber,
    });

    // Save the user to the database
    await newUser.save();

    // Return a success response
    res.json({ success: true });

  } catch (error) {
    console.error('Signup error:', json.stringify(error));
    res.status(500).json({ error });
  }
});

router.post('/add-medication', async (req, res) => {
  const { userId, medication } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.addMedication(medication);

    res.json({ success: true, user });
  } catch (error) {
    console.error('Error adding medication:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;