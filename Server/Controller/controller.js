module.exports = function(app) {
    const model = require('../Model/model');
    const login = require('../Model/login/login')
    const register = require('../Model/login/register')
    

    app.route('/api/register')
        .post(register.register)
    app.route('/login')
        .post(login.login)
    // app.route('/sign_up_company')
    //     .post(model.sign_up_company)
      
    app.route('/sign_up_courier')
        .post(model.sign_up_courier)
      
    app.route('/companyID/deliveries')
        .post(model.add_delivery)
    
};