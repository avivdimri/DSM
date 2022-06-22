const { ObjectId } = require('mongodb');
const mongoClient = require('mongodb').MongoClient;
const consts = require('../consts');
let mongodb;

// the function return all the couriers which are working in companyId and drive on Vehicle_type
exports.getCouriersByFilters = async function(companyId,Vehicle_type){
   // console.log(" the vehoclice type array is : " +Vehicle_type)
    query_find = { company_id: companyId,status:"idle" ,token: { $exists: true },Vehicle_type: { $in : Vehicle_type} }
    query_projection = {projection: {_id: 1,token: 1,Vehicle_type:1}}
    result = await db.getDocs(consts.COURIERS,query_find,query_projection)
    //console.log(JSON.stringify(result))
    return result
}

// the function add document to DB by collection name
exports.addDocumentByCollection = async function createListing(document,collection_name){
    const result = await get().db(consts.DATABASE).collection(collection_name).insertOne(document);
    console.log(`New listing created with the following id: ${result.insertedId}`);
    return this.findOne(collection_name,{_id:result.insertedId});
}

// the function add multiple documents to DB by collection name
exports.addManyDocumentsByCollection = async function createListing(documents,collection_name){
    const result = await get().db(consts.DATABASE).collection(collection_name).insertMany(documents);
    return result;
}

// the function update document 
exports.updateDocument = async function (collection,idOfListing, updatedListing) {
    const result = await get().db(consts.DATABASE).collection(collection)
                        .updateOne(idOfListing,{ $set:updatedListing}
                            , function(err, result){ 
                            if (err) { 
                                console.log('Error updating object: ' + err); 
                            } else { 
                                console.log('document updated'); 
                            } 
                        });
    return this.findOne(collection,idOfListing);
}
exports.updateDoc = async function(collection_name,query_find,query_update){  
    var updated = await get().db(consts.DATABASE).collection(collection_name).updateMany(query_find,query_update);
    return updated
}
exports.pushToArray = async function (collection,idOfListing, updatedListing) {
    const result = await get().db(consts.DATABASE).collection(collection)
                        .updateOne(idOfListing,{ $addToSet: updatedListing });
                        return this.findOne(collection,idOfListing);
}

// the function connect to DB
exports.connectDB = function(callback){
    mongoClient.connect(consts.MONGO_DB_URL, (err, db) => {
        if (err) { 
            console.log('Error connecting db: ' + err); 
        } else { 
            mongodb = db;
            callback();
        }
    });
}
// the function return document by query_find and query_projection
exports.findOne = async function(collection_name,query_find,query_projection={}) {
    const result = await get().db(consts.DATABASE).collection(collection_name)
                        .findOne(query_find,query_projection);
    return result;
}

exports.getDoc = async function(collection_name,query_find,query_projection={}){
    const result = await get().db(consts.DATABASE).collection(collection_name).findOne(query_find,{ projection: query_projection});
    return result;
}

exports.getDocs = async function (collection,query_find,query_projection={}) {
    const result = await get().db(consts.DATABASE).collection(collection).find(query_find,query_projection).toArray();
    return result;
} // check afetr merge
exports.getDocById = async function (collection,id) {
    const result = await get().db(consts.DATABASE).collection(collection)
                        .findOne({"_id": ObjectId(`${id}`)});
    return result;
}

exports.removeDocumentById = async function (collection,id) {
    const result = await get().db(consts.DATABASE).collection(collection)
                        .deleteOne({"_id": ObjectId(`${id}`)});
    return result;
}
function get(){
    return mongodb;
}