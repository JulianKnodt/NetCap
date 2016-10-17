const sizeof = require('sizeof').sizeof;
const hashSimple = require('hash-it');
const LinkedList = require('linkedlist');

const hookTemplate = {enqueue:{},dequeue:{},shrink:{},expand:{},squelch:{},dequeueInterval:{}};

class limitedQueue {
  constructor(length, limitedQueue) {
    this.length = length || 10;
    this.storage = new LinkedList();
    if (limitedQueue) {
      while(limitedQueue.storage.length > this.length) {
        limitedQueue.storage.shift();
      }
      this.storage = limitedQueue.storage;
    }

    this.hooks = Object.assign({}, hookTemplate);
  }
  enqueue(item) {
    let old;
    if (this.storage.length === this.length) {
       old = this.storage.shift();
    }
    this.storage.push(item);
    return old ? old : undefined;
  }
  dequeue() {
    if (this.storage.length) {
      return this.storage.shift();
    }
  }
  shrink(length) {
    if(length <= this.length) {
      this.length = length;
      this._fitToLength();
    } else {
      this.expand(length);
    }
  }
  expand(length) {
    if(length > this.length) {
      this.length = length
    } else {
      this.shrink(length);
    }
  }
  _fitToLength() {
    while(this.storage.length > this.length) {
      this.storage.shift();
    }
  }
  size() {
    return this.storage.length;
  }
  clear() {
    delete this.storage;
    delete this.hooks;
    this.hooks = Object.assign({}, hookTemplate);
    this.storage = new LinkedList();
  }
  _min() {
    for(var i = 0; i < Math.ceil(this.length/100); i++) {
      this.storage.next();
      this.storage.removeCurrent();
    }
  }
  squelch(bytes) {
    if(sizeof(this.storage) + sizeof(new LinkedList()) > bytes/*Bytes*/) {
      while(sizeof(this.storage) > bytes) {
        this._min(); 
      }
    }
  }
  on(key, callback) {
    if(this.hooks[key]) {
      var hashed = hashSimple(callback);
      this.hooks[key][hashed] = callback;
      return hashed;
    }
    return false;
  }
  off(key, hash) {
    delete this.hooks[key][hash];
  }
  _runHooks(key, item) {
    for(var hook in this.hooks[key]) {
      hook(item);
    }
  }
  dequeueInterval(time, callback) {
    if(this.size()) {
      setTimeout(() => {
        var next = this.dequeue;
        this._runHooks('dequeueInterval', next);
        callback ? callback(next) : '';
        this.dequeueInterval(time, callback);
      }, time);
    }
  }
}

module.exports = limitedQueue;