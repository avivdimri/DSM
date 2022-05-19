module.exports = function(app) {
    const model = require('../Model/model');
    const login = require('../Model/login/login')
    const register = require('../Model/login/register')
    

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
    // app.route('/api/delete')
    //     .delete(model.deleteC)
    // app.route('/sign_up_company')
    //     .post(model.sign_up_company)
      
    // app.route('/sign_up_courier')
    //     .post(model.sign_up_courier)
      
    // app.route('/companyID/deliveries')
    //     .post(model.add_delivery)
    
};