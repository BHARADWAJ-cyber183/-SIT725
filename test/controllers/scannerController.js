const VulnerabilityModel = require('../models/vulnerabilityModel');

const scan = (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ message: 'URL is required.' });
  }

  const vulnerabilities = VulnerabilityModel.scanWebsite(url);
  res.json({ url, vulnerabilities });
};

module.exports = { scan };
