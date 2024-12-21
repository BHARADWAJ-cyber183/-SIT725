// Import necessary libraries
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Ensure this path is correct, based on where your Express server is located

chai.use(chaiHttp);

// Write your test cases
describe('Web Vulnerability Scanner Tests', () => {
  describe('Controller: scan', () => {
    it('should return vulnerabilities when given a valid URL', (done) => {
      chai.request(server)
        .post('/scan')
        .send({ url: 'http://example.com' })
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.be.an('object');
          chai.expect(res.body).to.have.property('url').equal('http://example.com');
          chai.expect(res.body).to.have.property('vulnerabilities').that.is.an('array');
          done();
        });
    });

    it('should return 400 if URL is missing', (done) => {
      chai.request(server)
        .post('/scan')
        .send({})
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.have.property('message').equal('URL is required');
          done();
        });
    });
  });
});
