const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

// Function to check for XSS vulnerabilities
async function checkXSS(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    let vulnerabilities = [];
    $('input, textarea').each((index, element) => {
      const name = $(element).attr('name') || 'unknown';
      vulnerabilities.push(`Potential XSS in input/textarea with name: ${name}`);
    });
    return vulnerabilities;
  } catch (error) {
    console.error(`Error fetching URL for XSS scan: ${error.message}`);
    return [`Failed to scan ${url} for XSS vulnerabilities.`];
  }
}

// Function to check for SQL Injection vulnerabilities
async function checkSQLInjection(url) {
  try {
    const testPayload = "' OR '1'='1";
    const testUrl = `${url}?test=${encodeURIComponent(testPayload)}`;
    const response = await axios.get(testUrl);
    const sqlErrorPatterns = [
      /sql syntax/i,
      /unclosed quotation mark/i,
      /mysql_fetch/i,
      /syntax error/i,
    ];
    const vulnerabilities = sqlErrorPatterns.some((pattern) =>
      pattern.test(response.data)
    )
      ? [`Potential SQL Injection detected at ${testUrl}`]
      : [`No SQL Injection vulnerability detected at ${url}`];
    return vulnerabilities;
  } catch (error) {
    console.error(`Error fetching URL for SQL Injection scan: ${error.message}`);
    return [`Failed to scan ${url} for SQL Injection vulnerabilities.`];
  }
}

// Route to perform scanning
router.get('/scan', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('Please provide a URL to scan, e.g., /scan?url=https://example.com');
  }
  try {
    const xssResults = await checkXSS(url);
    const sqlResults = await checkSQLInjection(url);
    res.json({
      url,
      xssResults,
      sqlResults,
    });
  } catch (error) {
    res.status(500).send(`Error scanning the URL: ${error.message}`);
  }
});

module.exports = router;
