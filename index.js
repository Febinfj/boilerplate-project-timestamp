var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", function (req, res) {
  let date = req.params.date;
  let dateObject;

  if (!date) {
    dateObject = new Date();
  } else if (/^\d+$/.test(date)) {
    // Treat as UNIX timestamp (in milliseconds)
    dateObject = new Date(parseInt(date));
  } else {
    // Treat as date string
    dateObject = new Date(date);
  }

  if (dateObject.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: dateObject.getTime(),
      utc: dateObject.toUTCString()
    });
  }
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
