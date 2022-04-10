//'use strict';
const crypto = require('crypto')
//import user model
var db = require('../dbUtils');
// Creating salt for all users
let salt = 'f844b09ff50c'
exports.login = function (req,res){
   db.findOne({
       //check to see if a username and password match like this is in the database
       user_name: req.body.user_name,
       password: crypto.pbkdf2Sync(req.body.password, salt,  
         1000, 64, `sha512`).toString(`hex`)
     },"Companies")
       .then(user => {
         //if the username and password match exist in database then the user exists
         if (user) {
           const payload = {
            user_name: user.user_name,  
            password: user.password 
           }
           //after successful login display token and payload data
           res.json('succsess');
         } else {
           //if user cannot be found, display the message below
           res.json('wrong username or password')
         }
       })
       //catch and display any error that occurs while trying to login user
       .catch(err => {
         res.send('error:' + err)
       })
}