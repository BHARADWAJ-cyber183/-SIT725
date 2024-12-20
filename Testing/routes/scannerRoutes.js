const express = require('express');
const { scan, getScanResults } = require('../controllers/scannerController');

const router = express.Router();

router.post('/scan', scan);
router.get('/results', getScanResults);

module.exports = router;
