var express = require("express");
var app = express();
const fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post("/api/authenticate", (req, res, next) => {

 var creds = req.body; // { username: <val>, password: <val> }

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


app.get("/api/getRequestDetails", (req, res, next) => {

 let rawdata = fs.readFileSync('../database/data.json');
 let data = JSON.parse(rawdata);

 res.json(data);

});



app.post("/api/addRequest", (req, res, next) => {

 var newReq = req.body;

 let rawdata = fs.readFileSync('../database/data.json');
 let data = JSON.parse(rawdata);

 data.push( newReq );

 let newdata = JSON.stringify(data);
 fs.writeFileSync('../database/data.json', newdata);

 res.json({"status": "success"});

});


// updateRequest
/*
app.put() = {

  var newObj = req.body;

  let rawdata = fs.readFileSync('../database/data.json');
  let data = JSON.parse(rawdata);

  var oldObjIdx;
  var oldObj = data.find(function(obj, ind){
    if( newObj.requestId == obj.requestId ) {
      oldObjIdx = ind;
      return true;
    }
  });

  if( oldObj !== undefined ) {
    data[oldObjIdx] = newObj;
    let newdata = JSON.stringify(data);
    fs.writeFileSync('../database/data.json', newdata);
    res.json({"status": "success"});
  } else {
    res.json({"status": "failure"});
  }

}
*/




app.listen(3000, () => {
 console.log("Server running on port 3000");
});
