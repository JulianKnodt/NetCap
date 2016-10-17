const chai = require('chai');
const limitedQueue = require('./limitedQueue');
const expect = chai.expect;
const assert = chai.assert;


describe('limited queue', function() {
  var lq = new limitedQueue(5);

  beforeEach(() => {
    lq.expand(5);
    lq.clear();
  });

  describe('enqueue', function() {
    it('should insert the value into the queues', function() {
      lq.enqueue('test');
      expect(lq.size()).to.equal(1);
      expect(lq.storage.head).to.equal('test');
    });
    it('should not be able to expand the queue past the size limit', function() {
      for (var i = 0; i < 10; i++) {
        lq.enqueue('test');
      }
      expect(lq.size()).to.equal(5);
    });
    it('should return elements that are shifted out when it gets too big', function() {
      var old;
      for(var i = 0; i < 10; i ++) {
        old = lq.enqueue('test');
      }
      expect(old).to.equal('test');
    });
  });

  describe('dequeue', function() {
    
    it('should remove the value from the queue in order', function() {
      lq.enqueue('test');
      lq.enqueue('another test');
      expect(lq.dequeue()).to.equal('test');
    });

    it('should return nothing if the queue is empty', function() {
      expect(lq.dequeue()).to.equal(undefined);
      expect(lq.size()).to.equal(0);
    });
  });

  describe('shrink', function() {
    it('should shrink the size of the storage', function() {
      lq.shrink(2);
      expect(lq.length).to.equal(2);
    });
    it('should keep the newest elements', function() {
      for (let i = 0; i < 5; i ++) {
        lq.enqueue(i);
      }
      lq.shrink(2);
      //Queue went from [0,1,2,3,4] to [3,4]
      expect(lq.storage.head).to.eql(3);
    });
  });

  describe('expand', function() {
    it('should increase the size of the storage', function() {
      lq.expand(10);
      for(let i = 0; i < 6; i ++) {
        lq.enqueue('first test');
      }
      expect(lq.length).to.equal(10);
      for(let i = 0; i < 15; i ++) {
        lq.enqueue('test');
      }
      expect(lq.size()).to.equal(10);
    });
  });

  describe('clear', function() {
    it('should remove everything from the queue', function() {
      lq.enqueue('test');
      lq.clear();
      expect(lq.size()).to.equal(0);
    });
  });
  describe('squelching', function() {
    it('should empty the queue when it becomes too large', function() {
      lq.expand(10000000);
      for(var i = 0; i < 10000; i ++) {
        lq.enqueue('bytes');
      }
      lq.squelch(104850);
      expect(lq.size()).to.not.eql(10000);
    });
    it('should change based on what is currently in the array', function() {
      lq.expand(100000);
      for(var i = 0; i < 10000; i ++) {
        lq.enqueue('tiny');
      }
      lq.squelch(1048576);
      let tiny = lq.size();
      lq.clear();
      for(var i = 0; i < 10000; i ++) {
        lq.enqueue('enormous huge very large gigantic big string that takes up a lot of bytes to test shrinking based on number of bytes');
      }
      lq.squelch(1048576);
      let large = lq.size();
      expect(tiny).to.not.eql(large);
    });
  });
  describe('on (hooks)', function() {
    it('shouldn\'t add hooks if they don\'t exist', function() {
      expect(lq.on('test', () => {
        console.log('test');
      })).to.be.false;
    });
    it('should add hooks properly', function() {
      expect(lq.on('enqueue', () => {console.log('test')})).to.be.a.number;
    });
    it('should run on event occurrence', function() {
      var counter = 0;
      lq.on('dequeueInterval', ()=>{counter ++});
      for (var i = 0; i < 5; i ++) {
        lq.enqueue(10);
      }
      lq.dequeueInterval(10);
      setTimeout(function() {
        expect(counter).to.eql(5);
      }, 500);
    });
  });
  describe('off (hooks)', function() {
    it('should remove hooks', function() {
      var counter = 0;
      var counterHook = lq.on('dequeueInterval', ()=>{counter ++});
      lq.off('dequeueInterval', counterHook);
      for (var i = 0; i < 5; i ++) {
        lq.enqueue(10);
      }
      lq.dequeueInterval(10);
      expect(counter).to.eql(0);
    });
  });
  describe('dequeueInterval', function() {
    it('should iterate over every item in the queue and empty it', function() {
      var testArr = [];
      for (var i = 0; i < 4; i ++) {
        lq.enqueue(i);
      }
      lq.dequeueInterval(10, function(item) {
        testArr.push(item);
      });
      setTimeout(() => {
        expect(testArr).to.eql([0,1,2,3]);
      }, 100);
    });
  });
});