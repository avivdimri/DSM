//'use strict';
module.exports = function(app) {
    const model = require('../Model/model');

    app.route('/sign_up_company')
        .post(model.sign_up_company)
      
    app.route('/sign_up_courier')
        .post(model.sign_up_courier)
      
    app.route('/companyID/deliveries')
        .post(model.add_delivery)

};
