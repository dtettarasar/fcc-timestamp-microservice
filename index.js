// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", (req, res) => {
  const dateTimeStamp = Date.now();
  const dateUTC = new Date(dateTimeStamp).toUTCString();
  const jsonToPost = {};
  jsonToPost.unix = dateTimeStamp;
  jsonToPost.utc = dateUTC;
  res.json(jsonToPost);
})

app.get("/api/:date", (req, res) => {
  const dateReq = req.params.date;
  const dateObj = new Date(dateReq);
  const jsonToPost = {}
  const unixDateRegex = /^(\d{1,13})?$/gm;

  //console.log(dateReq.match(unixDateRegex));

  if (dateReq.match(unixDateRegex)) {
    const dateUTC = new Date(parseInt(dateReq)).toUTCString();
    //console.log(dateUTC);
    jsonToPost.unix = parseInt(dateReq);
    jsonToPost.utc = dateUTC;
  } else if (dateObj.toString() !== "Invalid Date") {
    //const dateObj = new Date(dateReq);
    jsonToPost.unix = Math.floor(dateObj.getTime());
    jsonToPost.utc = dateObj.toUTCString();
  } else {
    jsonToPost.error = "Invalid Date";
  }
  
  /*
  if (dateObj.toString() === "Invalid Date") {
    console.log("attention la date est invalide!!!");
    jsonToPost.error = "Invalid Date";
  } else {
    jsonToPost.unix = Math.floor(dateObj.getTime());
    jsonToPost.utc = dateObj.toUTCString();
  }*/
  
  res.json(jsonToPost);
});

app.get("/:word/echo", (req, res) => {
  console.log(req.params.word);
  res.json({echo: req.params.word});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
