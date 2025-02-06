const express = require("express");
const path = require("path");
const scannerRoutes = require("./routes/scannerRoutes");
const connectDB = require("./models/database");

const app = express();
const PORT = 5098;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

// ✅ Start the server only after MongoDB is connected
async function startServer() {
    try {
        const db = await connectDB(); // ✅ Await the database connection
        console.log("🚀 Database connection successful");

        app.locals.db = db; // ✅ Store database reference in app.locals

        let server = app.listen(PORT, () => {
            console.log(`✅ Server is running on http://127.0.0.1:${PORT}`);
        });

        module.exports = { app, server };
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
}

startServer(); // ✅ Call the function to start the server
