const { checkXSS, checkSQLInjection } = require('../models/scannerModel');

async function scanWebsite(req, res) {
    console.log("scanWebsite function is being called"); // Debugging statement

    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'Please provide a URL to scan, e.g., /scan?url=https://example.com' });
    }

    try {
        const xssResults = await checkXSS(url);
        const sqlResults = await checkSQLInjection(url);
        
        res.json({
            url,
            xssResults,
            sqlResults
        });
    } catch (error) {
        res.status(500).json({ error: `Error scanning the URL: ${error.message}` });
    }
}

console.log("Exporting scanWebsite function:", scanWebsite); // Debugging statement
module.exports = { scanWebsite };
