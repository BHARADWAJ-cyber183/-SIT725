const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Initialize Express App
const app = express();
app.use(bodyParser.json());

// MongoDB Connection (Database name set to 'mongodb')
const mongoURI = "mongodb://localhost:27017/mongodb"; // 'mongodb' is now the database name
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected to database 'mongodb'"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a Schema and Model
const socketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
});

const Socket = mongoose.model("Socket", socketSchema);

// API Routes
// Get all sockets
app.get("/sockets", async (req, res) => {
  try {
    const sockets = await Socket.find();
    res.json(sockets);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Add a new socket
app.post("/sockets", async (req, res) => {
  try {
    const newSocket = new Socket(req.body);
    await newSocket.save();
    res.status(201).json(newSocket);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error saving data");
  }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
