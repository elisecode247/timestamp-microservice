var express = require('express');
var app = express();
var sugar = require('sugar-date')

var timeobject = {
  unix: null,
  natural: null
}

app.use(express.static('views'));

app.get('/', function(req, res) {
  res.send('index');
});

app.get('/:string', function(req, res) {
  if (Number.isInteger(parseInt(req.params.string,10)) === true ) {
    var timestamp = Date.utc.create(parseInt(req.params.string));
    if (Date.create(timestamp).format('{Month} {d}, {yyyy}') === "Invalid Date") {
      res.send(timeobject)
    }
    else {
       timeobject.unix = req.params.string;
      timeobject.natural = Date.create(timestamp).format('{Month} {d}, {yyyy}');
      res.send(timeobject)
    }
  }
  else if (new Date(req.params.string).isValid() === true) {
    var timestamp = Date.create(req.params.string);
    timeobject.unix = Date.parse(timestamp);
    timeobject.natural = Date.create(timestamp).format('{Month} {d}, {yyyy}');
    res.send(timeobject)
  }
  else {
    res.send(timeobject)
  }
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  console.log('app is now listening on port 3000!');
});
