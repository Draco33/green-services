angular.module('GS.Users', [])

.controller('UserController', function ($scope, Orders) {
  // Your code here
  ///this function must call on submit click
  $scope.order = {};
  $scope.order.totalPrice = 0;
  var prices = {gasCylinder: 8, water: 1, diesel: 5};
  $scope.order.serviceType;
  $scope.order.username = 'housam33';
  $scope.getVal=function(event){
      $scope.order.serviceType = event.currentTarget.value;
  }
    $scope.order.totalPrice = parseInt($scope.order.quantity) * prices[$scope.order.serviceType];
  $scope.addOrder=function(){
  	Orders.addOneOrder($scope.order).then(function(){
      console.log($scope.order)
  	})
  	.catch(function(err){
  		console.log(err);
  	})
  }
});
