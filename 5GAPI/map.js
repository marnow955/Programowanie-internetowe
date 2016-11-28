google.load('visualization', '1', {packages: ['columnchart']});

function initMap() {
  var polska = {lat: 52, lng: 19};

  var map = new google.maps.Map(document.getElementById('map'), {
    center: polska,
    zoom: 6
  });

  newCenter(map, polska);

  var geocoder = new google.maps.Geocoder;

  var startMarker = autocomplete(map,'start-input',startMarker);
  google.maps.event.addListener(startMarker, 'dragend', function(evt){
    var latlng = new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng());
    geocodeLatLng(latlng, geocoder, map, 'start-input');
  });

  var endMarker = autocomplete(map,'end-input',endMarker);
  google.maps.event.addListener(endMarker, 'dragend', function(evt){
    var latlng = new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng());
    geocodeLatLng(latlng, geocoder, map, 'end-input');
  });

  var wayp1Marker = autocomplete(map,'wayp1',wayp1Marker);
  google.maps.event.addListener(wayp1Marker, 'dragend', function(evt){
    var latlng = new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng());
    geocodeLatLng(latlng, geocoder, map, 'wayp1');
  });

  var wayp2Marker = autocomplete(map,'wayp2',wayp2Marker);
  google.maps.event.addListener(wayp2Marker, 'dragend', function(evt){
    var latlng = new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng());
    geocodeLatLng(latlng, geocoder, map, 'wayp2');
  });

  var wayp3Marker = autocomplete(map,'wayp3',wayp3Marker);
  google.maps.event.addListener(wayp3Marker, 'dragend', function(evt){
    var latlng = new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng());
    geocodeLatLng(latlng, geocoder, map, 'wayp3');
  });

  var wayp4Marker = autocomplete(map,'wayp4',wayp4Marker);
  google.maps.event.addListener(wayp4Marker, 'dragend', function(evt){
    var latlng = new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng());
    geocodeLatLng(latlng, geocoder, map, 'wayp4');
  });

  var wayp5Marker = autocomplete(map,'wayp5',wayp5Marker);
  google.maps.event.addListener(wayp5Marker, 'dragend', function(evt){
    var latlng = new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng());
    geocodeLatLng(latlng, geocoder, map, 'wayp5');
  });

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map: map,
    panel: document.getElementById('directionsPanel')
  });
  document.getElementById('submit').addEventListener('click', function() {
    calculateAndDisplayRoute(map, directionsService, directionsDisplay);
    startMarker.setVisible(false);
    endMarker.setVisible(false);
    wayp1Marker.setVisible(false);
    wayp2Marker.setVisible(false);
    wayp3Marker.setVisible(false);
    wayp4Marker.setVisible(false);
    wayp5Marker.setVisible(false);

  });

}

// Takes an array of ElevationResult objects, draws the path on the map
// and plots the elevation profile on a Visualization API ColumnChart.
function plotElevation(elevations, status) {
  var chartDiv = document.getElementById('elevation_chart');
  if (status !== 'OK') {
    // Show the error code inside the chartDiv.
    chartDiv.innerHTML = 'Cannot show elevation: request failed because ' + status;
    return;
  }
  // Create a new chart in the elevation_chart DIV.
  var chart = new google.visualization.ColumnChart(chartDiv);

  // Extract the data from which to populate the chart.
  // Because the samples are equidistant, the 'Sample'
  // column here does double duty as distance along the
  // X axis.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Sample');
  data.addColumn('number', 'Elevation');
  for (var i = 0; i < elevations.length; i++) {
    data.addRow(['', elevations[i].elevation]);
  }

  // Draw the chart using the data within its DIV.
  chart.draw(data, {
    height: 150,
    legend: 'none',
    titleY: 'Elevation (m)'
  });
}

function autocomplete(map,id,marker) {
  var input = document.getElementById(id);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setTypes(['geocode']);
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  marker = new google.maps.Marker({
    map: map,
    draggable: true
  });
  if (id == 'start-input') {
    marker.setTitle('start');
  } else if (id == 'end-input') {
    marker.setTitle('end');
  } else {
    marker.setTitle('waypoint');
  }

  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Nie znaleziono: '" + place.name + "'");
      return;
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    infowindow.setContent(place.name);

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  });
  return marker;
}

function geocodeLatLng(latlng, geocoder, map, id) {
  geocoder.geocode({'location': latlng}, function(results, status) {
  if (status === 'OK') {
    if (results[1]) {
      document.getElementById(id).value = results[1].formatted_address;
    } else {
      window.alert('No results found');
    }
  } else {
    window.alert('Geocoder failed due to: ' + status);
  }
  });
}

function getTotalDistance(directionsDisplay) {
  var legs = directionsDisplay.getDirections().routes[0].legs;
  var total = 0;
  for (var i = 0; i < legs.length; i++) {
    total += legs[i].distance.value;
  }
  return total;
}

function getTotalDuration(directionsDisplay) {
  var legs = directionsDisplay.getDirections().routes[0].legs;
  var total = 0;
  for (var i = 0; i < legs.length; i++) {
    total += legs[i].duration.value;
  }
  return total;
}

function showTotal(directionsDisplay) {
  var totatDistance = getTotalDistance(directionsDisplay)/1000;
  var totalDuration = getTotalDuration(directionsDisplay);
  var htime = Math.floor(totalDuration/3600);
  var mtime = Math.round(((totalDuration/3600)-htime)*60);
  document.getElementById('total').innerHTML = totatDistance+" km. Około "+htime+" godz. "+mtime+" min";
}


function calculateAndDisplayRoute(map, directionsService, directionsDisplay) {
  var waypts = [];
  var wayptsArray = document.getElementsByName('waypoints[]');
  for (var i = 0; i < wayptsArray.length; i++) {
    if (wayptsArray[i].value != "") {
      waypts.push({
        location: wayptsArray[i].value,
        stopover: true
      });
    }
  }

  var selectedMode = document.getElementById('mode').value;
  directionsService.route({
    origin: document.getElementById('start-input').value,
    destination: document.getElementById('end-input').value,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode[selectedMode]
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      inputUpdate(directionsDisplay.getDirections(),map);
      showTotal(directionsDisplay);
      var bounds = directionsDisplay.getDirections().routes[0].bounds;
      map.fitBounds(bounds);
      map.setCenter(bounds.getCenter());
      newCenter(map,bounds.getCenter());

      var path = directionsDisplay.getDirections().routes[0].overview_path;
      var elevator = new google.maps.ElevationService;
      elevator.getElevationAlongPath({
            'path': path,
            'samples': 256
          }, plotElevation);

      google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
        directions = directionsDisplay.getDirections();

        inputUpdate(directions, map);

        showTotal(directionsDisplay);
        var bounds = directions.routes[0].bounds;
        map.fitBounds(bounds);
        map.setCenter(bounds.getCenter());
        newCenter(map,bounds.getCenter());

        var path = directionsDisplay.getDirections().routes[0].overview_path;
        var elevator = new google.maps.ElevationService;
        elevator.getElevationAlongPath({
              'path': path,
              'samples': 256
            }, plotElevation);
      })
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });

}

function inputUpdate(directions, map) {
  var legs = directions.routes[0].legs;
  var geocoder = new google.maps.Geocoder;
  var latlng = new google.maps.LatLng(legs[0].start_location.lat(), legs[0].start_location.lng());
  geocodeLatLng(latlng,geocoder,map,'start-input');

  latlng = new google.maps.LatLng(legs[legs.length-1].end_location.lat(), legs[legs.length-1].end_location.lng());
  geocodeLatLng(latlng,geocoder,map,'end-input');

  for (var i = 1; i < legs.length; i++) {
    latlng = new google.maps.LatLng(legs[i].start_location.lat(), legs[i].start_location.lng());
    switch (i) {
      case 1:
        geocodeLatLng(latlng,geocoder,map,'wayp1');
        break;
      case 2:
        geocodeLatLng(latlng,geocoder,map,'wayp2');
        break;
      case 3:
        geocodeLatLng(latlng,geocoder,map,'wayp3');
        break;
      case 4:
        geocodeLatLng(latlng,geocoder,map,'wayp4');
        break;
      case 5:
        geocodeLatLng(latlng,geocoder,map,'wayp5');
        break;
    }
  }
}

function CenterControl(controlDiv, map, center) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Center Map';
  controlUI.appendChild(controlText);

  controlUI.addEventListener('click', function() {
    map.setCenter(center);
  });

}

function newCenter(map, center) {
  if (document.getElementById('centerDiv')!=null) {
    document.getElementById('centerDiv').remove();
  }

  var centerControlDiv = document.createElement('div');
  centerControlDiv.setAttribute('id', 'centerDiv');
  var centerControl = new CenterControl(centerControlDiv, map, center);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}
