const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname + '/../client')));
let port = process.env.PORT || 5451;

const server = app.listen(port, ()=> {
  console.log('listening on port', port);
});

module.exports = {
  server
}
console.log(path.resolve(__dirname+ '/../client'));