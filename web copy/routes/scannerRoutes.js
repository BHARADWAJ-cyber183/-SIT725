const express = require("express");
const path = require("path");
const { scanWebsite, getScanResults, deleteScanResult } = require("../controllers/scannerController"); // ✅ Ensure proper imports

const router = express.Router();

// ✅ Route to serve home page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

// ✅ Route to scan a website
router.get("/scan", scanWebsite);

// ✅ CRUD Routes for MongoDB
router.get("/results", getScanResults);
router.delete("/result/:id", deleteScanResult);

module.exports = router;
