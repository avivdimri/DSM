module.exports = function(app) {
    const model = require('../Model/model');
    const login = require('../Model/login/login')
    const register = require('../Model/login/register')

    const parser = require('../csv_parser/parser');
    app.route('/api/register')
        .post(register.register)
    app.route('/api/login')
        .post(login.login)

    app.route('/api/add')
        .post(model.addCourier)
    app.route('/api/courier')
        .get(model.findCourier)
    app.route('/api/delete')
        .delete(model.deleteC)
    app.route('/api/login_courier')
        .post(login.login_courier)
        
    app.route('/companyID/deliveries')
        .post(model.add_delivery)

    app.route('/getAllDeliveries')
     .get(model.get_all_deliveries)
    
    
    app.route('/courier_status/:userId')
     .put(model.update_courier_status)
    app.route('/delivery_status/:deliveryId')
     .put(model.update_delivery_status)
    app.route('/updateCourierInfo/:userId')
     .put(model.update_courier_info)
    

    app.route('/courier_token/:userId')
    .put(model.add_courier_token)

    app.route('/get_order/:orderId')
    .get(model.get_order)
    app.route('/get_courier/:courierId')
    .get(model.get_courier)
         
};