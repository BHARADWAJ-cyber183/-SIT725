const express = require("express");
const path = require("path");
const scannerRoutes = require("./routes/scannerRoutes");
const { connectDB } = require("./models/database"); // ✅ Correctly importing connectDB

const app = express();
const PORT = 5198;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

// Start the server only after MongoDB is connected
async function startServer() {
    try {
        const db = await connectDB(); // ✅ Await the database connection
        console.log("🚀 Database connection successful");

        app.locals.db = db; // Store database reference for later use

        let server = app.listen(PORT, () => {
            console.log(`✅ Server is running on http://127.0.0.1:${PORT}`);
        });

        module.exports = { app, server };
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1); // Exit the process if database connection fails
    }
}

startServer(); // ✅ Call the async function to start server
