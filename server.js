var express = require('express');
var app = express();
var timestampMS = require('./routes/timestamp');

app.use(express.static('views'));

app.get('/', function(req, res) {
  res.send('index');
});

app.get('/:string', function(req, res) {
  res.send(timestampMS(req.params.string));
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  console.log('app is now listening on port 3000');
});
