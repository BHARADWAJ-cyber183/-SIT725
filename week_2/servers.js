var express = require("express");
var app = express();

// Middleware to serve static files and parse JSON and URL-encoded data
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define the port
var port = process.env.port || 3000;

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
                message: `The addition of two numbers is: ${result}`
    });
});

// Start the server
app.listen(port, () => {
    console.log("App listening to: " + port);
});
