
const { json } = require('body-parser');
const { ObjectId } = require('mongodb');
const DATABASE = "delivery_management"

const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = 'mongodb+srv://ASDelivery:AaSs12345678@cluster0.u6dbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let mongodb;
exports.getCouriersByIdCompany = async function(companyId){
    query_find = { company_id: companyId,status:"idle" ,token: { $exists: true } }
    query_projection = {projection: {_id: 1,token: 1}}
    result = await db.getDocs("Couriers",query_find,query_projection)
    //console.log(JSON.stringify(result))
    return result
}
exports.addDocumentByCollection = async function createListing(document,collection_name){
    const result = await get().db(DATABASE).collection(collection_name).insertOne(document);
    console.log(`New listing created with the following id: ${result.insertedId}`);
    return this.findOne(collection_name,{_id:result.insertedId});
}

exports.updateDocument = async function (collection,idOfListing, updatedListing) {
    const result = await get().db(DATABASE).collection(collection)
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
    var updated = await get().db(DATABASE).collection(collection_name).updateMany(query_find,query_update);
    return updated
}
exports.pushToArray = async function (collection,idOfListing, updatedListing) {
    const result = await get().db(DATABASE).collection(collection)
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
    const result = await get().db(DATABASE).collection(collection_name)
                        .findOne(query_find,query_projection);
    return result;
}


exports.getDocs = async function (collection,query_find,query_projection={}) {
    const result = await get().db(DATABASE).collection(collection).find(query_find,query_projection).toArray();
    return result;
} // check afetr merge


exports.removeDocumentById = async function (collection,id) {
    const result = await get().db(DATABASE).collection(collection)
                        .remove({"_id": ObjectId(`${id}`)});
    return result;
}
function get(){
    return mongodb;
}






