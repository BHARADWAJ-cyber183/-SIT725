// server/models/User.js
 
const mongoose = require('mongoose');
 
// Define the schema for the User model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
 
// Create the User model based on the schema
const User = mongoose.model('User', userSchema);
 
module.exports = User;