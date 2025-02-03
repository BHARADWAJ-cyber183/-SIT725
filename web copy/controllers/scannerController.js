const scannerModel = require('../models/scannerModel');  // ✅ Import the entire module

async function scanWebsite(req, res) {
    console.log("scanWebsite function is being called");

    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'Please provide a URL to scan, e.g., /scan?url=https://example.com' });
    }

    try {
        console.log("Scanning for XSS and SQL Injection..."); // Debugging

        const xssResults = await scannerModel.checkXSS(url);  // ✅ Use scannerModel.checkXSS()
        const sqlResults = await scannerModel.checkSQLInjection(url);  // ✅ Use scannerModel.checkSQLInjection()

        res.json({
            url,
            xssResults,
            sqlResults
        });
    } catch (error) {
        console.error(`Error during scanning: ${error.message}`); // Debugging
        res.status(500).json({ error: `Error scanning the URL: ${error.message}` });
    }
}

console.log("Exporting scanWebsite function:", scanWebsite);
module.exports = { scanWebsite };
