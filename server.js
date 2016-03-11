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
  var myRe = /\D/i;
  if (!myRe.test(req.params.string)) {
    console.log("unix format")
    var timestamp = Date.utc.create(parseInt(req.params.string));
    if (Date.create(timestamp).format('{Month} {d}, {yyyy}') === "Invalid Date") {
      res.send(timeobject)
      console.log("not valid unix format")
    }
    else {
      timeobject.unix = req.params.string;
      timeobject.natural = Date.create(timestamp).format('{Month} {d}, {yyyy}');
      res.send(timeobject)
      console.log("valid unix format")
    }
  }
  else if (new Date(req.params.string).isValid() === true) {
    var naturalDate = Date.create(req.params.string);
    console.log("valid natural format")
    timeobject.unix = Date.parse(naturalDate);
    timeobject.natural = Date.create(naturalDate).format('{Month} {d}, {yyyy}');
    res.send(timeobject)
  }
  else {
    console.log("error")
    timeobject.unix = null;
    timeobject.natural = null;
    res.send(timeobject)
  }
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  console.log('app is now listening on port 3000');
});
