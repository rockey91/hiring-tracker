var express = require("express");
var app = express();
const fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


var mysql = require('mysql');
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "@ff19E$P"
});



app.post("/api/authenticate", (req, res, next) => {

 var creds = req.body; // { username: <val>, password: <val> }

 console.log(creds);

 let rawdata = fs.readFileSync('../database/credentials.json');
 let data = JSON.parse(rawdata);

 var result = data.find(function(obj){
   return ( obj.username == creds.username && obj.password == creds.password );
 });

 if ( result !== undefined ) {
   res.json({"status": "success"});
 } else {
   res.json({"status": "failure"});
 }

});



app.post("/api/addRequest", (req, res, next) => {

 var newReq = req.body;

 console.log(newReq);

 let rawdata = fs.readFileSync('../database/data.json');
 let data = JSON.parse(rawdata);

 data.push( newReq );

 let newdata = JSON.stringify(data);
 fs.writeFileSync('../database/data.json', newdata);

 res.json({"status": "success"});


 // var sql = `INSERT INTO hiring_tracker.hiring_requests (poc, manager)
 //            VALUES ('${newReq.poc}', '${newReq.manager}');`;
 //
 // con.query(sql, function (err, result) {
 //   if (err) {
 //     throw err;
 //     res.json({"status": "failure"});
 //     // con.end()
 //   } else {
 //     console.log("Result: " + result);
 //     res.json({"status": "success"});
 //     // con.end()
 //   }
 // });

});



app.get("/api/getRequestDetails", (req, res, next) => {

 let rawdata = fs.readFileSync('../database/data.json');
 let data = JSON.parse(rawdata);

 res.json(data);

});



app.put("/api/updateRequest", (req, res, next) => {

  var updateObj = req.body;

  console.log(updateObj);

  let rawdata = fs.readFileSync('../database/data.json');
  let data = JSON.parse(rawdata);

  var oldObjIdx;
  var oldObj = data.find(function(obj, ind){
    if( updateObj.requestId == obj.requestId ) {
      oldObjIdx = ind;
      return true;
    }
  });


  if( oldObj !== undefined ) {
    data[oldObjIdx] = updateObj;
    let newdata = JSON.stringify(data);
    fs.writeFileSync('../database/data.json', newdata);
    res.json({"status": "success"});
  } else {
    res.json({"status": "failure"});
  }

});



app.listen(3000, () => {
 console.log("Server running on port 3000");
});
