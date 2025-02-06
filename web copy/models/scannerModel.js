const axios = require("axios");
const cheerio = require("cheerio");

async function checkXSS(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        let vulnerabilities = [];

        $("input, textarea").each((index, element) => {
            const name = $(element).attr("name") || "unknown";
            vulnerabilities.push(`Potential XSS in input/textarea with name: ${name}`);
        });

        return vulnerabilities;
    } catch (error) {
        console.error(`Error fetching URL for XSS scan: ${error.message}`);
        return [`Failed to scan ${url} for XSS vulnerabilities.`];
    }
}

async function checkSQLInjection(url) {
    try {
        const testPayload = "' OR '1'='1";
        const testUrl = `${url}?test=${encodeURIComponent(testPayload)}`;
        const response = await axios.get(testUrl);

        const sqlErrorPatterns = [/sql syntax/i, /unclosed quotation mark/i, /mysql_fetch/i, /syntax error/i];

        return sqlErrorPatterns.some((pattern) => pattern.test(response.data))
            ? [`Potential SQL Injection detected at ${testUrl}`]
            : [`No SQL Injection vulnerability detected at ${url}`];
    } catch (error) {
        console.error(`Error fetching URL for SQL Injection scan: ${error.message}`);
        return [`Failed to scan ${url} for SQL Injection vulnerabilities.`];
    }
}

module.exports = { checkXSS, checkSQLInjection };
