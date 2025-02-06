const express = require("express");
const scannerController = require("../controllers/scannerController");

const router = express.Router();

// ✅ Define Scan Route
router.get("/scan", scannerController.scanWebsite);

// ✅ CRUD Routes for Scan Results
router.get("/results", scannerController.getScanResults);
router.delete("/result/:id", scannerController.deleteScanResult);

module.exports = router;
