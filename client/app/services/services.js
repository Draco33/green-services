angular.module('GS.services', [])

.factory('Orders', function ($http) {
  ////this function must executed when the client press on submit order button and after this save
  ////the order to the database we have a route inside the server route file which will execute the function which will add an order to the database
  var addOneOrder = function (order) {
    return $http({
      method: 'POST',
      url: '/api/order',
      data: JSON.stringify(order)
    })
    .then(function (resp) {
      return resp;
    });
  };
return {
    addOneOrder: addOneOrder
  };
})
.factory('Services',function($http){
  ///this function will execute when logging in as service provider it will take the whole orders belongs
  ///to the service provider.
  var getAllOrders = function(serviceType){
    console.log(serviceType)
    return $http({
      method:'POST',
      url:'/api/orders',
      data: {serviceType: serviceType}
    })
    .then(function (resp) {
      return resp;
    })
  }
  ///this function will call once signing in as service provider to take the service provider info from the service provider schema
  var getSPInfo = function (token) {
    return $http({
      method: 'POST',
      url: '/api/SPinfo',
      data: {token:token}
    })
    .then(function (resp) {
      return resp;
    })
  }
  ///this function will execute when the service provider issues the delievered link button and it will update the flag inside the database for the clicked order to true which means the order submitted successfuly.
  var delivered = function (order_id) {
    return $http({
      method: 'POST',
      url: '/api/delivered',
      data: JSON.stringify({order_id: order_id})
    })
    .then(function (resp) {
      return resp;
    }); 
  } 
  return {
    delivered:delivered,
    getAllOrders:getAllOrders,
    getSPInfo: getSPInfo
  }
})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.GS'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server


  ///this function will execute when sign in as user it will check if the user has credentials in order to access as user
  var signinUser = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signinUsers',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };
  //this function will execute when sign in as service provider it will check if the service provider has credentials and it will assign a token
 var signinServiceProvider = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signinServiceProvider',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };
  ////add new user to the user schema and response with the user token.
  var signupUser = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signupUsers',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };
   ///add new user to the service provider schema and response with the provider token.
 var signupServiceProvider = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signupServiceProvider',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };
  ///this function execute each time when the user trying to redirect from on path to another it will check 
  ///the user if has token or not if yes so it is authenticated no need to sign in another time.
  var isAuthuser = function () {
    return !!$window.localStorage.getItem('com.GSuser');
  };
  ///this function execute each time when the provider trying to redirect from on path to another it will check 
  ///the provider if has token or not if yes so it is authenticated no need to sign in another time.
  var isAuthprovider = function () {
    return !!$window.localStorage.getItem('com.GSprovider');
  };
  ///this function will execute each time the user sign out it will remove the token so it is ready to sign in as another user.
  var signoutUser = function () {
    $window.localStorage.removeItem('com.GSuser');
    $location.path('/');
  };
  ///this function will execute each time the provider sign out it will remove the token so it is ready to sign in as another provider.
  var signoutProvider = function () {
    $window.localStorage.removeItem('com.GSuser');
    $location.path('/');
  };


  return {
    signinUser: signinUser,
    signupUser: signupUser,
    signinServiceProvider: signinServiceProvider,
    signupServiceProvider: signupServiceProvider,
    isAuthuser: isAuthuser,
    isAuthprovider: isAuthprovider,
    signoutUser: signoutUser,
    signoutProvider: signoutProvider
  };
});
