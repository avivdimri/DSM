const model = require('./Model/model'); //created model loading here
const controller = require('./Controller/controller'); //importing route
bodyParser = require('body-parser');
const path = require('path');
const dayjs = require('dayjs');
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
app.use(bodyParser.json());
var fileupload = require("express-fileupload");
app.use(fileupload());
app.use(bodyParser.urlencoded({extended: true}));
//port = process.env.PORT || 3000;


controller(app); //register the route
// app.use(express.static(path.join(__dirname, "../my-app/dist/")));
// app.get("/", (req, res, next) => {
  //   console.log("hi");
//   res.sendFile(path.join(__dirname, "../my-app/dist/index.html"));
//     });
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


//app.listen(port);
//console.log("DSM RESTful API server started on:"+ port);
