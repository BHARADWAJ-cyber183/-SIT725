const express = require('express');
const path = require('path');
const scannerRoutes = require('./routes/scannerRoutes');

const app = express();
const PORT = 9298;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', scannerRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/result', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'result.html'));
});

module.exports = app;

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
  });
}
