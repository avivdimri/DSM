
const h3 = require("h3-js");

function coordToIndex(longitude,latitude) {
    return h3.geoToH3(longitude, latitude, 7);
}
exports.getRingFromSrc = function(coord,steps) {
    return h3.kRing(coordToIndex(coord.long,coord.lat), steps)
}

exports.sortByLocation = function(couriers){
    //TBD
    console.log("the couriers are: "+couriers)
}
