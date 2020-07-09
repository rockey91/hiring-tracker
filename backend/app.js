var express = require("express");
var app = express();
const fs = require('fs');


app.get("/api/getRequestDetails", (req, res, next) => {

 let rawdata = fs.readFileSync('data.json');
 let data = JSON.parse(rawdata);

 res.json(data);

});


app.post("/api/addRequest", (req, res, next) => {

 // add the new request to data.json file.
 // console.log(req.body);
 // var newReq = req.body;
 var newReq = {
   "requestId": "1",
   "poc": "POC-1"
 };

 let rawdata = fs.readFileSync('data.json');
 let data = JSON.parse(rawdata);

 data.push( newReq );

 console.log( data );

 let newdata = JSON.stringify(data);
 fs.writeFileSync('data.json', newdata);

 res.json({"status": "success"});

});


app.listen(3000, () => {
 console.log("Server running on port 3000");
});
