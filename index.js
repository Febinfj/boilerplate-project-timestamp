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



app.get(`/api/:date?`,(req,res,next)=>{
  let dtparam = req.params.date;
  console.log(dtparam)
  let unixdata ,utcdata;
 
  //if no proper data is recieved the current time and unix will be sent
  if(!dtparam){

    console.log(dtparam)

    utcdata = new Date().toUTCString();
    unixdata = new Date().getTime();

  }
  // checks whether a unix data is parsed and convert it to utc
  else if(!isNaN(dtparam)){
    
    console.log(dtparam)
    unixdata = parseInt(dtparam);
    utcdata = new Date(parseInt(dtparam)).toUTCString();
  }else{
    
    
    // if a particular date is sent then it will be converted to unix and utc
    let dateObj = new Date(dtparam);
    if(dateObj.toString() == "Invalid Date"){
      return res.json({ error : "Invalid Date" })
    }
   
    utcdata = dateObj.toUTCString() 
    unixdata = dateObj.getTime()
  }
  req.utc = utcdata;
  req.unix = unixdata;
  next()
},function(req,res){
  
  res.json({unix:req.unix,utc:req.utc})
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log(`http://localhost:${3000}`);
});
