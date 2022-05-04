//'use strict';
const crypto = require('crypto')
//import user model
var db = require('../dbUtils');
// Creating salt for all users
let salt = 'f844b09ff50c'

exports.register= function(req, res){
  let collection = getUserType(req.body);
  switch (collection) {
    case "Companies":
      registerCompany(req.body,res);
      break;
  
    default://Couriers
      registerCourier(req.body,res);
      break;
  }   
}

function getUserType(user){
  if(user.company_name){
    return "Companies"
  }
  return "Couriers"
}

function registerCompany(user,res){
 
  const userData = {
    //values should be those in the user model important
    user_name : user.user_name, 
    password: user.password,
    company_name: user.company_name
  }
  db.findOne({
    //ensure username is unique, i.e the username is not already in the database
    user_name:userData.user_name
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
              res.json( {user:user,
                message:'The register of user complete!'})
            })
            .catch(err => {
              //if an error occured while trying to create userData, go ahead and display the error
              res.json( { message:'error1:' + err})
            })
      } else {
        //if the username is not unique, display that username is already registered with an account
        res.json( {message:'The email ' + userData.user_name + ' is already in use'} )
      }
    })
    .catch(err => {
      //display error if an error occured
      res.json({message:'error2:' + err})
    })
}

function registerCourier(user,res){
 
  const userData = {
    //values should be those in the user model important
    user_name : user.user_name, 
    password: user.password,
    
  }
  db.findOne({
    //ensure username is unique, i.e the username is not already in the database
    user_name:userData.user_name
  },"Couriers")
    .then(user => {
      //if the username is unique 
      if (!user) {
        res.json({message:'user name not found, please contact your company'});

      } else {

        if(user.password){
          res.json({message:'user already in use'});

        }else{
          let hash = crypto.pbkdf2Sync(userData.password, salt,  
            1000, 64, `sha512`).toString(`hex`);
            userData.password = hash
            //if the username is unique go ahead and create userData after hashing password and salt
            db.updateDocument("Couriers",user,userData)
                .then(user => {
                  //after successfully creating userData display registered message
                  res.json({user:user,
                    message:'The register of user complete!'});
                })
                .catch(err => {
                  //if an error occured while trying to create userData, go ahead and display the error
                  res.json({ message:'error1:' + err});
                })
        }
      }
    })
    .catch(err => {
      //display error if an error occured
      res.json({message:'error2:' + err});
    })
}