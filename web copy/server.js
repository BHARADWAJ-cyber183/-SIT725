const express = require('express');
const path = require('path');
const scannerRoutes = require('./routes/scannerRoutes');

const app = express();
const PORT = 6098;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', scannerRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
