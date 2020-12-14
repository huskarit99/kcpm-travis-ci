const { expect } = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');
var should = require('should');
chai.use(chaiHttp);
let server = require('../CI-Test');

describe('Test All App', () => {
  describe('GET /numberStudent', () => {
    it('it should GET integer', (done) => {
      chai.request(server)
        .get('/numberStudent')
        .end((err, res) => {
          expect(res.body.numberStudent).to.be.an('number');
          done();
        })
    })
  })
  describe('GET /bestStudent', () => {
    it('it should GET a best student or 0', (done) => {
      chai.request(server)
        .get('/bestStudent')
        .end((err, res) => {
          (res.body.bestStudent.length).should.be.belowOrEqual(1);
          done();
        })
    })
  })
})