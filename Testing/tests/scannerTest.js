const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const { expect } = chai;

chai.use(chaiHttp);

describe('Web Vulnerability Scanner API', () => {
  it('should return vulnerabilities for a valid URL', (done) => {
    chai
      .request(server)
      .post('/api/scan')
      .send({ url: 'https://example.com' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('url');
        expect(res.body).to.have.property('vulnerabilities').that.is.an('array');
        done();
      });
  });

  it('should return an error if URL is missing', (done) => {
    chai
      .request(server)
      .post('/api/scan')
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message', 'URL is required');
        done();
      });
  });

  it('should load previous scan results', (done) => {
    chai
      .request(server)
      .get('/api/results')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
