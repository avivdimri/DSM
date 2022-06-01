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
    app.route('/api/order_by_company')
        .get(model.findOrders)
    app.route('/api/delete_order_by_company')
        .delete(model.deleteOrder)
    app.route('/sign_up_courier')
        .post(model.sign_up_courier)
    app.route('/sign_in_courier')
        .post(model.sign_in_courier)
      
    app.route('/companyID/deliveries')
        .post(model.add_delivery)

    app.route('/')
     .get(model.consolelog)
    
    app.route('/courier_status/:userId')
     .put(model.update_courier_status)
    

    app.route('/courier_token/:userId')
    .put(model.add_courier_token)
         
};
