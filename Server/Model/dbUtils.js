const { ObjectId } = require('mongodb');

const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = 'mongodb+srv://ASDelivery:AaSs12345678@cluster0.u6dbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let mongodb;
exports.getCouriersInIndexByIdCompany = function(index,company_id){
    //TBD     in db need to save (key ,value) index -> courierID 
    //        in db_2 need to save (key ,value) courierID -> location(long,lat) 
    console.log("the company id  is "+ company_id)
};
exports.addDocumentByCollection = async function createListing(document,collection_name){
    const result = await get().db("delivery_management").collection(collection_name).insertOne(document);
    console.log(`New listing created with the following id: ${result.ObjectId}`);
}

exports.updateDeliveryStatusById = async function (idOfListing, updatedListing) {
    const result = await get().db("delivery_management").collection("Orders")
                        .update({"_id": ObjectId(`${idOfListing}`)}, {$set:{"status": "completed"}}, function(err, result){ 
                            if (err) { 
                                console.log('Error updating object: ' + err); 
                            } else { 
                                console.log('' + idOfListing + ' document status updated'); 
                            } 
                        })
}
exports.connectDB = function(callback){
    mongoClient.connect(mongoDbUrl, (err, db) => {
        mongodb = db;
        callback();
    });
}
function get(){
    return mongodb;
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

