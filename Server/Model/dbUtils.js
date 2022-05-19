const { json } = require('body-parser');
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
    console.log(`New listing created with the following id: ${result.insertedId}`);
    return this.findOne({_id:result.insertedId},collection_name);
}

exports.updateDeliveryStatusById = async function (idOfListing, updatedListing) {
    const result = await get().db("delivery_management").collection("Orders")
                        .updateOne({"_id": ObjectId(`${idOfListing}`)}, {$set:{"status": `${updatedListing}`}}, function(err, result){ 
                            if (err) { 
                                console.log('Error updating object: ' + err); 
                            } else { 
                                console.log('' + idOfListing + ' document status updated'); 
                            } 
                        })
}
exports.updateDocument = async function (collection,idOfListing, updatedListing) {
    const result = await get().db("delivery_management").collection(collection)
                        .updateOne(idOfListing,{ $set:updatedListing}
                            , function(err, result){ 
                            if (err) { 
                                console.log('Error updating object: ' + err); 
                            } else { 
                                console.log('' + idOfListing.user_name + ' document updated'); 
                            } 
                        });
    return this.findOne(idOfListing,collection);
}
exports.pushToArray = async function (collection,idOfListing, updatedListing) {
    const result = await get().db("delivery_management").collection(collection)
                        .updateOne(idOfListing,{ $addToSet: updatedListing });
                        return this.findOne(idOfListing,collection);
}
exports.connectDB = function(callback){
    mongoClient.connect(mongoDbUrl, (err, db) => {
        if (err) { 
            console.log('Error connecting db: ' + err); 
        } else { 
            mongodb = db;
            callback();
        }
    });
}
exports.findOne = async function (id,collection_name) {
    const result = await get().db("delivery_management").collection(collection_name)
                        .findOne(id);
    return result;
}
exports.getDocs = async function (collection,id) {
    const result = await get().db("delivery_management").collection(collection)
                        .find(id ).toArray();
    return result;
}
exports.removeDocumentById = async function (collection,id) {
    const result = await get().db("delivery_management").collection(collection)
                        .remove({"_id": ObjectId(`${id}`)});
    return result;
}
function get(){
    return mongodb;
}

