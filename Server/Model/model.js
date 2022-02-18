//'use strict';
const geo = require('./geoUtils'); 
const db = require('./dbUtils')
const con = require('./conUtils.js')

exports.sign_up_company = function(req, res) {
    db.addDocumentByCollection(req.body,"Companies")
    res.send("created new company successfully your id is")
    };
exports.sign_up_courier = function(req, res) {
    db.addDocumentByCollection(req.body,"Couriers")
    res.send("created new courier successfully ")
    };   
exports.add_delivery = function(req, res) {
    db.addDocumentByCollection(req.body,"Orders")
    if (req.body.timing == "now"){
        //dispatch_delivery(req.body)
        res.send("dispatch the delivery successfully ")
    } else  {
        add_delivery_to_feed(req.body)
        res.send("add the delivery to feed successfully ")
    }
};
    
function add_delivery_to_feed(delivery){
    //TBD
}

function dispatch_delivery(delivery) {
    find_courier = false
    while (!find_courier)
        var couriers = findBestCouriers(delivery)
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
    var couriers = {}
    coord = { long : order.src_longitude , lat : order.src_latitude}
    rings = geo.getRingFromSrc(coord,1)
    for (index in rings)
        couriers.append(db.getCouriersInIndexByIdCompany(index,order.company_id))
    couriers = geo.sortByLocation(couriers)
    return couriers
    
};