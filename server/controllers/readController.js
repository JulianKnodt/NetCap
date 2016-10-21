const fs = require('fs');
const path = require('path')
const q = require('limitedQueue');
const watchPath = require('./fileWatcher');
const storePath = path.resolve(__dirname + '/../../savedData/data.txt');
const screenCap = require('./phantomCapture');

var memStorage = new q.LimitedQueue(100);
var verified = new q.LimitedQueue(100);
var toScreenshot = new q.AutoQueueBalancer((item, done) => {
  screenCap(item.url,(img) => {
    verified.enqueue({base64:img, time:item.time});
    done();
  });
}, 5);

var prevLength = 0;


const modules = {
  get: (req, res) => {
    res.json(memStorage.toArray());
  },
  getVerified: (req, res) => {
    res.json(verified.toArray().sort((a, b) => {
      return a.time > b.time;
    }));
  },
  pushData: (data) => {
    memStorage.enqueue(data);
  },
  post: (req, res) => {
    memStorage.enqueue(req.body);
    res.sendStatus(200);
  },
  verify: (req, res) => {
    toScreenshot.delegate({ url :req.body.url, time: Date.now() });
    res.sendStatus(202);
  },
  delete: (req, res) => {
    memStorage.clear();
    fs.writeFile(storePath, '', () => {
      prevLength = 0;
    });
    res.sendStatus(200);
  },
  deleteVerified: (req, res) => {
    verified.clear();
    res.sendStatus(200);
  },
  updateLength: (req, res) => {
    memStorage.expand(req.body);
    res.sendStatus(200);
  }
};

watchPath(storePath, (eventName, fileName) => {
  fs.readFile(storePath, (err, data) => {
    let newData = data.slice(prevLength);
    prevLength = data.length;
    let parseable = newData.toString().split('\n');
    let packetObj = {};
    parseable.forEach((packet,index) => {
      if(packet.indexOf('-- -- -->') !== -1) {
        packetObj.src = packet.slice(packet.indexOf('[') + 1, packet.indexOf(']'));
        packetObj.dest = packet.slice(packet.lastIndexOf('[') + 1, packet.lastIndexOf(']'));
        packetObj.url = parseable[index + 1];
        packetObj.response = parseable[index + 2];
        packetObj.when = Date.now();
        modules.pushData(packetObj);
        packetObj = {};
      }
    });
  });
});

module.exports = modules;
