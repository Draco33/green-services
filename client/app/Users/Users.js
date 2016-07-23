angular.module('GS.Users', [])

.controller('UserController', function ($scope, Orders) {
  // Your code here
  ///this function must call on submit click
  $scope.order = {};
  if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            $scope.order.userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          }); 
        } else {
          // Browser doesn't support Geolocation
          alert('your browser dos not support the geolocation');
        }
  $scope.order.totalPrice = 0;
  var prices = {gasCylinder: 8, water: 1, diesel: 5};
  $scope.order.serviceType;
  $scope.order.username;
  $scope.getVal=function(event){
      $scope.order.serviceType = event.currentTarget.value;
  }
    $scope.order.totalPrice = parseInt($scope.order.quantity) * prices[$scope.order.serviceType];
  $scope.addOrder=function(){
  	Orders.addOneOrder($scope.order).then(function(){
  	})
  	.catch(function(err){
  		console.log(err);
  	})
  }
});
