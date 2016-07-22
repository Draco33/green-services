var ordersController = require('../orders/ordersController.js');
var userController = require('../users/userController.js');
var serviceProviderController = require('../providers/providerController.js');
var helpers = require('./helpers.js'); // our custom middleware

module.exports = function (app, express) {

  app.post('/api/users/signinUsers', userController.signinAsUser);
  app.post('/api/users/signupUsers', userController.signupAsUser);
  app.get('/api/users/signedinUser', userController.checkAuthUser);
  app.post('/api/users/signinServiceProvider', serviceProviderController.signinAsServiceProvider);
  app.post('/api/users/signupServiceProvider', serviceProviderController.signupAsProvider);

  // authentication middleware used to decode token and made available on the request
  //app.use('/api/user', helpers.decode);
  app.get('/api/orders/', helpers.decode, ordersController.allOrders);
  app.post('/api/order/', helpers.decode, ordersController.newOrder);
  app.post('/api/delivered', ordersController.delivered)

  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

