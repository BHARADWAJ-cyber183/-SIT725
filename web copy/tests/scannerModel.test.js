const request = require('supertest');
const { app, server } = require('../server'); // Import app and server

describe('Scanner Controller Tests', () => {
    
    test('Test Case 1: Should return error when URL is not provided', async () => {
        const response = await request(app).get('/scan');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Please provide a URL to scan, e.g., /scan?url=https://example.com');
    });

    test('Test Case 2: Should return vulnerabilities when a valid URL is provided', async () => {
        const response = await request(app).get('/scan?url=https://example.com');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('url');
        expect(response.body).toHaveProperty('xssResults');
        expect(response.body).toHaveProperty('sqlResults');
    });

});

// Close the server after all tests
afterAll((done) => {
    if (server) {
        server.close(done);
    } else {
        done();
    }
});
