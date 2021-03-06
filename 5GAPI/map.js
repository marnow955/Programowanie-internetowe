google.load('visualization', '1', {packages: ['columnchart']});

var map;
var geocoder;

var startMarker;
var startInfoWindow;
var endMarker;
var endInfoWindow;
var wayp1Marker;
var wayp1InfoWindow;
var wayp2Marker;
var wayp2InfoWindow;
var wayp3Marker;
var wayp3InfoWindow;
var wayp4Marker;
var wayp4InfoWindow;
var wayp5Marker;
var wayp5InfoWindow;
var isRouteDisplay = false;
var directionsService;
var directionsDisplay;

var bounds;
var waypCount;

function initMap() {
  var polska = {lat: 52, lng: 19};

  map = new google.maps.Map(document.getElementById('map'), {
    center: polska,
    zoom: 6
  });

  google.maps.event.addListenerOnce(map, 'bounds_changed', function() {
    map.setZoom(7);
    var boundsS = map.getBounds();
    newCenter(polska, boundsS);
  });

  google.maps.event.addListener(map, "click",function(event){
    showContextMenu(event.latLng);
  });


  geocoder = new google.maps.Geocoder;
  waypCount = 0;

  setMarkersAutocomplete();

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map: map,
    panel: document.getElementById('directionsPanel')
  });
  document.getElementById('submit').addEventListener('click', function() {
    calculateAndDisplayRoute();
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

function setMarkersAutocomplete() {
  startInfoWindow = new google.maps.InfoWindow();
  startMarker = autocomplete('start-input');
  google.maps.event.addListener(startMarker, 'dragend', function(evt){
    var latlng = new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng());
    geocodeLatLng(latlng, 'start-input');
    startMarker.addListener('click', function() {
      startInfoWindow.setContent(document.getElementById('start-input').value);
      startInfoWindow.open(map, startMarker);
    });
    calculateBounds();
  });

  endInfoWindow = new google.maps.InfoWindow();
  endMarker = autocomplete('end-input');
  google.maps.event.addListener(endMarker, 'dragend', function(evt){
    var latlng = new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng());
    geocodeLatLng(latlng, 'end-input');
    endMarker.addListener('click', function() {
      endInfoWindow.setContent(document.getElementById('end-input').value);
      endInfoWindow.open(map, endMarker);
    });
    calculateBounds();
  });

  wayp1InfoWindow = new google.maps.InfoWindow();
  wayp1Marker = autocomplete('wayp1');
  google.maps.event.addListener(wayp1Marker, 'dragend', function(evt){
    var latlng = new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng());
    geocodeLatLng(latlng, 'wayp1');
    wayp1Marker.addListener('click', function() {
      wayp1InfoWindow.setContent(document.getElementById('wayp1').value);
      wayp1InfoWindowinfowindow.open(map, wayp1Marker);
    });
    calculateBounds();
  });

  wayp2InfoWindow = new google.maps.InfoWindow();
  wayp2Marker = autocomplete('wayp2');
  google.maps.event.addListener(wayp2Marker, 'dragend', function(evt){
    var latlng = new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng());
    geocodeLatLng(latlng, 'wayp2');
    wayp2Marker.addListener('click', function() {
      wayp2InfoWindow.setContent(document.getElementById('wayp2').value);
      wayp2InfoWindow.open(map, wayp2Marker);
    });
    calculateBounds();
  });

  wayp3InfoWindow = new google.maps.InfoWindow();
  wayp3Marker = autocomplete('wayp3');
  google.maps.event.addListener(wayp3Marker, 'dragend', function(evt){
    var latlng = new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng());
    geocodeLatLng(latlng, 'wayp3');
    wayp3Marker.addListener('click', function() {
      wayp3InfoWindow.setContent(document.getElementById('wayp3').value);
      wayp3InfoWindow.open(map, wayp3Marker);
    });
    calculateBounds();
  });

  wayp4InfoWindow = new google.maps.InfoWindow();
  wayp4Marker = autocomplete('wayp4');
  google.maps.event.addListener(wayp4Marker, 'dragend', function(evt){
    var latlng = new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng());
    geocodeLatLng(latlng, 'wayp4');
    wayp4Marker.addListener('click', function() {
      wayp4InfoWindow.setContent(document.getElementById('wayp4').value);
      wayp4InfoWindow.open(map, wayp4Marker);
    });
    calculateBounds();
  });

  wayp5InfoWindow = new google.maps.InfoWindow();
  wayp5Marker = autocomplete('wayp5');
  google.maps.event.addListener(wayp5Marker, 'dragend', function(evt){
    var latlng = new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng());
    geocodeLatLng(latlng, 'wayp5');
    wayp5Marker.addListener('click', function() {
      wayp5InfoWindow.setContent(document.getElementById('wayp5').value);
      wayp5InfoWindow.open(map, wayp5Marker);
    });
    calculateBounds();
  });
}

function autocomplete(id) {
  var input = document.getElementById(id);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setTypes(['geocode']);
  autocomplete.bindTo('bounds', map);

  var marker = new google.maps.Marker({
    map: map,
    draggable: true
  });
  if (id == 'start-input') {
    marker.setTitle('start');
    marker.setLabel('S');
  } else if (id == 'end-input') {
    marker.setTitle('end');
    marker.setLabel('C');
  } else {
    marker.setTitle('waypoint');
    marker.setLabel('P');
  }

  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Nie znaleziono: '" + place.name + "'");
      return;
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    setInfoWindow(id,place.formatted_address);

    calculateBounds();
    setTimeout(recalculateRoute, 150);
  });
  return marker;
}

function setInfoWindow(id, content) {
  if (id == 'start-input') {
    startMarker.addListener('click', function() {
      startInfoWindow.setContent(content);
      startInfoWindow.open(map, startMarker);
    });
  } else if (id == 'end-input') {
    endMarker.addListener('click', function() {
      endInfoWindow.setContent(content);
      endInfoWindow.open(map, endMarker);
    });
  } else if (id == 'wayp1') {
    wayp1Marker.addListener('click', function() {
      wayp1InfoWindow.setContent(content);
      wayp1InfoWindow.open(map, wayp1Marker);
    });
  } else if (id == 'wayp2') {
    wayp2Marker.addListener('click', function() {
      wayp2InfoWindow.setContent(content);
      wayp2InfoWindow.open(map, wayp2Marker);
    });
  } else if (id == 'wayp3') {
    wayp3Marker.addListener('click', function() {
      wayp3InfoWindow.setContent(content);
      wayp3InfoWindow.open(map, wayp3Marker);
    });
  } else if (id == 'wayp4') {
    wayp4Marker.addListener('click', function() {
      wayp4InfoWindow.setContent(content);
      wayp4InfoWindow.open(map, wayp4Marker);
    });
  } else if (id == 'wayp5') {
    wayp5Marker.addListener('click', function() {
      wayp5InfoWindow.setContent(content);
      wayp5InfoWindow.open(map, wayp5Marker);
    });
  }
}

function geocodeLatLng(latlng, id) {
  geocoder.geocode({'location': latlng}, function(results, status) {
  if (status === 'OK') {
    if (results[1]) {
      document.getElementById(id).value = results[0].formatted_address;
    } else {
      window.alert('No results found');
    }
  } else {
    window.alert('Geocoder failed due to: ' + status);
  }
  });
}

function getTotalDistance() {
  var legs = directionsDisplay.getDirections().routes[0].legs;
  var total = 0;
  for (var i = 0; i < legs.length; i++) {
    total += legs[i].distance.value;
  }
  return total;
}

function getTotalDuration() {
  var legs = directionsDisplay.getDirections().routes[0].legs;
  var total = 0;
  for (var i = 0; i < legs.length; i++) {
    total += legs[i].duration.value;
  }
  return total;
}

function showTotal() {
  var totatDistance = getTotalDistance()/1000;
  var totalDuration = getTotalDuration();
  var htime = Math.floor(totalDuration/3600);
  var mtime = Math.round(((totalDuration/3600)-htime)*60);
  document.getElementById('total').innerHTML = totatDistance+" km. Około "+htime+" godz. "+mtime+" min";
}

function calculateAndDisplayRoute() {
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
      isRouteDisplay = true;
      inputUpdate(directionsDisplay.getDirections());
      showTotal();
      var bounds = directionsDisplay.getDirections().routes[0].bounds;
      newCenter(bounds.getCenter(),bounds);

      var path = directionsDisplay.getDirections().routes[0].overview_path;
      var elevator = new google.maps.ElevationService;
      elevator.getElevationAlongPath({
            'path': path,
            'samples': 256
          }, plotElevation);

      google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
        directions = directionsDisplay.getDirections();

        inputUpdate(directions);

        showTotal();
        var bounds = directions.routes[0].bounds;
        newCenter(bounds.getCenter(),bounds);

        var path = directionsDisplay.getDirections().routes[0].overview_path;
        var elevator = new google.maps.ElevationService;
        elevator.getElevationAlongPath({
              'path': path,
              'samples': 256
            }, plotElevation);
      })
    } else {
      directionsDisplay.setMap(null);
      directionsDisplay.setPanel(null);
      directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('directionsPanel')
      });
      directionsDisplay.setMap(map);
      document.getElementById('total').innerHTML = "";
      document.getElementById('elevation_chart').innerHTML = "";

      window.alert('Directions request failed due to ' + status);
    }
  });

}

function inputUpdate(directions) {
  document.getElementById('start-input').value = '';
  document.getElementById('end-input').value = '';
  document.getElementById('wayp1').value = '';
  document.getElementById('wayp2').value = '';
  document.getElementById('wayp3').value = '';
  document.getElementById('wayp4').value = '';
  document.getElementById('wayp5').value = '';
  var legs = directions.routes[0].legs;

  for (var i = 0; i < legs.length; i++) {
    var location = legs[i].start_address;
    if (i == legs.length-1) {
      document.getElementById('end-input').value = legs[i].end_address;
    }
    switch (i) {
      case 0:
        document.getElementById('start-input').value = location;
        break;
      case 1:
        document.getElementById('wayp1').value = location;
        break;
      case 2:
        document.getElementById('wayp2').value = location;
        break;
      case 3:
        document.getElementById('wayp3').value = location;
        break;
      case 4:
        document.getElementById('wayp4').value = location;
        break;
      case 5:
        document.getElementById('wayp5').value = location;
        break;
    }
  }
}

function CenterControl(controlDiv, center, bounds) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.className = 'controlBorder';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.className = 'controlInterior';
  controlText.innerHTML = 'Center Map';
  controlUI.appendChild(controlText);

  controlUI.addEventListener('click', function() {
    map.fitBounds(bounds);
    map.setCenter(center);
  });

}

function newCenter(center, bounds) {
  if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
       var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.02, bounds.getNorthEast().lng() + 0.02);
       var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.02, bounds.getNorthEast().lng() - 0.02);
       bounds.extend(extendPoint1);
       bounds.extend(extendPoint2);
  }
  if (document.getElementById('centerDiv')!=null) {
    document.getElementById('centerDiv').remove();
  }

  var centerControlDiv = document.createElement('div');
  centerControlDiv.setAttribute('id', 'centerDiv');
  var centerControl = new CenterControl(centerControlDiv, center, bounds);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
  map.fitBounds(bounds);
  map.setCenter(center);
}

function showContextMenu(caurrentLatLng) {
  if($('.contextmenu').length){
    $('.contextmenu').remove();
    return;
  }
  var projection = map.getProjection();
  var contextmenuDir;
  $('.contextmenu').remove();
  contextmenuDir = document.createElement("div");
  contextmenuDir.className  = 'contextmenu';
  contextmenuDir.innerHTML =
    '<a id="menuStart" onClick="menuClick(this.id,'+caurrentLatLng.lat()+','+caurrentLatLng.lng()+')"><div class="context">start<\/div><\/a>' +
    '<a id="menuEnd" onClick="menuClick(this.id,'+caurrentLatLng.lat()+','+caurrentLatLng.lng()+')"><div class="context">cel<\/div><\/a>' +
    '<a id="menuWayp" onClick="menuClick(this.id,'+caurrentLatLng.lat()+','+caurrentLatLng.lng()+')"><div class="context">przez<\/div><\/a>';
  $(map.getDiv()).append(contextmenuDir);

  setMenuXY(caurrentLatLng);

  contextmenuDir.style.visibility = "visible";
}

function getCanvasXY(caurrentLatLng){
  var scale = Math.pow(2, map.getZoom());
  var nw = new google.maps.LatLng(map.getBounds().getNorthEast().lat(), map.getBounds().getSouthWest().lng());
  var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
  var worldCoordinate = map.getProjection().fromLatLngToPoint(caurrentLatLng);
  var caurrentLatLngOffset = new google.maps.Point(
    Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
    Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
  );
  return caurrentLatLngOffset;
}

function setMenuXY(caurrentLatLng){
  var mapWidth = $('#map').width();
  var mapHeight = $('#map').height();
  var menuWidth = $('.contextmenu').width();
  var menuHeight = $('.contextmenu').height();
  var clickedPosition = getCanvasXY(caurrentLatLng);
  var x = clickedPosition.x ;
  var y = clickedPosition.y ;

  if((mapWidth - x ) < menuWidth)
    x = x - menuWidth;
  if((mapHeight - y ) < menuHeight)
    y = y - menuHeight;

  $('.contextmenu').css('left',x  );
  $('.contextmenu').css('top',y );
}

function menuClick(id,caurrentLat,caurrentLng) {
  var caurrentLatLng = new google.maps.LatLng(caurrentLat, caurrentLng);
  $('.contextmenu').remove();
  switch (id) {
    case 'menuStart':
      startMarker.setPosition(caurrentLatLng);
      geocodeLatLng(caurrentLatLng,'start-input');
      startMarker.setVisible(true);
      startMarker.addListener('click', function() {
        startInfoWindow.setContent(document.getElementById('start-input').value);
        startInfoWindow.open(map, startMarker);
      });
      calculateBounds();
      break;
    case 'menuEnd':
      endMarker.setPosition(caurrentLatLng);
      geocodeLatLng(caurrentLatLng,'end-input');
      endMarker.setVisible(true);
      endMarker.addListener('click', function() {
        endInfoWindow.setContent(document.getElementById('end-input').value);
        endInfoWindow.open(map, endMarker);
      });
      calculateBounds();
      break;
    case 'menuWayp':
      if (document.getElementById('wayp1').value == '' || waypCount%5==0) {
        id = 'menuWayp1';
        waypCount++;
      } else if (document.getElementById('wayp2').value == '' || waypCount%5==1) {
        id = 'menuWayp2';
        waypCount++;
      } else if (document.getElementById('wayp3').value == '' || waypCount%5==2) {
        id = 'menuWayp3';
        waypCount++;
      } else if (document.getElementById('wayp4').value == '' || waypCount%5==3) {
        id = 'menuWayp4';
        waypCount++;
      } else if (document.getElementById('wayp5').value == '' || waypCount%5==4) {
        id = 'menuWayp5';
        waypCount++;
      }
      menuClick(id,caurrentLat,caurrentLng);
      return;
      break;
    case 'menuWayp1':
      wayp1Marker.setPosition(caurrentLatLng);
      geocodeLatLng(caurrentLatLng,'wayp1');
      wayp1Marker.setVisible(true);
      wayp1Marker.addListener('click', function() {
        wayp1InfoWindow.setContent(document.getElementById('wayp1').value);
        wayp1InfoWindow.open(map, wayp1Marker);
      });
      calculateBounds();
      break;
    case 'menuWayp2':
      wayp2Marker.setPosition(caurrentLatLng);
      geocodeLatLng(caurrentLatLng,'wayp2');
      wayp2Marker.setVisible(true);
      wayp2Marker.addListener('click', function() {
        wayp2InfoWindow.setContent(document.getElementById('wayp2').value);
        wayp2InfoWindow.open(map, wayp2Marker);
      });
      calculateBounds();
      break;
    case 'menuWayp3':
      wayp3Marker.setPosition(caurrentLatLng);
      geocodeLatLng(caurrentLatLng,'wayp3');
      wayp3Marker.setVisible(true);
      wayp3Marker.addListener('click', function() {
        wayp3InfoWindow.setContent(document.getElementById('wayp3').value);
        wayp3InfoWindow.open(map, wayp3Marker);
      });
      calculateBounds();
      break;
    case 'menuWayp4':
      wayp4Marker.setPosition(caurrentLatLng);
      geocodeLatLng(caurrentLatLng,'wayp4');
      wayp4Marker.setVisible(true);
      wayp4Marker.addListener('click', function() {
        wayp4InfoWindow.setContent(document.getElementById('wayp4').value);
        wayp4InfoWindow.open(map, wayp4Marker);
      });
      calculateBounds();
      break;
    case 'menuWayp5':
      wayp5Marker.setPosition(caurrentLatLng);
      geocodeLatLng(caurrentLatLng,'wayp5');
      wayp5Marker.setVisible(true);
      wayp5Marker.addListener('click', function() {
        wayp5InfoWindow.setContent(document.getElementById('wayp5').value);
        wayp5InfoWindow.open(map, wayp5Marker);
      });
      calculateBounds();
      break;
  }
  setTimeout(recalculateRoute, 150);
  // recalculateRoute();
  // document.getElementById('submit').click();
}

function calculateBounds() {
  bounds = new google.maps.LatLngBounds();

  if(startMarker.position)
    bounds.extend(startMarker.position);
  if(endMarker.position)
    bounds.extend(endMarker.position);
  if(wayp1Marker.position)
    bounds.extend(wayp1Marker.position);
  if(wayp2Marker.position)
    bounds.extend(wayp2Marker.position);
  if(wayp3Marker.position)
    bounds.extend(wayp3Marker.position);
  if(wayp4Marker.position)
    bounds.extend(wayp4Marker.position);
  if(wayp5Marker.position)
    bounds.extend(wayp5Marker.position);
  newCenter(bounds.getCenter(),bounds);
}

function recalculateRoute() {
  if (isRouteDisplay==true) {
    calculateAndDisplayRoute();
    startMarker.setVisible(false);
    endMarker.setVisible(false);
    wayp1Marker.setVisible(false);
    wayp2Marker.setVisible(false);
    wayp3Marker.setVisible(false);
    wayp4Marker.setVisible(false);
    wayp5Marker.setVisible(false);
  }
}
