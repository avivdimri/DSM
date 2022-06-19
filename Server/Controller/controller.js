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
    app.route('/api/courierId')
        .get(model.findCourierById)
    app.route('/api/delete')
        .delete(model.deleteC)
    app.route('/api/order_by_company')
        .get(model.findOrders)
    app.route('/api/delete_order_by_company')
        .delete(model.deleteOrder)
    app.route('/api/login_courier')
        .post(login.login_courier)
    app.route('/sign_up_courier')
        .post(model.sign_up_courier)
    app.route('/sign_in_courier')
        .post(model.sign_in_courier)
    app.route('/api/add_order')
        .post(model.add_order)
    app.route('/api/findOrder')
        .get(model.findOrderById)    
    app.route('/api/companyID/deliveries')
        .post(model.add_delivery)
    app.route('/getAllDeliveries')
        .get(model.get_all_deliveries)

    app.route('/')
     .get(model.consolelog)
    
    app.route('/courier_status/:userId')
     .put(model.update_courier_status)
     app.route('/delivery_status/:deliveryId')
     .put(model.update_delivery_status)
    app.route('/api/update_order')
     .put(model.update_delivery_info)
     app.route('/api/update_company')
     .put(model.update_company_info)
     
    app.route('/updateCourierInfo/:userId')
     .put(model.update_courier_info)

    app.route('/courier_token/:userId')
    .put(model.add_courier_token)

    app.route('/get_order/:orderId')
    .get(model.get_order)
    app.route('/get_courier/:courierId')
    .get(model.get_courier)
         
};
