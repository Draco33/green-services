var serProv = [{
  userName : 'Gas provider 1',
  address : "Amman - 8th circle",
  center: {lat: 31.973715, lng: 35.8375179},
  radius: 3000,
  strokeColor: "red",
  fillColor: "red"
},
{
  userName : 'Water provider 1',
  address : "Amman - 8th circle",
  center: {lat: 31.975715, lng: 35.8377179},
  radius: 4000,
  strokeColor: "blue",
  fillColor: "blue"
}]

var users = [{
  userName: 'Aws',
  address: "street name / building 1/ apartment 1",
  phone: 0790000000,
  order: 'order details',
  lat: 32.0141243,
  long: 35.8688515,
  createdAt: Date()
}, {
  userName: 'Husssam',
  address: "street name / building 2/ apartment 2",
  phone: 0790000000,
  order: 'order details',
  lat: 31.973715,
  long: 35.8375179,
  createdAt: Date()
}, {
  userName: 'Eshraq',
  address: "street name / building 3/ apartment 3",
  phone: 0790000000,
  order: 'order details',
  lat: 31.975715,
  long: 35.8395179,
  createdAt: Date()
}, {
  userName: 'Hadeel',
  address: "street name / building 4/ apartment 4",
  phone: 0790000000,
  order: 'order details',
  lat: 31.970715,
  long: 35.8335179,
  createdAt: Date()
}
];

//Angular App Module and Controller
angular.module('GS.map', [])
  .controller('MapController', function($scope) {

    var mapOptions = {
      zoom: 15,
      center: new google.maps.LatLng(31.971715, 35.8355179),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);


// service provider radius--------
  for (var i =0; i<serProv.length; i++) {
            serProv.serProvCircle = new google.maps.Circle({
              strokeColor: serProv[i].strokeColor,
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: serProv[i].fillColor,
              fillOpacity: 0.07,
              map: $scope.map,
              center: serProv[i].center,
              radius: serProv[i].radius
            });
          }
//--------

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function(info) {

      var marker = new google.maps.Marker({
        map: $scope.map,
        position: new google.maps.LatLng(info.lat, info.long),
        user: info.userName,
        address: info.address,
        phone: info.phone
      });
      marker.content = '<div class="infoWindowContent">'+ info.order +'<br>'+ info.address +'<br>'+ info.phone +'<br>'+info.createdAt+ '</div>';

      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent('<h2>' + marker.user + '</h2>' + marker.content);
        infoWindow.open($scope.map, marker);
      });
      // if marker 
      $scope.markers.push(marker);

    }

    for (i = 0; i < users.length; i++) {
      createMarker(users[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker) {
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
    }


    // take user location from the device
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(pos.lat);
            console.log(pos.lng);
            var userLat = document.getElementById('lat');
            userLat.value = pos.lat;
            var userLng = document.getElementById('lng')
            userLng.value = pos.lng;
          }); 
        } else {
          // Browser doesn't support Geolocation
          alert('your browser dos not support the geolocation');
        }



      
      // calculate if the new user's location inside one service provider if so return the name of the service provider else sorry
        //newUser outside the service area
      var newUser = {lat: 32.0141243, long: 35.8688515}
        //newUser inside the service area
      //var newUser = {lat: 31.975715, long: 35.8395179}
      $scope.userInSerProArea = function (/*newUser, serProv*/){
        var userLatLng = new google.maps.LatLng(newUser.lat, newUser.long);
        for (var i = 0; i < serProv.length; i++) {
          var providerCenter = new google.maps.LatLng(serProv[i].center.lat, serProv[i].center.lng);
          var serProvRadius = serProv[i].radius
          var dist = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, providerCenter)<= serProvRadius;  
          if (dist){
            console.log('newUser within the radius of: ', serProv[i].userName)
          } 
        }
            console.log('Our service circle is growing up, come and try later, Sorry.');
        
      }

  });
