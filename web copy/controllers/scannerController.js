const scannerModel = require("../models/scannerModel");
const { ObjectId } = require("mongodb");
const connectDB = require("../models/database"); // Ensure the database connection is correctly imported

// ✅ Function to scan a website
async function scanWebsite(req, res) {
    console.log("📌 scanWebsite function is being called");

    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: "❌ Please provide a URL to scan, e.g., /scan?url=https://example.com" });
    }

    try {
        console.log("🔍 Scanning for XSS and SQL Injection...");
        const xssResults = await scannerModel.checkXSS(url);
        const sqlResults = await scannerModel.checkSQLInjection(url);

        const db = await connectDB();
        const collection = db.collection("scanResults");

        const scanResult = { url, xssResults, sqlResults, scannedAt: new Date() };

        console.log("📌 Attempting to insert into MongoDB:", scanResult);
        const insertResult = await collection.insertOne(scanResult);
        console.log("✅ Scan result inserted:", insertResult);

        res.json({ message: "✅ Scan successful", scanResult });
    } catch (error) {
        console.error("❌ Error during scanning:", error);
        res.status(500).json({ error: `❌ Error scanning the URL: ${error.message}` });
    }
}

// ✅ Function to get all scan results
async function getScanResults(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("scanResults");
        const results = await collection.find({}).toArray();

        res.json(results);
    } catch (error) {
        console.error("❌ Error fetching scan results:", error);
        res.status(500).json({ error: "❌ Failed to fetch scan results" });
    }
}

// ✅ Function to delete a scan result
async function deleteScanResult(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("scanResults");

        const scanId = req.params.id;
        if (!ObjectId.isValid(scanId)) {
            return res.status(400).json({ error: "❌ Invalid ObjectId format" });
        }

        const objectId = new ObjectId(scanId);
        const deleteResult = await collection.deleteOne({ _id: objectId });

        if (deleteResult.deletedCount === 1) {
            res.json({ message: "✅ Scan result deleted successfully." });
        } else {
            res.status(404).json({ error: "❌ No record found with the given ID." });
        }
    } catch (error) {
        console.error("❌ Error deleting scan result:", error);
        res.status(500).json({ error: "❌ Failed to delete scan result" });
    }
}

// ✅ Make sure to export all functions correctly
module.exports = { scanWebsite, getScanResults, deleteScanResult };
