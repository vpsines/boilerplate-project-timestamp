// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// your first API endpoint...
app.get("/api/", function (req, res) {
  let date = new Date();

  // get utc and unix
  let unixValue = date.valueOf();
  let utcValue = date.toUTCString();

  res.json({ unix: unixValue, utc: utcValue });
});

// date API endpoint
app.get("/api/:date", function (req, res) {
  // extract req parameter
  let dateInString = req.params.date;
  var date;

  // check if unix format
  if (/^-?[\d.]+(?:e-?\d+)?$/.test(dateInString)) {
    date = new Date(parseInt(dateInString));
  } else {
    date = new Date(dateInString);
  }

  if (date instanceof Date && isFinite(date.getTime())) {
    // get utc and unix
    let unixValue = date.valueOf();
    let utcValue = date.toUTCString();

    res.json({ unix: unixValue, utc: utcValue });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
