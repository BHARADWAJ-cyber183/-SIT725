const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
    res.json({ status: 'Web Vulnerability Scanner is running.' });
});

module.exports = router;
