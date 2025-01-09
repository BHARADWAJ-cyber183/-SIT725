const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const scannerController = require('./controllers/scannerController');

const app = express();
const PORT = 7799;

// Create an HTTP server for WebSocket integration
const server = http.createServer(app);
const io = new Server(server);

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

// WebSocket connection for real-time updates and random number broadcasting
io.on('connection', (socket) => {
  console.log('A user connected');

  // Emit random numbers to the client every 2 seconds
  const interval = setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    socket.emit('number', { number: randomNumber });
  }, 2000);

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    clearInterval(interval); // Clear interval when the client disconnects
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
