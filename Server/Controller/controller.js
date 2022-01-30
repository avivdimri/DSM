'use strict';
module.exports = function(app) {
    var model = require('../Model/model');
    
    // app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(bodyParser.json());
    // app.configure(function(){
    //     app.use(express.bodyParser());
    //   });

    app.route('/sign_up_company')
        .post(model.sign_up_company)
        .get(model.log)
    app.route('/sign_up_courier')
        .post(model.sign_up_courier)
        .get(model.log)
    app.route('/companyID/deliveries')
        .post(model.add_delivery)

    //     .get(model.list_all_couriers)
    //     .post(model.create_courier)
    // app.route('companyID/couriers')
    //     .get(model.list_all_couriers)
    //     .post(model.create_courier)
    
    // app.route('couriers/:courierId')
    //     .get(model.get_courier)
    //     .put(model.update_courier)
    //     .delete(model.delete_courier);


    // app.route('companyID/deliveries')
    //     .get(model.list_all_deliveries)
    //     .post(model.add_delivery)


    // app.route('/deliveries/:deliveryId')
    //     .get(model.get_delivery)
    //     .put(model.update_delivery)
    //     .delete(model.delete_delivery);
};
