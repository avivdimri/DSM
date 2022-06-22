const h3 = require("h3-js");
const distance = require('google-distance-matrix');
const firebase = require('./firebaseUtils');
const db = require('./dbUtils')
const consts = require('../consts')
function coordToIndex(lat,long) {
    return h3.geoToH3(lat, long, 7);
}
function getRingFromSrc(coord,steps) {
    return h3.kRing(coordToIndex(coord.lat,coord.long), steps)
}
exports.findBestCouriers = async function(delivery){
    var bestCourier = []
    var courierIndices = []
    var latLong = delivery.src
    var allCouriers = await db.getCouriersByFilters(delivery.company_id,delivery.Vehicle_type)
    for(var i =0; i < allCouriers.length;i++){
        var courier = allCouriers[i]
        var index = await firebase.getIndexLocationByCourierId(courier._id)
        if (index == null){
            continue
        }
        courierIndices.push({"courier": courier ,"index" :index})
    }
    var find = false
    for(var i =0; i<3;i++){
        var rings = getRingFromSrc(latLong,i)
        for(var j =0; j < courierIndices.length;j++){
          //console.log("the courier is : " + JSON.stringify(courierIndices[j].courier))
           if (rings.includes(courierIndices[j].index)){
               find = true
               bestCourier.push(courierIndices[j].courier)
               //console.log("find courier " + JSON.stringify(courierIndices[j].courier))
           }
       }
        if(find){
            break
        }

    }
    console.log("finish findBestBourier function: " + JSON.stringify(bestCourier))
    return bestCourier
    
};
async function get_duration(src,dest,vehicle_type){

    var srcLatLng = src.lat+","+src.long
    var origins = [srcLatLng];
    var destLatLng = dest.lat+","+dest.long
    var destinations = [destLatLng];
    
    distance.key(consts.GOOGLE_KEY);
    distance.mode('driving');
    if (vehicle_type == "bike" || vehicle_type == "scooter" ){
        distance.mode('bicycling');
    }
    distance.units('metric');
    return new Promise((resolve, reject) => {
        distance.matrix(origins, destinations, function (err, distances) {
            if (err) {
                console.log(" error : " +err )
                reject(consts.ERROR);
            }
            if(!distances) {
                console.log('no distances')
                reject(consts.ERROR);
            }
            if (distances.status == 'OK') {
                for (var i=0; i < origins.length; i++) {
                    for (var j = 0; j < destinations.length; j++) {
                        var origin = distances.origin_addresses[i];
                        var destination = distances.destination_addresses[j];
                        if (distances.rows[0].elements[j].status == 'OK') {
                            var dis = distances.rows[i].elements[j].distance;;
                            var dur = distances.rows[i].elements[j].duration;
                            console.log('Distance from ' + origin + ' to ' + destination + ' is ' + dis.text);
                            resolve({'duration' : dur,'distance' : dis});
                            
                        } else {
                            console.log(destination + ' is not reachable by land from ' + origin)
                            reject(consts.ERROR)
                        }
                    }
                }
            }
        });
           
    });
}


exports.sortByLocation = async function(couriers,delivery){
    var id,latLngCourier,src,dest,dur_dis
    var sortCouriers = []
    for(var i =0; i < couriers.length;i++){
        id  = couriers[i]._id
        latLngCourier = await firebase.getCouirerLocation(id)
        src  = {"lat":latLngCourier[0], "long": latLngCourier[1]}
        dest = {"lat":delivery.src.lat, "long": delivery.src.long}
        dur_dis = await get_duration(src,dest,couriers[i].Vehicle_type)
        if (dur_dis != consts.ERROR){
            console.log("dur_dis is  " +JSON.stringify(dur_dis))
            sortCouriers.push({"courier":couriers[i],"duration":dur_dis.duration,"distance":dur_dis.distance })
        }
    }
    sortCouriers.sort(function (a, b) {
        return a.duration.value - b.duration.value;
      });
   
    return sortCouriers
}
