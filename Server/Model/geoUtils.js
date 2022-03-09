
const { response } = require("express");
const { range } = require("express/lib/request");
const h3 = require("h3-js");



function coordToIndex(longitude,latitude) {
    return h3.geoToH3(longitude, latitude, 7);
}
exports.getRingFromSrc = function(coord,steps) {
    return h3.kRing(coordToIndex(coord.long,coord.lat), steps)
}
async function get_duration(src,des){

    var a = src.src.lat+","+src.src.long
    var origins = [a];
    a = des.src.lat+","+des.src.long
    var destinations = [a];

    
    // var origins = ['32.048989,34.798414']; //home ( lat,long)
    // var destinations = ['32.061155,34.791474']; //nokia

    var distance = require('google-distance-matrix');
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
                            var dis = distances.rows[i].elements[j].distance.value;
                            var dur = distances.rows[i].elements[j].duration;
                            resolve({'dur' : dur,'dis' : dis});
                            console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                        } else {
                            reject(  console.log(destination + ' is not reachable by land from ' + origin))
                        }
                    }
                }
            }
        });
           
    });
}




exports.sortByLocation = async function(couriers,order){
    var cours = []
    c= couriers[0]
    var x = await get_duration(c,order)
    console.log("object is " +JSON.stringify(x))
    console.log("dis is " + x.dis)
    console.log("dur is " + x.dur.text)
    // cours.push({"id": c.id, "duration" : x.dur,
    // "distance" : x.dis}) 
    // function(error) { /* code if some error */ })
   
    // couriers.forEach(async(c) => {
    //     dur,dis = await get_duration(c, order)
    //     console.log("dur is " + dur)
    //     cours.push({"id": c.id, "duration" : dur,
    //     "distance" : dis
    // })});

    cours.sort(function (a, b) {
        return a.duration - b.duration;
      });
   
    console.log(JSON.stringify(cours))
    // c = [{duration = undefined}]
    // for (courier in couriers)
    //     c = get_duration(courier,order)


}
