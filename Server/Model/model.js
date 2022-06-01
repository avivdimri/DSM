//'use strict';
const geo = require('./geoUtils'); 
const db = require('./dbUtils')
const con = require('./conUtils.js')
const parser = require('../csv_parser/parser');
const { ObjectId } = require('mongodb');
const firebase = require('./firebaseUtils');
const axios = require('axios');

// exports.sign_up_company = function(req, res) {
//     db.addDocumentByCollection(req.body,"Companies")
//     res.send("created new company successfully your id is")
//     };
exports.addCourier = async function(req, res) {
    const user_name=req.body.user_name;
    const company_id = req.body.company_id;
    db.findOne("Couriers",{
        //ensure username is unique, i.e the username is not already in the database
        user_name:user_name
      })
        .then(user => {
          //if the username is unique 
          if (!user) {
            //if the username is unique go ahead and create userData after hashing password and salt
            db.addDocumentByCollection(req.body,"Couriers")
                .then(user => {
                  //after successfully creating userData display registered message
                  res.json( {status:'SUCCESS',message:'The register of user complete!'})
                })
                .catch(err => {
                  //if an error occured while trying to create userData, go ahead and display the error
                  res.json( {status:'ERROR', message:'error1:' + err})
                })
          } else {
            db.pushToArray("Couriers",{user_name:user_name},{ company_id: company_id  })
              .then(user => {
                //after successfully creating userData display registered message
                res.json( {status:'SUCCESS',message:'The register of user complete!'})
              })
              .catch(err => {
                //if an error occured while trying to create userData, go ahead and display the error
                res.json( {status:'ERROR', message:'error1:' + err})
              })
          }
        })
        .catch(err => {
          //display error if an error occured
          res.json({status:'ERROR',message:'error2:' + err})
        })
      }
    //res.send("created new courier successfully ")
exports.sign_up_courier = function(req, res) {
    db.addDocumentByCollection(req.body,"Couriers")
    res.send("created new courier successfully ")
    };  
exports.sign_in_courier = function(req, res) {
    console.log(req.body)
    res.send("625eebdb30461ad917b11c66")
    };   
exports.add_delivery = async function(req, res) {
    orders = await parser.parse('test.csv')
    //orders = await parser.parse(req.body.file_name)
    orders.forEach(async(order) =>{ 
        var result= await db.addDocumentByCollection(order,"Orders")
        if (result.express == "express"){
            await dispatch_delivery(result)
            res.send("dispatch the delivery successfully ")
        } else  {
            res.send("add the delivery to feed successfully ")
        }
    });
    //res.send("the system get the deliveries ")
    // return
    // for (order in orders)
      
    //db.updateDeliveryStatusById(result,"in progress");
};
exports.findCourier = async function(req, res) {
    res.send(await db.getDocs("Couriers",JSON.parse(req.query.params)));
};
  

exports.deleteC = async function(req, res) {
    res.send(await db.removeDocumentById(req.query.collection,req.query._id));
};

exports.consolelog = async function(req, res) {
    var id = req.query.id
    var query_find = { _id: ObjectId(id)}
    var query_projection = { projection: { _id:0,company_id:1 }}
    companyIds = await db.findOne("Couriers",query_find,query_projection)
    query_find = { company_id: { $in : companyIds["company_id"]}}
   
    result = await db.getDocs("Orders",query_find)
    console.log("the deliveries are : "+ JSON.stringify(result) )
    res.send(JSON.stringify(result))
}
exports.update_courier_status = async function(req, res) {
    var id = req.params.userId
    var courier_status = req.body.status
    //console.log("the id is " + id)
   // console.log("the status is :" + courier_status)
    var object_id = new ObjectId(id);
    query_find = { _id: object_id}
    query_update = {$set: {status:courier_status}}
    result = await db.updateDoc("Couriers",query_find,query_update)
    res.send(JSON.stringify(result))
}

exports.update_delivery_status = async function(req, res) {
    var id = req.params.deliveryId
    var delivery_status = req.body.status
    var courierId = req.body.courier_id
    console.log("the status is :" + delivery_status)
    console.log("the courier id is :" + courierId)
    var object_id = new ObjectId(id);
    query_find = { _id: object_id}
    query_update = {$set: {status:delivery_status,courier_id:courierId}}
    result = await db.updateDoc("Orders",query_find,query_update)
    res.send(JSON.stringify(result))
}



async function dispatch_delivery(delivery) {
    var find_courier = false
    var couriers = await findBestCouriers(delivery)
    for(var i =0; i < couriers.length;i++){
        var courier = couriers[i]
        await sendNotfication(delivery,courier.token)
        await new Promise(resolve => setTimeout(resolve, 5000));
        var status = await getDeliveryStatus(delivery)
        if (status == "assigned"){
            find_courier=true 
            console.log("find courier")
            break
        }
        else{
          console.log("the courier decline the request try next courier...")
        }
    }
    if (!find_courier){
      console.log("sorry, couldn't find courier for the delivery request")
    }
          
}
async function sendNotfication(delivery,token) {

 //console.log(" the token is "+ token )
  var headerNotification =
  {"headers":{
    'Content-Type': 'application/json',
    'Authorization': 'key=AAAA0lbMz8I:APA91bG36p30LIkNBSnHF5SAxa_G5aNIwFdlMihdzkBpxJScKuNYsxeIjf_YQu4P6fzj36FnoGkU6W39DsaCpwwJQmX0w01DFePzIjPuMcFI9m5EGZ7Efq-K-6TRZx7RCqs4Jgq6VIBg',
  }};

  var bodyNotification =
  {
    "body":`Destination Address: \n${delivery.dest_address}.`,
    "title":"New Delivery Request"
  };

  var data = 
  {
    "click_action": "FLUTTER_NOTIFICATION_CLICK",
    "id": "1",
    "status": "done",
    "deliveryId": delivery._id
  };

  const officialNotificationFormat =
  {
    "notification": bodyNotification,
    "data": data,
    "priority": "high",
    "to": token,
  };


  try {
    const response = await axios.post('https://fcm.googleapis.com/fcm/send', officialNotificationFormat,headerNotification)
    //console.log(response.data);
 
    //return results
  } catch (error) {
    console.log(error.response);
  }

          
}

async function getDeliveryStatus(delivery) {
    console.log("get delivery function: " + delivery._id)
    var object_id = new ObjectId(delivery._id)
    query_find = { _id: object_id}
    query_projection = {_id:0,status:1}
    result = await db.findOne("Orders",query_find,query_projection)
    console.log("get delivery function: result: " + result.status)
    return result.status
}
async function getCourierLocation(id) {
    console.log("get courier function: " + id)
    var object_id = new ObjectId(id)
    query_find = { _id: object_id}
    query_projection = {_id:0,status:1}
    result = await db.findOne("Orders",query_find,query_projection)
    console.log("get delivery function: result: " + result.status)
    return result.status
}

async function findBestCouriers(delivery){
    var bestCourier = []
    var courierIndices = []
    latLong = delivery.src
    allCouriers  =  await db.getCouriersByIdCompany("6280e5046312de7332c01d89")
    for(var i =0; i < allCouriers.length;i++){
        var courier = allCouriers[i]
        var index = await firebase.getIndexLocationByCourierId(courier._id)
        if (index == null)
            continue
            courierIndices.push({"courier": courier ,"index" :index})
    }
    var find = false
    for(var i =0; i<3;i++){
        rings = geo.getRingFromSrc(latLong,i)
        for(var j =0; j < courierIndices.length;j++){
            var index = courierIndices[j].index
            if (rings.includes(index))
                find = true
                bestCourier.push(courierIndices[j].courier)
                break

        }
        if(find){
            break
        }

    }
    console.log("finish findBestBourier function: " + JSON.stringify(bestCourier))
    return bestCourier
    
};
exports.add_courier_token = async function(req, res) {
    var id = req.params.userId
    var courier_token = req.body.token
    console.log("the token is :" + courier_token)

    var object_id = new ObjectId(id);
    var query_find = { _id: object_id}
    var query_update = {$set: {token:courier_token}}
    result = await db.updateDoc("Couriers",query_find,query_update)
    res.send(JSON.stringify(result))
}

exports.get_order = async function(req, res){
    var order_id = req.params.orderId
    console.log("the parma id is : " + order_id)
    var object_id = new ObjectId(order_id)
    var query_find = {_id: object_id}
    result = await db.findOne("Orders",query_find);
    console.log("the order is : " +JSON.stringify(result) )
    res.send(JSON.stringify(result))
}
exports.get_courier = async function(req, res){
    var courier_id = req.params.courierId
    console.log("the parma id is : " + courier_id)
    var object_id = new ObjectId(courier_id)
    var query_find = {_id: object_id}
    result = await db.findOne("Couriers",query_find);
    console.log("the Courier is : " +JSON.stringify(result) )
    res.send(JSON.stringify(result))
}