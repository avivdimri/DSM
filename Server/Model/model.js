//'use strict';
const geo = require('./geoUtils'); 
const db = require('./dbUtils')
const con = require('./conUtils.js')
const parser = require('../csv_parser/parser');
const { ObjectId } = require('mongodb');

// exports.sign_up_company = function(req, res) {
//     db.addDocumentByCollection(req.body,"Companies")
//     res.send("created new company successfully your id is")
//     };
exports.sign_up_courier = function(req, res) {
    db.addDocumentByCollection(req.body,"Couriers")
    res.send("created new courier successfully ")
    };  
exports.sign_in_courier = function(req, res) {
    console.log(req.body)
    res.send("625eebdb30461ad917b11c66")
    };   
exports.add_delivery = async function(req, res) {
    //result contains the id of the new order
    orders = await parser.parse(req.body.file_name)
    orders.forEach(async(order) =>{ 
        console.log("the order is:" + JSON.stringify(order))
        var result= await db.addDocumentByCollection(order,"Orders")
        if (order.timing == "now"){
            //dispatch_delivery(req.body)
            // res.send("dispatch the delivery successfully ")
        } else  {
            add_delivery_to_feed(order)
            // res.send("add the delivery to feed successfully ")
        }
    });
    res.send("the system get the deliveries ")
    // return
    // for (order in orders)
      
    //db.updateDeliveryStatusById(result,"in progress");
};
    
function add_delivery_to_feed(delivery){
    //TBD
}
exports.consolelog = async function(req, res) {
    var id = req.query.id
    result = await db.getdoc("aviv",id)
    res.send(JSON.stringify(result))
}
exports.update_courier_status = async function(req, res) {
    var id = req.params.userId
    var courier_status = req.body.status
    console.log("the id is " + id)
    console.log("the status is :" + courier_status)

    var object_id = new ObjectId(id);
    query_find = { _id: object_id}
    query_update = {$set: {status:courier_status}}
    result = await db.updateDoc("Couriers",query_find,query_update)
    res.send(JSON.stringify(result))
}




function dispatch_delivery(delivery) {
    find_courier = false
    // while (!find_courier)
    var couriers = findBestCouriers(delivery)
    find_courier = true
    return
        for (var courier in couriers)
            //timer=5
            con.conWithCourier(courier)
            con.sendToCourierDelivery(delivery)
            //if timer pass 5 sec continue to next courier
            //else 
            if (con.accept())
                res.send("dispatched delivery successfully") 
                find_corier=true
                
    
}

function findBestCouriers(order){
        var couriers = [{"id" : 1,
    "src": {"lat": 32.075375,"long": 34.801389}},{"id" : 2,
    "src": {"lat": 32.095578,"long": 34.795318}},{"id" : 3,
    "src": {"lat": 32.061155,"long": 34.791474}}]
    // coord = { long : order.src_longitude , lat : order.src_latitude}
    // rings = geo.getRingFromSrc(coord,1)
    // for (index in rings)
    //     couriers.append(db.getCouriersInIndexByIdCompany(index,order.company_id))
    
    geo.sortByLocation(couriers,order)
    console.log("finish findBestBourier function")
    // return couriers
    
};
exports.add_courier_token = async function(req, res) {
    var id = req.params.userId
    var courier_token = req.body.token
    console.log("the id is " + id)
    console.log("the token is :" + courier_token)

    var object_id = new ObjectId(id);
    query_find = { _id: object_id}
    query_update = {$set: {token:courier_token}}
    result = await db.updateDoc("Couriers",query_find,query_update)
    res.send(JSON.stringify(result))
}