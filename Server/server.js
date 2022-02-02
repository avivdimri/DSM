const model = require('./Model/model'); //created model loading here
const controller = require('./Controller/controller'); //importing route
bodyParser = require('body-parser');
db = require('./Model/dbUtils')
db.connectDB(() => {
  app.listen(process.env.PORT || 3000, function (){
      console.log("DSM RESTful API server start");
  });
});

var express = require('express')
app = express();
//port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

controller(app); //register the route
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

//app.listen(port);
//console.log("DSM RESTful API server started on:"+ port);