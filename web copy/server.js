const express = require('express');
const path = require('path');
const scannerRoutes = require('./routes/scannerRoutes');

const app = express();
const PORT = 5098; // Changed the port to 5098

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views'))); // Serve HTML files correctly

// Routes
app.use('/', scannerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
