const fs = require('fs');
const path = require('path')
const q = require('limitedQueue');
const watchPath = require('./fileWatcher');
const storePath = path.resolve(__dirname + '/../../savedData/data.txt');
const screenCap = require('./phantomCapture');

var memStorage = new q.LimitedQueue(100);
var verified = new q.LimitedQueue(25);
var toScreenshot = new q.AutoQueueBalancer((item, done) => {
  screenCap(item.url, (img) => {
    verified.enqueue({url: item.url, base64:img, when:item.time});
    done();
  });
}, 5);

var prevLength = 0;


const modules = {
  get: (req, res) => {
    res.json(memStorage.toArray().reverse());
  },
  getVerified: (req, res) => {
    res.json(verified.toArray().sort((a, b) => {
      return a.time < b.time;
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
    toScreenshot.delegate({ url:req.body.url, time: Date.now() });
    res.sendStatus(202);
  },
  verifyMany: (req, res) => {
    req.body.urls.reverse().forEach(url => {
      toScreenshot.delegate({ url: url, time: Date.now() });
    });
    res.sendStatus(202);
  },
  delete: (req, res) => {
    memStorage.clear();
    fs.writeFile(storePath, '', () => {
      prevLength = 0;
    });
    verified.clear();
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
        packetObj.url = parseable[index + 1];
        packetObj.response = parseable[index + 2];
        if(packetObj.url !== '200 OK' && packetObj.url !== '200%20OK' && packetObj.url !== ' 200%20OK' && packetObj.response !== '' && packetObj.response !== undefined) {
          packetObj.src = packet.slice(packet.indexOf('[') + 1, packet.indexOf(']'));
          packetObj.dest = packet.slice(packet.lastIndexOf('[') + 1, packet.lastIndexOf(']'));
          packetObj.when = Date.now();
          modules.pushData(packetObj);
        }
        packetObj = {};
      }
    });
  });
});

module.exports = modules;
