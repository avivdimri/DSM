//'use strict';
const crypto = require('crypto')
//import user model
var db = require('../dbUtils');
const consts = require('../../consts');

exports.login = function (req,res){
   db.findOne(consts.COMAPNIES,{
       //check to see if a username and password match like this is in the database
       user_name: req.body.user_name.toLowerCase(),
       password: crypto.pbkdf2Sync(req.body.password, consts.SALT,  
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
  db.findOne(consts.COURIERS,{
      //check to see if a username and password match like this is in the database
      user_name: req.body.user_name.toLowerCase(),
      password: crypto.pbkdf2Sync(req.body.password, consts.SALT,  
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