const { checkXSS, checkSQLInjection } = require('../models/scannerModel');

describe('Vulnerability Model Tests', () => {

    test('Test Case 1: checkXSS should return an array of vulnerabilities', async () => {
        const results = await checkXSS('https://example.com');
        expect(Array.isArray(results)).toBe(true);
    });

    test('Test Case 2: checkSQLInjection should return an array of vulnerabilities', async () => {
        const results = await checkSQLInjection('https://example.com');
        expect(Array.isArray(results)).toBe(true);
    });

});
