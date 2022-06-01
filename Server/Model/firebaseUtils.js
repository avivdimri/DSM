var admin = require("firebase-admin");

var serviceAccount = require("../../deliverysystemmanagement-firebase-adminsdk-2cwyr-be192dd27d.json");

exports.connectFirebase = function() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://deliverysystemmanagement-default-rtdb.firebaseio.com"
      });
    

    };  
exports.getIndexLocationByCourierId = async function(id){
    const defaultDatabase = admin.database();
    ref = await defaultDatabase.ref(`indexes/${id}`).once('value');
    return ref.val();
}
exports.getCouirerLocation = async function(id){
    const defaultDatabase = admin.database();
    var ref = await defaultDatabase.ref(`activeCouriers/${id}`).once('value');
    var latLng = ref.val();
    if (latLng != null)
        //console.log("the lat long is  " +JSON.stringify(latLng.val().l) );
        latLng = latLng.l
    console.log("the lat long is " + latLng)
    return latLng
    //return index.val();
}



