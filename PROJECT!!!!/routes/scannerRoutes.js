const express = require('express');
const scannerController = require('../controllers/scannerController');
const router = express.Router();

router.post('/scan', scannerController.scan);

module.exports = router;
