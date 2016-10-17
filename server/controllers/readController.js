const fs = require('fs');
const LimitedQueue = require('limitedQueue');

var memStorage = new LimitedQueue(100);

const modules = {
  get: (req, res) => {
    res.send(dataArray);
  },
  pushData: (data) => {
    memStorage.enqueue(data);
  },
  post: (req, res) => {
    fs.readFile('../../savedData/data.txt', (err, data) => {

    });
  },
  delete: (req, res) => {
    memStorage.clear();
  }
};

module.exports = modules;