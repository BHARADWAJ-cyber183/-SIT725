require("dotenv").config();
const express = require("express");
const path = require("path");
const { connectDB } = require("./models/database"); // MongoDB Connection
const scannerRoutes = require("./routes/scannerRoutes");

const app = express();
const PORT = 5208;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

// Routes
app.use("/", scannerRoutes);

let server = null;
if (process.env.NODE_ENV !== "test") {
  server = app.listen(PORT, () => {
    console.log(`✅ Server is running on http://127.0.0.1:${PORT}`);
  });
}

module.exports = { app, server };
