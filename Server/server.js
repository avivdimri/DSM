const model = require('./Model/model'); //created model loading here
const controller = require('./Controller/controller'); //importing route
bodyParser = require('body-parser');
const path = require('path');
const dayjs = require('dayjs');
db = require('./Model/dbUtils')
firebase = require('./Model/firebaseUtils')
db.connectDB(() => {
  app.listen(process.env.PORT || 3000, function (){
    const d_t = new Date(2022,09,03,16);
    console.log(d_t);
    let year = d_t.getFullYear();
    let month = ("0" + (d_t.getMonth() + 1)).slice(-2);
    let day = ("0" + d_t.getDate()).slice(-2);
    let hour = d_t.getHours();
    let minute = "00"
    let seconds = "00"
    time =year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    console.log(time);
      console.log("DSM RESTful API server start");
  });
});
firebase.connectFirebase();

var express = require('express')
app = express();
//port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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