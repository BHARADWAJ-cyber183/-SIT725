var express = require("express");
var path = require("path");
var app = express();

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define the port
var port = process.env.port || 8999;

// Serve the index.html file for the root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Function to add two numbers
const addTwoNumber = (n1, n2) => {
    return n1 + n2;
};

// Endpoint to add two numbers
app.get("/addTwoNumber", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);

    // Validate input
    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ statusCode: 400, message: "Invalid input. Please provide two numbers." });
    }

    const result = addTwoNumber(n1, n2);

    // Respond with the result and a message
    res.json({
        statusCode: 200,
        data: result,
        message: `The addition of two numbers is: ${result}`
    });
});

// Start the server
app.listen(port, () => {
    console.log("App listening to: " + port);
});