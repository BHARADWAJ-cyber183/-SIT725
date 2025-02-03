const express = require('express');
const path = require('path');
const scannerRoutes = require('./routes/scannerRoutes');

const app = express();
const PORT = 5098;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.use('/', scannerRoutes);

let server = null; // Store the server instance

// Start the server only if NOT in test mode
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
  });
}

// Export the app and server instance
module.exports = { app, server };
