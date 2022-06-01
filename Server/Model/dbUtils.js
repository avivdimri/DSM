
const { json } = require('body-parser');
const { ObjectId } = require('mongodb');

const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = 'mongodb+srv://ASDelivery:AaSs12345678@cluster0.u6dbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let mongodb;
exports.getCouriersByIdCompany = async function(company_id){
    query_find = { company_id: company_id }
    query_projection = {projection: {_id: 1,token: 1}}
    result = await db.getDocs("Couriers",query_find,query_projection)
    return result

    //get couriers of company_id
    // go over couriers and check index 
    //TBD     in db need to save (key ,value) index -> courierID 
    //        in db_2 need to save (key ,value) courierID -> location(long,lat) 
    console.log("the company id  is "+ company_id)
}
exports.addDocumentByCollection = async function createListing(document,collection_name){
    const result = await get().db("delivery_management").collection(collection_name).insertOne(document);
    console.log(`New listing created with the following id: ${result.insertedId}`);
    return this.findOne(collection_name,{_id:result.insertedId});
}

/*exports.updateDeliveryStatusById = async function (idOfListing, updatedListing) {
    const result = await get().db("delivery_management").collection("Orders")
                        .updateOne({"_id": ObjectId(`${idOfListing}`)}, {$set:{"status": `${updatedListing}`}}, function(err, result){ 
                            if (err) { 
                                console.log('Error updating object: ' + err); 
                            } else { 
                                console.log('' + idOfListing + ' document status updated'); 
                            } 
                        })
}*/
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
    return this.findOne(collection,idOfListing);
}
exports.updateDoc = async function(collection_name,query_find,query_update){  
    var updated = await get().db("delivery_management").collection(collection_name).updateMany(query_find,query_update);
    return updated
}
exports.pushToArray = async function (collection,idOfListing, updatedListing) {
    const result = await get().db("delivery_management").collection(collection)
                        .updateOne(idOfListing,{ $addToSet: updatedListing });
                        return this.findOne(collection,idOfListing);
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
exports.findOne = async function(collection_name,query_find,query_projection={}) {
    const result = await get().db("delivery_management").collection(collection_name)
                        .findOne(query_find,query_projection);
    return result;
}
exports.getDoc = async function(collection_name,query_find,query_projection={}){
    const result = await get().db("delivery_management").collection(collection_name).findOne(query_find,{ projection: query_projection});
    return result;
}

exports.getDocs = async function (collection,query_find,query_projection={}) {
    const result = await get().db("delivery_management").collection(collection).find(query_find,query_projection).toArray();
    return result;
} // check afetr merge

/*exports.getDocs1 = async function (collection,id) {
    const result = await get().db("delivery_management").collection(collection).find(id ).toArray();
    return result;
}*/
exports.removeDocumentById = async function (collection,id) {
    const result = await get().db("delivery_management").collection(collection)
                        .remove({"_id": ObjectId(`${id}`)});
    return result;
}
function get(){
    return mongodb;
}

/*exports.getdoc1 = async function(collection,userId){
     var compId = await get().db("delivery_management").collection("Couriers").findOne({ _id: ObjectId(userId)},{ projection: { _id:0,company_id:1 }});
     console.log("companies : "+ JSON.stringify(compId["company_id"]))
     const result = await get().db("delivery_management").collection("Orders").find({ company_id: { $in : compId["company_id"]}}).toArray();

    return result;
}*/




