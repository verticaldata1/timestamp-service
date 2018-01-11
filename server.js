// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var path = require("path");

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/:timestamp", function(req, res) {
  var timestamp = req.params.timestamp;
  
  //if all numbers, check if unix timestamp
  if (!isNaN(timestamp)) {
    var date = new Date(timestamp * 1000);
    var dateFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    var natural = date.toLocaleDateString("en-us", dateFormatOptions);
    var unix = parseInt(timestamp);
    res.json({unix: unix, natural: natural});
    return;
  }
  else {
    var date = Date.parse(timestamp);
    if(isNaN(date)) {    
      res.status(400);
      res.json({unix: "null", natural: "null"});
      return;
    }
    var unix = date / 1000;
    res.json({unix: unix, natural: timestamp});
    return;
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
