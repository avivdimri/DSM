var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
model = require('./Model/model'), //created model loading here
bodyParser = require('body-parser');

// mongodb instance connection url connection


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var controller = require('./Controller/controller'); //importing route
controller(app); //register the route
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);
console.log("DSM RESTful API server started on:"+ port);