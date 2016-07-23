angular.module('GS.serviceProvider', [])

.controller('serviceproviderController', function ($scope, $window, Services) {
  $scope.data={};
  $scope.markers = [];
  Services.getSPInfo($window.localStorage.getItem('com.GSprovider')).then(function (SP) {
    $scope.serviceType = SP.data.serviceType;
    $scope.center = SP.data.center;
    $scope.radius = SP.data.radius;
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
    
    
  $scope.delivered = function(index){
  	console.log(index);
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
      // if marker 
      $scope.markers.push(marker);

    }
    $scope.openInfoWindow = function(e, selectedMarker) {
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
    }
  
});
