// use leaflet clustermarkers

var latitude = 32.6658399;
var longitude = -85.4633216;

var centerPoint = new L.LatLng(latitude, longitude);

var rtj = {
  "type": "FeatureCollection",
  "features": [
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [
        -85.4633216,
        32.6658399
      ]
    },
    "properties": {

    }
  }]
};

var map = L.map('map', {
  attributionControl: false,
  center: centerPoint, 
  zoom: 7
});
L.control.attribution({position: 'bottomleft'}).addTo(map);

var createCircle = function(miles) {
  return L.circle(centerPoint, miles * 1609,
  {
    color: '#f07300',
    opacity: 1,
    fillOpacity: 0
  });
};

var mi50Layer = createCircle(50);
var mi100Layer = createCircle(100);
var mi150Layer = createCircle(150);
var mi200Layer = createCircle(200);
var mi250Layer = createCircle(250);

var rtjLayer = L.geoJson(rtj, {
  onEachFeature: function(feature, layer) {
    layer.bindPopup(feature.properties.CommonName + "<br>" + feature.properties.Category + "<br>" + feature.properties.SalePrice)},
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {icon: L.AwesomeMarkers.icon({
      icon: 'circle-o',
      prefix: 'fa',
      markerColor: 'darkred'
    })
  });
  }
});

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// L.tileLayer('http://otile4.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
//   attribution: 
//   'Tiles &copy; <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" />',
//   maxZoom: 18
// }).addTo(map);

var overlayMaps = {
  "50 miles": mi50Layer,
  "100 miles": mi100Layer,
  "150 miles": mi150Layer,
  "200 miles": mi200Layer,
  "250 miles": mi250Layer,
};

L.control.layers(null, overlayMaps, {
  collapsed: false
}).addTo(map);

mi150Layer.addTo(map);

