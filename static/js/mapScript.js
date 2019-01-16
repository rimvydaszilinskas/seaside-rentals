//global variables
var map;
var infowindow;

mapCenter = {
  latitude: 54.9255234,
  longitude: 23.9408199
};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: new google.maps.LatLng(mapCenter.latitude, mapCenter.longitude),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  });

  infowindow = new google.maps.InfoWindow();
  // addMarker({id: 1, name: "Nice one", latitude: -33.890542, longitude: 151.274856, link: "http://google.com"})
}

function clearMap() {
  // clears the map of markers by reinstantinating the map all over again
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(mapCenter.latitude, mapCenter.longitude),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  });

  infowindow = new google.maps.InfoWindow();
}

function reinitMap(config){
  map = new google.maps.Map(document.getElementById('mao'), {
    zoom: config.zoom ? config.zoom : 10,
    center: new google.maps.LatLng(config.latitude ? config.latitude : mapCenter.latitude, 
                                  config.longitude ? config.longitude : mapCenter.longitude),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  });

  if(config.markers)
    config.markers.forEach(marker => {
      addMarker(marker);
    });
}

function addMarker(location) {
  // location should come in the following format:
  // {id: ?, address: ?, price: ?,latitude: ?, longitude: ?}
  var marker, i;

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(location.latitude, location.longitude),
    title: location.title,
    map: map
  });

  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      infowindow.setContent(`${location.address}<br/>${location.price}<br/><a href='/property/get/${location.id}'>Link to property</a>`);
      infowindow.open(map, marker);
    }
  })(marker, i));
}
