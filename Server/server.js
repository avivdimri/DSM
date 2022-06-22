const controller = require('./Controller/controller'); //importing route
bodyParser = require('body-parser');
db = require('./Model/dbUtils')
firebase = require('./Model/firebaseUtils')
db.connectDB(() => {
  app.listen(process.env.PORT || 3000, function (){
      console.log("DSM RESTful API server start");
  });
});
firebase.connectFirebase();

var express = require('express')
app = express();
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // handle OPTIONS method
  if ('OPTIONS' == req.method) {
      return res.sendStatus(200);
  } else {
      next();
  }
});
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // add headers for 'Access-Control' issue
  next();

});
app.use(bodyParser.json());
var fileupload = require("express-fileupload");
app.use(fileupload());
app.use(bodyParser.urlencoded({extended: true}));

controller(app); 
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
