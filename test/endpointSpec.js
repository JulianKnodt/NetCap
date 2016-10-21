const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
var server = require('../server/app');

describe('Endpoints', function() {
  beforeEach(function() {
    
  })
  describe('/api', function() {
    describe('get /data', function() {
      it('should return an array', function() {

      });
    });
    describe('delete /clear', function() {
      it('should remove everything from the array')
    });
  })
});

server.server.close();