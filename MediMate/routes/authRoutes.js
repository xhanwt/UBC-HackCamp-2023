// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // If the password matches, you can generate a token and send it to the client
    // For simplicity, we're just sending a success message here
    res.json({ success: true, user });

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
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
        gender,
        healthCardNumber,
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Return a success response
      res.json({ success: true });
  
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;