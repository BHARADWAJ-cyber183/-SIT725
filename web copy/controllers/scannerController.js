const { ObjectId } = require("mongodb");

async function deleteScanResult(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("scanResults");

        const scanId = req.params.id;

        // ✅ Validate ObjectId before deleting
        if (!ObjectId.isValid(scanId)) {
            return res.status(400).json({ error: "❌ Invalid ObjectId format" });
        }

        // ✅ Convert scanId to MongoDB ObjectId
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

module.exports = { scanWebsite, getScanResults, deleteScanResult };
