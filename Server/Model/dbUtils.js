exports.getCouriersInIndexByIdCompany = function(index,company_id){
    //TBD     in db need to save (key ,value) index -> courierID 
    //        in db_2 need to save (key ,value) courierID -> location(long,lat) 
    console.log("the company id  is "+ company_id)
};
exports.saveCompany = function(company){
    console.log(company)
    //TBD
}
exports.saveCourier = function(courier){
    console.log(courier)
    //TBD
}
exports.saveDelivery = function(delivery){
    console.log(delivery)
    //TBD
}
exports.connectDB = function(){
    //tbd
}





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