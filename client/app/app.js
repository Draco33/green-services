angular.module('GS', [
  'GS.services',
  'GS.auth',
  'GS.Users',
  'GS.serviceProvider',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signinAsUser', {
      templateUrl: 'app/auth/signinAsUser.html',
      controller: 'AuthController'
    })
    .when('/signupAsUser', {
      templateUrl: 'app/auth/signupAsUser.html',
      controller: 'AuthController'
    })
    .when ('/signinAsserviceProvider',{
      templateUrl: 'app/auth/signinAsserviceProvider.html',
      controller: 'AuthController'
    })
    .when('/signupAsserviceProvider',{
      templateUrl: 'app/auth/signupAsserviceProvider.html',
      controller: 'AuthController'
    })
    .when('/user',{
      templateUrl: 'app/Users/Users.html',
      controller: 'UserController',
      authenticate: true
    })
    .when('/serviceProvider',{
       templateUrl: 'app/serviceProvider/serviceprovider.html',
       controller: 'serviceproviderController',
       authenticate: true
    })
    
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.GSuser');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  ////here we are using two checking statements because we have multi users with differant privilثges.
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if ($location.path() === "/user" && next.$$route && next.$$route.authenticate && !Auth.isAuthuser()) {
      $location.path('/signinAsUser');
    }else if($location.path() !== "/user" && next.$$route && next.$$route.authenticate && !Auth.isAuthprovider()){
      $location.path('/signinAsserviceProvider');
    }
  });
});
