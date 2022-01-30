 'use strict';

const { json } = require("express/lib/response");

// 

exports.log = function(req, res) {
    console.log("created company!!!!");
    res.send("created the company successfully")
    };

exports.sign_up_company = function(req, res) {
    console.log("created new user with email:" + req.query.email + " ,password:" + req.query.password);
    //need to add to db
    res.send("created new company successfully ")
    };
exports.sign_up_courier = function(req, res) {
    console.log(req.body)
     //need to add to db
    res.send("created new courier successfully ")
    };
    
exports.add_delivery = function(req, res) {
    console.log("created delivery to company id =" + req.body.id);
    console.log(req.body)
    if (req.body.timing == "now"){
        findBestCourier(req.body.id)
        res.send("send to best courier")
    }
    else
        res.send("created new delivery successfully ")
    };

    
   function findBestCourier(id_company){
       console.log("TBD")
   }


// // var mongoose = require('mongoose'),
//  // Task = mongoose.model('Deliveries');
// Company

// exports.create_company = function(req, res) {
//     var new_company = new Company(req.body);
//     new_company.save(function(err, company) {
//         console.log("created comapny!!!!" + req.body);
//         if (err)
//             res.send(err);
//         res.json(company);
//     });
// };
    

// Courier


// exports.list_all_couriers = function(req, res) {
//     Courier.find({}, function(err, couriers) {
//         if (err)
//             res.send(err);
//         res.json(couriers);
//     });
// };

// exports.create_courier = function(req, res) {
//     var new_courier = new Courier(req.body);
//     new_courier.save(function(err, courier) {
//         console.log("created courier!!!!" + req.body);
//         if (err)
//             res.send(err);
//         res.json(courier);
//     });
// };



// exports.get_courier = function(req, res) {
//     Courier.findById(req.params.courierId, function(err, courier) {
//     if (err)
//       res.send(err);
//     res.json(courier);
//   });
// };


// exports.update_courier = function(req, res) {
//     Courier.findOneAndUpdate({_id: req.params.courierId}, req.body, {new: true}, function(err, courier) {
//     if (err)
//       res.send(err);
//     res.json(courier);
//   });
// };


// exports.delete_courier = function(req, res) {
//     Courier.remove({
//     _id: req.params.courierId
//   }, function(err, courier) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Courier successfully deleted' });
//   });
// };


// delivery 

// exports.list_all_deliveries = function(req, res) {
//     delivery.find({}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };



// exports.add_delivery = function(req, res) {
//   var new_delivery = new delivery(req.body);
//   new_delivery.save(function(err, task) {
//     console.log("added delivery!!!!" + req.body);
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };



// exports.get_delivery = function(req, res) {
//     delivery.findById(req.params.deliveryId, function(err, delivery) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.update_delivery = function(req, res) {
//     delivery.findOneAndUpdate({_id: req.params.deliveryId}, req.body, {new: true}, function(err, delivery) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.delete_delivery = function(req, res) {
//   delivery.remove({
//     _id: req.params.deliveryId
//   }, function(err, delivery) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Delivery successfully deleted' });
//   });
// };
