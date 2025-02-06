const express = require("express");
const path = require("path");
const scannerRoutes = require("./routes/scannerRoutes");
const { connectDB } = require("./models/database"); // ✅ Correctly importing connectDB

const app = express();
const PORT = 5728;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

// Connect to MongoDB before starting the server
async function startServer() {
    try {
        await connectDB();
        console.log("🚀 Database connection successful");

        let server = app.listen(PORT, () => {
            console.log(`✅ Server is running on http://127.0.0.1:${PORT}`);
        });

        module.exports = { app, server };
    } catch (error) {
        console.error("❌ Failed to start server:", error);
    }
}

startServer(); // ✅ Call the async function to start server
