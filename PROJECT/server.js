const express = require('express');
const path = require('path');
const scannerController = require('./controllers/scannerController');

const app = express();
const PORT = 7100;

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/scan', scannerController.scan);

app.get('/result', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'result.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
