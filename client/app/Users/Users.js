angular.module('GS.Users', [])

<<<<<<< HEAD
.controller('UserController', function ($scope, Orders) {
  // Your code here
  ///this function must call on submit click
=======
.controller('UserController', function ($scope, Auth, Orders) {
  var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(31.971715, 35.8355179),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
  $scope.map = new google.maps.Map(document.getElementById('leftMap'), mapOptions);
>>>>>>> 2e26efd9bcbc990deeeee128491d44937f25197c
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
          alert('your browser does not support the geolocation');
        }
  $scope.order.totalPrice = 0;
  var prices = {gasCylinder: 8, water: 1, diesel: 5};
  $scope.order.serviceType;
  $scope.order.username;
  ///this function will take the value of the clicked option which is eather Gas or water or diesel.
  $scope.getVal=function(event){
      $scope.order.serviceType = event.currentTarget.value;
  }
   ///this function will executed when the user click on the submit button inside the order page and
   ///it will call the addOneOrder which is inside the services file the addOneOrder function will add an order to the orders schema
  $scope.addOrder=function(){
  	Orders.addOneOrder($scope.order).then(function(){
  	})
  	.catch(function(err){
  		console.log(err);
  	})
  }
<<<<<<< HEAD
=======
  ////this function will executed when the signout button inside the orders screen issued from the user
  ///so it will call the signoutUser function inside the Auth factory and will remove the token for user.
  $scope.signoutUser = function () {
    Auth.signoutUser()
  }
>>>>>>> 2e26efd9bcbc990deeeee128491d44937f25197c
});
