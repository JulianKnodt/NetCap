const fs = require('fs');

const watchPath = (pathName, callback) => {
  fs.watch(pathName, callback);
}

module.exports = watchPath;