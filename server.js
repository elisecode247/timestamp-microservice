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
  var myRe = /[^\d-]/i; // find any character that is not a digit nor hyphen (for negative integers)
  var naturalDate = Date.create(req.params.string);
  var timestamp = Date.utc.create(parseInt(req.params.string));

  if (!myRe.test(req.params.string)) { // if param is an integer
    if (timestamp.format('{Month} {d}, {yyyy}') === "Invalid Date") { // invalid unix date
      res.send(timeobject) 
    }
    else { // valid unix date
      timeobject.unix = req.params.string;
      timeobject.natural = timestamp.format('{Month} {d}, {yyyy}');
      res.send(timeobject) 
    }
  }
  else if (naturalDate.isValid() === true) { //valid natural date
    timeobject.unix = Date.parse(naturalDate);
    timeobject.natural = naturalDate.format('{Month} {d}, {yyyy}');
    res.send(timeobject)
  }
  else { // no valid date formats
    console.log("error")
    timeobject.unix = null;
    timeobject.natural = null;
    res.send(timeobject)
  }
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  console.log('app is now listening on port 3000');
});
