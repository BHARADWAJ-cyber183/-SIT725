const VulnerabilityModel = require('../models/vulnerabilityModel');

const scan = (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  const vulnerabilities = VulnerabilityModel.scanWebsite(url);
  VulnerabilityModel.saveScanResults({ url, vulnerabilities });
  res.json({ url, vulnerabilities });
};

const getScanResults = (req, res) => {
  const results = VulnerabilityModel.loadScanResults();
  res.json(results);
};

module.exports = { scan, getScanResults };
