const express = require("express");
const path = require("path");
const scannerController = require("../controllers/scannerController");

const router = express.Router();

// Route to serve home page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

// Route to scan a website
router.get("/scan", scannerController.scanWebsite);

// CRUD Routes
router.get("/results", scannerController.getScanResults);
router.delete("/result/:id", scannerController.deleteScanResult);

module.exports = router;
