const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
var request = require('supertest');
process.env.TESTING = true;
var server = require('../server/app');

describe('Endpoints', function() {
  describe('/api', function() {
    describe('use /test', function() {
      it('should push to the array for later testing', function(done) {
        request(server.server)
          .post('/api/test')
          .type('json')
          .send(JSON.stringify({src:'testSrc', 
                                dest:'testDest', 
                                url:'testUrl', 
                                response: 'testResp', 
                                when: Date.now()}))
          .set('Accept', /application\/json/)
          .expect(200, done);
      });
    });
    describe('get /data', function() {
      it('should return an array', function(done) {
        const testData = (err, resp) => {
          expect(resp.body).to.be.an('array');
          expect(resp.body.length).to.eql(1);
          var {src, dest, url, response, when} = resp.body[0];
          expect(src).to.be.a('string');
          expect(dest).to.be.a('string');
          expect(url).to.be.a('string');
          expect(response).to.be.a('string');
          expect(when).to.be.a('number');
          done();
        }
        request(server.server)
          .get('/api/data')
          .expect(200, testData);
      });
    });
  })
});
describe('Verify Endpoints', function() {
  describe('post /verified', function() {
    it('should post to the verified queue', function(done) {
      const testUrl = 'http://res.cloudinary.com/urbandictionary/image/upload/a_exif,c_fit,h_200,w_200/v1396913907/vtimxrajzbuard4hsj78.jpg';
      request(server.server)
        .post('/api/verified')
        .type('json')
        .send(JSON.stringify({url: testUrl}))
        .expect(202, done);
    })
  });
  describe('get /verified', function() {
    it('should return from the verified queue as []', function(done) {
      const verifyData = (err, resp) => {
        expect(resp.body).to.be.an('array');
        expect(resp.body[0].base64).to.be.a('string');
        expect(resp.body[0].when).to.be.a('number');
        done();
      };
      setTimeout(()=>{

      request(server.server)
        .get('/api/verified')
        .expect(200, verifyData);
      },1200);
    });
  });
  describe('delete /clear', function() {
    it('should remove everything from the array', function(done) {
      request(server.server)
        .delete('/api/clear')
        .expect(200, done);
    });
  });
});

server.server.close();