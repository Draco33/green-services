var Order = require('./orderModel.js');
   User=require('../users/userModel.js')
    Q = require('q');
    
var findOrder = Q.nbind(Order.findOne, Order);
var createOrder = Q.nbind(Order.create, Order);
var findAllOrders = Q.nbind(Order.find, Order);
var findUser = Q.nbind(User.findOne, User);
var updateOrder = Q.nbind(Order.findOneAndUpdate, Order);
module.exports = {

  allOrders: function (req, res, next) {
    console.log('asdfasdf', req.body.serviceType)
  findAllOrders({delivered: false, serviceType: req.body.serviceType})
    .then(function (orders) {
      res.json(orders);
    })
    .fail(function (error) {
      console.error(error);
    });
  },

  newOrder: function (req, res, next) {
    var serviceType = req.body.serviceType;
    var quantity = req.body.quantity;
    var username = req.user.username;
    var fullName=req.user.fullName;
    var address=req.user.address;
    var phoneNumber=req.user.phoneNumber;
    var orderDate = new Date();
    var userLocation= req.body.userLocation;
    var totalPrice = req.body.totalPrice;
    var newOrder = {
            serviceType: serviceType,
            quantity: quantity,
            fullName:fullName,
            address:address,
            phoneNumber:phoneNumber,
            username: username,
            totalPrice: totalPrice,
            userLocation: userLocation,
            delivered:"false"
          };
    createOrder(newOrder)
    .then(function (createdOrder) {
        if (createdOrder) {
          res.json(createdOrder);
        }
      })
      .fail(function (error) {
        console.err(error);
      });
  },

  delivered: function(req, res, next) {
    // find the order and change the delivered
    var order_id = req.body.order_id;
    updateOrder({_id:order_id},{$set:{delivered:"true"}},function(err,doc){
      if(err){
        console.log("Something wrong when updating data!");
    }
    console.log("dooooc",doc);
    })
  }
};
