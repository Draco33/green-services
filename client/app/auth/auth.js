// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('GS.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  ////this function checks if the user exist and return the token
  $scope.signinUser = function () {
    Auth.signinUser($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.GSuser', token);
        $location.path('/user');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  ////this function checks if the provider exist and return the token
   $scope.signinServiceProvider = function () {
    Auth.signinServiceProvider($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.GSprovider', token);
        $location.path('/serviceProvider');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
/////add new user and create new token.
  $scope.signupUser = function () {
    Auth.signupUser($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.GSuser', token);
        $location.path('/user');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
/////add new provider and create new token.
////but before sign up it will take the provider location in order to determine the area the provider service.
    $scope.signupServiceProvider = function () {
       if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            $scope.user.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          }); 
        } else {
          // Browser doesn't support Geolocation
          alert('your browser dos not support the geolocation');
        }
        setTimeout(function () {
          Auth.signupServiceProvider($scope.user)
          .then(function (token) {
            $window.localStorage.setItem('com.GSprovider', token);
            $location.path('/serviceProvider');
          })
          .catch(function (error) {
            console.error(error);
          });
        }, 3000)
      
  };
});
