const request = require('supertest');
const app = require('../server');

describe('Web Vulnerability Scanner Tests', () => {
  describe('POST /scan', () => {
    it('should return vulnerabilities for a valid URL', async () => {
      const response = await request(app)
        .post('/scan')
        .send({ url: 'http://example.com' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.url).toBe('http://example.com');
      expect(Array.isArray(response.body.vulnerabilities)).toBe(true);
    });

    

    it('should return error for missing URL', async () => {
      const response = await request(app)
        .post('/scan')
        .send({})
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('URL is required.');
    });
  });
});
