//'use strict';
const crypto = require('crypto')
//import user model
var db = require('../dbUtils');
// Creating salt for all users
let salt = 'f844b09ff50c'
exports.login = function (req,res){
   db.findOne("Companies",{
       //check to see if a username and password match like this is in the database
       user_name: req.body.user_name,
       password: crypto.pbkdf2Sync(req.body.password, salt,  
         1000, 64, `sha512`).toString(`hex`)
     })
       .then(user => {
         //if the username and password match exist in database then the user exists
         if (user) {
           //after successful login display token and payload data
           res.json({user:user,
                    message:'succsess'});
         } else {
           //if user cannot be found, display the message below
           res.json({message:'wrong username or password'})
         }
       })
       //catch and display any error that occurs while trying to login user
       .catch(err => {
         res.json({message:'error:' + err})
       })
}
exports.login_courier = function (req,res)
{
  db.findOne("Couriers",{
      //check to see if a username and password match like this is in the database
      user_name: req.body.user_name,
      password: crypto.pbkdf2Sync(req.body.password, salt,  
        1000, 64, `sha512`).toString(`hex`)
    })
      .then(user => {
        //if the username and password match exist in database then the user exists
        if (user) {
          //after successful login display token and payload data
          res.send(user._id);
        } else {
          //if user cannot be found, display the message below
          res.send('wrong username or password')
        }
      })
      //catch and display any error that occurs while trying to login user
      .catch(err => {
        res.send(err)
      })
}