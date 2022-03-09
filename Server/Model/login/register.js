//'use strict';
const crypto = require('crypto')
//import user model
var db = require('../dbUtils');
// Creating salt for all users
let salt = 'f844b09ff50c'
exports.register= function(req, res){
    const userData = {
        //values should be those in the user model important
        user_name : req.body.user_name, 
        password: req.body.password,
        company_name: req.body.company_name,
      }
      db.findOne({
        //ensure username is unique, i.e the username is not already in the database
        user_name:req.body.user_name
      },"Companies")
        .then(user => {
          //if the username is unique 
          if (!user) {
            let hash = crypto.pbkdf2Sync(userData.password, salt,  
            1000, 64, `sha512`).toString(`hex`);
            userData.password = hash
            //if the username is unique go ahead and create userData after hashing password and salt
            db.addDocumentByCollection(userData,"Companies")
                .then(user => {
                  //after successfully creating userData display registered message
                  res.json('The register of ' + req.body.user_name + ' complete!')
                })
                .catch(err => {
                  //if an error occured while trying to create userData, go ahead and display the error
                  res.send('error1:' + err)
                })
          } else {
            //if the username is not unique, display that username is already registered with an account
            res.json({ error: 'The username ' + req.body.user_name + ' is registered with an account' })
          }
        })
        .catch(err => {
          //display error if an error occured
          res.send('error2:' + err)
        })
    }
