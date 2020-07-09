var express = require("express");
var app = express();
const fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/api/getRequestDetails", (req, res, next) => {

 let rawdata = fs.readFileSync('data.json');
 let data = JSON.parse(rawdata);

 res.json(data);

});



app.post("/api/addRequest", (req, res, next) => {

 var newReq = req.body;

 let rawdata = fs.readFileSync('data.json');
 let data = JSON.parse(rawdata);

 data.push( newReq );

 let newdata = JSON.stringify(data);
 fs.writeFileSync('data.json', newdata);

 res.json({"status": "success"});

});


app.listen(3000, () => {
 console.log("Server running on port 3000");
});
