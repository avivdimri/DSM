
//const { response } = require("express");
//const { range } = require("express/lib/request");
const h3 = require("h3-js");
const distance = require('google-distance-matrix');
const firebase = require('./firebaseUtils');



function coordToIndex(lat,long) {
    return h3.geoToH3(lat, long, 7);
}
exports.getRingFromSrc = function(coord,steps) {
    return h3.kRing(coordToIndex(coord.lat,coord.long), steps)
}
async function get_duration(src,dest){

    var srcLatLng = src.lat+","+src.long
    var origins = [srcLatLng];
    var destLatLng = dest.lat+","+dest.long
    var destinations = [destLatLng];
    
    distance.key('AIzaSyCqcNNmxm-9YBysFypGjn8BUwdM3TUUegw');
    distance.mode('driving');
    distance.units('metric');
    return new Promise((resolve, reject) => {
        distance.matrix(origins, destinations, function (err, distances) {
            if (err) {
                reject(console.log(err));
            }
            if(!distances) {
                reject( console.log('no distances'));
            }
            if (distances.status == 'OK') {
                for (var i=0; i < origins.length; i++) {
                    for (var j = 0; j < destinations.length; j++) {
                        var origin = distances.origin_addresses[i];
                        var destination = distances.destination_addresses[j];
                        if (distances.rows[0].elements[j].status == 'OK') {
                            var dis = distances.rows[i].elements[j].distance;;
                            var dur = distances.rows[i].elements[j].duration;
                            resolve({'duration' : dur,'distance' : dis});
                            console.log('Distance from ' + origin + ' to ' + destination + ' is ' + dis.text);
                        } else {
                            reject(  console.log(destination + ' is not reachable by land from ' + origin))
                        }
                    }
                }
            }
        });
           
    });
}




exports.sortByLocation = async function(couriers,delivery){
    var id,latLngCourier,src,dest,dur_dis
    sortCouriers = []
    for(var i =0; i < couriers.length;i++){
        id  = couriers[i]._id
        latLngCourier = await firebase.getCouirerLocation(id)
        src  = {"lat":latLngCourier[0], "long": latLngCourier[1]}
        dest = {"lat":delivery.src.lat, "long": delivery.src.long}
        dur_dis = await get_duration(src,dest)
        console.log("dur_dis is  " +JSON.stringify(dur_dis))
        sortCouriers.push({"courier":couriers[i],"duration":dur_dis.duration,"distance":dur_dis.distance })
    }
    await sortCouriers.sort(function (a, b) {
        return a.duration.value - b.duration.value;
      });
   
    console.log(JSON.stringify(sortCouriers))
    return sortCouriers
}
