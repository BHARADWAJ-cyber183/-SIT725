const express = require("express");
const path = require("path");
const scannerRoutes = require("./routes/scannerRoutes"); // ✅ Import Routes
const connectDB = require("./models/database");

const app = express();
const PORT = 5206;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

// ✅ Register Routes
app.use("/", scannerRoutes);

async function startServer() {
    try {
        const db = await connectDB();
        console.log("🚀 Database connection successful");

        app.locals.db = db;

        let server = app.listen(PORT, () => {
            console.log(`✅ Server is running on http://127.0.0.1:${PORT}`);
        });

        module.exports = { app, server };
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
}

startServer();
