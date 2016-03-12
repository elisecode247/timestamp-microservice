var sugar = require('sugar-date')

var timeobject = {
  unix: null,
  natural: null
}

module.exports = function(parameter){
  var myRe = /[^\d-]/i; // find any character that is not a digit nor hyphen (for negative integers)
  var naturalDate = Date.create(parameter);
  var timestamp = Date.utc.create(parseInt(parameter));

  if (!myRe.test(parameter)) { // if param is an integer
    if (timestamp.format('{Month} {d}, {yyyy}') === "Invalid Date") { // invalid unix date
      return timeobject 
    }
    else { // valid unix date
      timeobject.unix = parameter;
      timeobject.natural = timestamp.format('{Month} {d}, {yyyy}');
      return timeobject 
    }
  }
  else if (naturalDate.isValid() === true) { //valid natural date
    timeobject.unix = Date.parse(naturalDate);
    timeobject.natural = naturalDate.format('{Month} {d}, {yyyy}');
    return timeobject
  }
  else { // no valid date formats
    console.log("error")
    timeobject.unix = null;
    timeobject.natural = null;
    return timeobject
  }
}