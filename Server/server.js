var express = require('express')
app = express();
port = process.env.PORT || 3000;
model = require('./Model/model'); //created model loading here
bodyParser = require('body-parser');

// mongodb instance connection url connection
//connection to DB in the server by Atlas
// const {MongoClient} = require('mongodb');
// var uri = "mongodb+srv://Node_user:Node_user@cluster0.u6dbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// const client = new MongoClient(uri);
// async function listDatabases(client){
//   databasesList = await client.db().admin().listDatabases();

//   console.log("Databases:");
//   databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };
// connectDB(client).catch(console.error)

// async function connectDB(client) {
 
//   try {
//     await client.connect();
//     await listDatabases(client);
  
//   } catch (e) {
//     console.error(e);
//   }
//   finally {
//     await client.close();
//   }
// }
// async function listDatabases(client){
//   databasesList = await client.db().admin().listDatabases();

//   console.log("Databases:");
//   databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };


 //connection DB locally

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/aviv";

// MongoClient.connect(url, function(err, db) {
  
//   if (err) throw err;
//   console.log("Database created!");
//   var dbo = db.db("aviv");
//   dbo.createCollection("customers", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var controller = require('./Controller/controller'); //importing route
controller(app); //register the route
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);
console.log("DSM RESTful API server started on:"+ port);

