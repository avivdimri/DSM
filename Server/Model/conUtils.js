

const axios = require('axios');

exports.sendToCourierDelivery = function(delivery){
    //TBD
    console.log("send new delivery message ")
}
exports.sendNotification = async function(delivery,token) {
    console.log(" the token is "+ token )
   
     var headerNotification =
     {"headers":{
       'Content-Type': 'application/json',
       'Authorization': 'key=AAAA0lbMz8I:APA91bG36p30LIkNBSnHF5SAxa_G5aNIwFdlMihdzkBpxJScKuNYsxeIjf_YQu4P6fzj36FnoGkU6W39DsaCpwwJQmX0w01DFePzIjPuMcFI9m5EGZ7Efq-K-6TRZx7RCqs4Jgq6VIBg',
     }};
   
     var bodyNotification =
     {
       "body":`Destination Address: \n ${delivery.dest_address}.`,
       "title":"New Delivery Request"
     };
       var data = 
       {
         "click_action": "FLUTTER_NOTIFICATION_CLICK",
         "id": "1",
         "status": "done",
         "deliveryId": delivery._id,
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
     } catch (error) {
       console.log(error.response);
     }
   
             
   }