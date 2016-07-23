angular.module('GS.serviceProvider', [])

.controller('serviceproviderController', function ($scope, $window, Auth, Services) {
  $scope.data={};
  $scope.markers = [];
  ///this function called here in order to take the provider information and 
  Services.getSPInfo($window.localStorage.getItem('com.GSprovider')).then(function (SP) {
    $scope.serviceType = SP.data.serviceType;
    $scope.center = SP.data.center;
    $scope.radius = SP.data.radius;
    ////this to put a circle that determine the limits which covered by provider
    var serProvCircle = new google.maps.Circle({
      strokeColor: 'green',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: 'green',
      fillOpacity: 0.07,
      map: $scope.map,
      center: {lat: $scope.center.lat, lng: $scope.center.lng },
      radius: $scope.radius
    });
    ////this function for taking the information from the database for each order and put a marker for each order inside the map.
    Services.getAllOrders($scope.serviceType).then(function(data){
      $scope.data.orders=data.data;
      for (i = 0; i < data.data.length; i++) {
        createMarker(data.data[i]);
      }
      console.log(data.data)
    })
    .catch(function(err){
      console.error(err);
    });
  })
  var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(31.971715, 35.8355179),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    ////to change the delivered flag in the database to true which means the order arrived to the client successfuly
  $scope.delivered = function(index){
  	Services.delivered($scope.data.orders[index]._id);//order_id depend on database
    $scope.data.orders.splice(index, 1);
    $scope.markers.splice(index, 1);
  }
  
    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function(order) {
      var marker = new google.maps.Marker({
        map: $scope.map,
        position: new google.maps.LatLng(order.userLocation.lat, order.userLocation.lng),
        user: order.fullName,
        address: order.address,
        phoneNumber: order.phoneNumber,
        quantity: order.quantity,
        orderDate: order.orderDate
      });
      marker.content = '<div class="infoWindowContent">'+ order.fullName +'<br>'+ order.address +'<br>'+ order.phoneNumber +'</div>';

      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent('<h2>' + marker.user + '</h2>' + marker.content);
        infoWindow.open($scope.map, marker);
      });
      $scope.markers.push(marker);
    }
    $scope.openInfoWindow = function(e, selectedMarker) {
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
    }

    $scope.signoutSP = function () {
      Auth.signoutProvider()
    }
  
});
