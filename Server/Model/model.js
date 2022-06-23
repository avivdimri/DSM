
const geo = require('./geoUtils'); 
const db = require('./dbUtils')
const con = require('./conUtils.js')
const parser = require('../csv_parser/parser');
const { ObjectId } = require('mongodb');
const consts = require('../consts');



exports.addCourier = async function(req, res) {
    const user_name=req.body.user_name;
    const company_id = req.body.company_id;
    req.body.company_id = [company_id];
    console.log(" the body is: " + JSON.stringify(req.body))
    db.findOne(consts.COURIERS,{
        //ensure username is unique, i.e the username is not already in the database
        user_name:user_name
      })
        .then(user => {
          //if the username is unique 
          if (!user) {
            //if the username is unique go ahead and create userData after hashing password and salt
            db.addDocumentByCollection(req.body,consts.COURIERS)
                .then(user => {
                  //after successfully creating userData display registered message
                  res.json( {status:consts.SUCCESS,message:'The register of user complete!'})
                })
                .catch(err => {
                  //if an error occured while trying to create userData, go ahead and display the error
                  res.json( {status:consts.ERROR, message:'error1:' + err})
                })
          } else {
            db.pushToArray(consts.COURIERS,{user_name:user_name},{ company_id: company_id  })
            .then(user => {
                //after successfully creating userData display registered message
                res.json( {status:consts.SUCCESS,message:'The register of user complete!'})
              })
              .catch(err => {
                //if an error occured while trying to create userData, go ahead and display the error
                res.json( {status:consts.ERROR, message:'error1:' + err})
              })
          }
        })
        .catch(err => {
          //display error if an error occured
          res.json({status:consts.ERROR,message:'error2:' + err})
        })
      }
    //res.send("created new courier successfully ")
 
exports.add_delivery = async function(req, res) {
    orders = req.files.file
    company_id = req.body.company;
    allOrders =await parser.csvFileToJson(orders.data.toString(),company_id);
    db.addManyDocumentsByCollection(allOrders,consts.ORDERS).then(result => {
      //after successfully creating userData display registered message
      res.json( {status:consts.SUCCESS,message:'The Addition complete!'})
    })
    .catch(err => {
      //if an error occured while trying to create userData, go ahead and display the error
      res.json( {status:consts.ERROR, message:'error1:' + err})
    })
  }
    exports.add_order = async function(req, res) {
      var order = req.body
      try{
        var result = await db.addDocumentByCollection(order,consts.ORDERS)
        if (result.express){
          res.json( {status:consts.SUCCESS,message:'the order added successfuly, looking for the best courier'})
          var courier_ststus = await dispatch_delivery(result)
        }
        else{ res.json( {status:consts.SUCCESS,message:'the order added successfuly'})}
       
      }catch(err){
        res.json( {status:consts.ERROR, message:'error1:' + err})
      }
};
exports.findCourier = async function(req, res) {
  res.send(await db.getDocs(consts.COURIERS,JSON.parse(req.query.params)));
};
exports.findCourierById = async function(req, res) {
  await db.getDocById(consts.COURIERS,JSON.parse(req.query.params)._id).then(response =>{
    if(response){
      res.json({data:response,msg:consts.SUCCESS})
    }else{
      res.json({msg:"courier doesn't exist"})
    }
  });
};

exports.findOrders = async function(req, res) {
  res.send(await db.getDocs(consts.ORDERS,JSON.parse(req.query.params)));
};
exports.findOrderById = async function(req, res) {
  res.send(await db.getDoc(consts.ORDERS,{"_id": ObjectId(`${req.query._id}`)}));
};  

exports.deleteC = async function(req, res) {
    res.send(await db.removeDocumentById(req.query.collection,req.query._id));
};

exports.deleteOrder = async function(req, res) {
  res.send(await db.removeDocumentById(req.query.collection,req.query._id));
};
exports.get_all_deliveries = async function(req, res) {
  var id = req.query.id
  var query_find = { _id: ObjectId(id)}
  var query_projection = { projection: { _id:0,company_id:1 }}
  var companyIds = await db.findOne(consts.COURIERS,query_find,query_projection)
  query_find = { company_id: { $in : companyIds["company_id"]}}
  var result = await db.getDocs(consts.ORDERS,query_find)
  //console.log("the deliveries sent : "+ JSON.stringify(result) )
  console.log("the deliveries sent successfuly")
  res.send(JSON.stringify(result))
}

exports.update_courier_status = async function(req, res) {
    var id = req.params.userId
    var courier_status = req.body.status
    var object_id = new ObjectId(id);
    var query_find = { _id: object_id}
    var query_update = {$set: {status:courier_status}}
    var result = await db.updateDoc(consts.COURIERS,query_find,query_update)
    res.send(JSON.stringify(result))
}
exports.update_delivery_info = async function(req, res) {
  var id = req.body.params.id
  var object_id = new ObjectId(id);
  var query_find = { _id: object_id}
  var result = await db.updateDocument(consts.ORDERS,query_find,req.body.params.update).then(user => {
    //after successfully 
    res.json( {status:consts.SUCCESS})
  })
  .catch(err => {
    //if an error occured go ahead and display the error
    res.json( {status:consts.ERROR, message:'error1:' + err})
  })
}
exports.update_company_info = async function(req, res) {
  var id = req.body.params.id
  var object_id = new ObjectId(id);
  query_find = { _id: object_id}
  result = await db.updateDocument(consts.COMAPNIES,query_find,req.body.params.update).then(user => {
    //after successfully 
    console.log(user)
    res.json( {status:consts.SUCCESS,message:'profile inforamtion update succsessfully',user:user})
  })
  .catch(err => {
    //if an error occured go ahead and display the error
    res.json( {status:consts.ERROR, message:'error1:' + err})
  })
}
exports.update_courier_info = async function(req, res) {
  var id = req.params.userId
  const userData = {
    first_name : req.body.firstName,
    last_name : req.body.lastName,
    phone_number : req.body.phoneNumber,
    Vehicle_type : req.body.VehicleType,
  }

  var object_id = new ObjectId(id);
  var query_find = { _id: object_id}
  var query_update = {$set: userData}
  var result = await db.updateDoc(consts.COURIERS,query_find,query_update)
  res.send(JSON.stringify(result))
}


exports.update_delivery_status = async function(req, res) {
  if(req.body.status == "on the way"){
    var status = await getDeliveryStatus(req.params.deliveryId);
    if (status != "pending"){
      res.send(consts.ERROR)
      return
    }
  }
  var object_deliveryId = new ObjectId(req.params.deliveryId);
  var query_find = { _id: object_deliveryId}
  var query_update = {$set: {status:req.body.status,courier_id:req.body.courier_id}}
  var result = await db.updateDoc(consts.ORDERS,query_find,query_update)
  res.send(JSON.stringify(result))
}


async function dispatch_delivery(delivery) {
  var find_courier = false
  var alreadySent = []
  for(var ring =0; ring<6;ring++){
    var courierIndices = await geo.findCouriersWithIndex(delivery,alreadySent) // filter the rellevent couriers
    var rings = await geo.getRingFromSrc(delivery.src,ring)
    var bestCouriers = await geo.findCouriersInRings(courierIndices,rings)
    if (bestCouriers.length > 0){
        console.log(" find courier in ring number : " + ring)
    }
    var couriers =  await geo.sortByLocation(bestCouriers,delivery) // sort the couriers by duration
 
    // send notfication by order until courier accept
    for(var i =0; i < couriers.length;i++){
        var cou = couriers[i]
        await con.sendNotification(delivery,cou.courier.token) //send notfication
        alreadySent.push(cou.courier._id.toString())
        await new Promise(resolve => setTimeout(resolve, 12000)); // wait to answer
        var status = await getDeliveryStatus(delivery._id) // check if courier accept/decline
        if (status != "pending"){
            find_courier=true 
            console.log("find courier")
            break
        }
        else{
          console.log("the courier decline the request try next courier...")
        }
    }
    if (find_courier){
      break
    }

  }
  if (!find_courier){
    var object_deliveryId = new ObjectId(delivery._id);
    var query_find = { _id: object_deliveryId}
    var query_update = {$set: {status:"issue"}}
    var result = await db.updateDoc(consts.ORDERS,query_find,query_update)
    return "sorry, couldn't find courier for the delivery request"
  }
  return consts.SUCCESS
        
}


 async function getDeliveryStatus(deliveryId) {
  var object_id = new ObjectId(deliveryId)
  var query_find = { _id: object_id}
  var query_projection = {_id:0,status:1}
  var result = await db.findOne(consts.ORDERS,query_find,query_projection)
  console.log("get delivery function: result: " + result.status)
  return result.status
}

/*async function findBestCouriers(delivery){
    var bestCourier = []
    var courierIndices = []
    latLong = delivery.src
    allCouriers = await db.getCouriersByFilters(delivery.company_id,delivery.Vehicle_type)
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
          //console.log("the courier is : " + JSON.stringify(courierIndices[j].courier))
           var index = courierIndices[j].index
           if (rings.includes(index)){
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
    
};*/
exports.add_courier_token = async function(req, res) {
    var id = req.params.userId
    var courier_token = req.body.token
    console.log("the token is :" + courier_token)

    var object_id = new ObjectId(id);
    var query_find = { _id: object_id}
    var query_update = {$set: {token:courier_token}}
    result = await db.updateDoc(consts.COURIERS,query_find,query_update)
    res.send(JSON.stringify(result))
}

exports.get_order = async function(req, res){
  var order_id = req.params.orderId
  var object_id = new ObjectId(order_id)
  var query_find = {_id: object_id}
  var result = await db.findOne(consts.ORDERS,query_find);
  console.log("get order function :: the order is : " +JSON.stringify(result) )
  res.send(JSON.stringify(result))
}
exports.get_courier = async function(req, res){

    var courier_id = req.params.courierId
    var object_id = new ObjectId(courier_id)
    var query_find = {_id: object_id}
    var result = await db.findOne(consts.COURIERS,query_find);
    console.log("get_courier function :: the Courier is : " +JSON.stringify(result) )
    var companyIds = []
    result.company_id.forEach((value)=> 
    companyIds.push(new ObjectId(value)) )
    query_find = { _id: { $in : companyIds}}
    var query_projection = { projection: { _id:0,company_name:1 }}
    var result2 =await  db.getDocs(consts.COMAPNIES,query_find,query_projection)
    var comapnyNames = []
    result2.forEach((value)=> comapnyNames.push(value.company_name))
    result.company_name = comapnyNames;
    res.send(JSON.stringify(result))
}