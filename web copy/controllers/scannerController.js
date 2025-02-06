const scannerModel = require("../models/scannerModel");
const connectDB = require("../models/database"); // ✅ Correct import

async function scanWebsite(req, res) {
    console.log("📌 scanWebsite function is being called");

    const { url } = req.query;
    if (!url) {
        console.log("❌ No URL provided");
        return res.status(400).json({ error: "Please provide a URL to scan, e.g., /scan?url=https://example.com" });
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
        console.log("✅ Scan result inserted into MongoDB:", insertResult);

        res.json({ message: "✅ Scan successful", scanResult });
    } catch (error) {
        console.error("❌ Error during scanning:", error);
        res.status(500).json({ error: `Error scanning the URL: ${error.message}` });
    }
}

// ✅ Fetch Scan Results
async function getScanResults(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("scanResults");
        const results = await collection.find().toArray();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: "❌ Failed to fetch scan results" });
    }
}

// ✅ Delete a Scan Result
async function deleteScanResult(req, res) {
    try {
        const { id } = req.params;
        const db = await connectDB();
        const collection = db.collection("scanResults");

        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            res.json({ message: "✅ Scan result deleted successfully" });
        } else {
            res.status(404).json({ error: "❌ Scan result not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "❌ Failed to delete scan result" });
    }
}

module.exports = { scanWebsite, getScanResults, deleteScanResult };
