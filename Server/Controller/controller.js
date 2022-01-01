'use strict';
module.exports = function(app) {
     var model = require('../Model/model');

    app.route('/admin/create_company')
        // .post(model.create_company)
        .get(model.log)

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
