const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const VulnerabilityModel = require('../models/vulnerabilityModel');
const { expect } = chai;

chai.use(chaiHttp);

describe('Web Vulnerability Scanner Tests', () => {
  describe('Controller: scan', () => {
    it('should return vulnerabilities when given a valid URL', (done) => {
      chai.request(server)
        .post('/scan')
        .send({ url: 'http://example.com' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('url').equal('http://example.com');
          expect(res.body).to.have.property('vulnerabilities').that.is.an('array');
          done();
        });
    });

    it('should return 400 if URL is missing', (done) => {
      chai.request(server)
        .post('/scan')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').equal('URL is required');
          done();
        });
    });
  });

  describe('Model: scanWebsite', () => {
    it('should return an array of vulnerabilities', () => {
      const url = 'http://example.com';
      const vulnerabilities = VulnerabilityModel.scanWebsite(url);
      expect(vulnerabilities).to.be.an('array');
      expect(vulnerabilities).to.have.length.greaterThan(0);
    });
  });

  describe('Model: saveScanResults and loadScanResults', () => {
    it('should save and load scan results', () => {
      const scanResult = { url: 'http://example.com', vulnerabilities: [] };
      VulnerabilityModel.saveScanResults(scanResult);

      const results = VulnerabilityModel.loadScanResults();
      expect(results).to.be.an('array');
      expect(results[0]).to.deep.equal(scanResult);
    });
  });
});
