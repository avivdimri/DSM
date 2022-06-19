const { json } = require('body-parser');
const { ObjectId } = require('mongodb');
const DATABASE = "delivery_management"
const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = 'mongodb+srv://ASDelivery:AaSs12345678@cluster0.u6dbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let mongodb;
exports.getCouriersByFilters = async function(companyId,Vehicle_type){
    console.log(" the vehoclice type array is : " +Vehicle_type)
    query_find = { company_id: companyId,status:"idle" ,token: { $exists: true },Vehicle_type: { $in : Vehicle_type} }
    query_projection = {projection: {_id: 1,token: 1,Vehicle_type:1}}
    result = await db.getDocs("Couriers",query_find,query_projection)
    //console.log(JSON.stringify(result))
    return result
}

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
    const result = await get().db(DATABASE).collection(collection_name).insertOne(document);
    console.log(`New listing created with the following id: ${result.insertedId}`);
    return this.findOne(collection_name,{_id:result.insertedId});
}

exports.addManyDocumentsByCollection = async function createListing(document,collection_name){
    const result = await get().db("delivery_management").collection(collection_name).insertMany(document);
    return result;
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
    const result = await get().db(DATABASE).collection(collection)
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
exports.getDoc = async function(collection_name,query_find,query_projection={}){
    const result = await get().db("delivery_management").collection(collection_name).findOne(query_find,{ projection: query_projection});
    return result;
}

exports.getDocs = async function (collection,query_find,query_projection={}) {
    const result = await get().db(DATABASE).collection(collection).find(query_find,query_projection).toArray();
    return result;
} // check afetr merge
exports.getDocById = async function (collection,id) {
    const result = await get().db("delivery_management").collection(collection)
                        .findOne({"_id": ObjectId(`${id}`)});
    return result;
}
/*exports.getDocs1 = async function (collection,id) {
    const result = await get().db("delivery_management").collection(collection).find(id ).toArray();
    return result;
}*/
exports.removeDocumentById = async function (collection,id) {
    const result = await get().db(DATABASE).collection(collection)
                        .deleteOne({"_id": ObjectId(`${id}`)});
    return result;
}
function get(){
    return mongodb;
}