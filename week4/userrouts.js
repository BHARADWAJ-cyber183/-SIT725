// server/routes/userRoutes.js
 
const express = require('express');
const User = require('../models/User');
const router = express.Router();
 
// Route to create a new user
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);  // Create a new user based on the data from the client
    await user.save();  // Save the user to MongoDB
    res.status(201).json(user);  // Respond with the saved user
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
 
// Route to get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();  // Find all users in the database
    res.status(200).json(users);  // Respond with the list of users
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
module.exports = router;