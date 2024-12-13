const { performScan } = require('../models/scannerModel');

const scanWebsite = (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).send('URL is required');
    }
    const scanResult = performScan(url);
    res.status(200).json(scanResult);
};

module.exports = { scanWebsite };
